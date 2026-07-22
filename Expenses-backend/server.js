 import express from "express";
 import cors from "cors"
 import {Pool} from "pg";
 import env from "dotenv";
 import bcrypt from "bcrypt"
 import jwt from "jsonwebtoken"
 import {
  validateRegister,
  validateLogin,
  validateExpense,
} from "./validation.js";

 const app = express();
 const port = 8080;
 const saltRounds = 10;
 env.config(); 

 app.use(express.json());

 import helmet from 'helmet';

 app.use(helmet());

 app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
 }));
 


 
 import rateLimit from 'express-rate-limit';

// Rate limit: max 5 requests per 15 minutes per IP on login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'Too many login/register attempts — please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

  // Apply to login & register only
  app.use('/login', authLimiter);
  app.use('/register', authLimiter);

  // Security: Disable unnecessary headers
  app.disable('x-powered-by');

  // Optional: More strict security
  app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  }));

  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
 
  // Test connection once on startup
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err.stack);
      process.exit(1);
    }
    console.log('Connected to PostgreSQL successfully');
    release();
  });


  const JWT_SECRET = process.env.JWT_SECRET;

  const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

  if(!token){
    return res.status(401).json({ error: 'Access denied - no token provided' });
  };

// JWT verification middleware
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if(err){
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

app.get("/", (req,res)=>{
    res.send("Expenses Tracker Backend is running")
    console.log("backend is running")
})


app.post("/register", validateRegister, async (req, res) => {
  console.log('REGISTER REQUEST RECEIVED');
  console.log('Body:', req.body);

  let username, email, password;

  try {
    ({ username, email, password } = req.body || {});

    console.log('Extracted:', { username, email, password });


    if (!username || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Checking for existing email...');
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('SELECT completed. Rows found:', existing.rows.length);

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already taken' });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Inserting user...');
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id',
      [username, email, hashedPassword]
    );

    console.log('Insert result:', result.rows[0]);

    const userId = result.rows[0].user_id;

    console.log('Creating token...');
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2d' });

    console.log('Sending 201 success');
    return res.status(201).json({ token, message: 'User registered successfully' });

  } catch (err) {
    console.error('REGISTRATION CRASH:');
    console.error('Error message:', err.message);
    console.error('Full stack:', err.stack);

    
    return res.status(500).json({ 
      error: 'Server error during registration',
      details: err.message 
    });
  }
});
     

app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '2d' });

    
    res.json({ 
      token, 
      message: 'Login successful',
      username: user.username 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});



app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching expenses for user:', req.user.userId);
    const result = await pool.query(
      'SELECT expense_id AS id, title, amount, expense_date AS date, notes ' +
      'FROM expenses WHERE user_id = $1 ORDER BY expense_date DESC',
      [req.user.userId]
    );
    console.log('Expenses found:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('GET EXPENSES ERROR:', err.message);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});




app.post('/api/expenses', authenticateToken, validateExpense, async (req, res) => {
  const { title, amount, date } = req.body;

  console.log('Adding expense for user:', req.user.userId);
  console.log('Received:', { title, amount, date});

  if (!title || !amount || !date) {
    return res.status(400).json({ error: 'Title, amount, and date are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO expenses (user_id, title, amount, expense_date) ' +
      'VALUES ($1, $2, $3, $4) RETURNING expense_id AS id, title, amount, expense_date AS date',
      [req.user.userId, title, amount, date || null]
    );

    console.log('Expense added:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ADD EXPENSE ERROR:', err.message);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});



app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  console.log('Deleting expense:', id, 'for user:', req.user.userId);

  try {
    const result = await pool.query(
      'DELETE FROM expenses WHERE expense_id = $1 AND user_id = $2 RETURNING expense_id',
      [id, req.user.userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Expense not found or not yours' });
    }

    console.log('Expense deleted:', id);
    res.status(204).send();
  } catch (err) {
    console.error('DELETE EXPENSE ERROR:', err.message);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});


 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  