import Joi from 'joi';

// Register validation
const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot be longer than 50 characters',
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
    }),
});

// Login validation
const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

// New expense validation
const expenseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.max': 'Title cannot be longer than 200 characters',
    }),

  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.positive': 'Amount must be greater than 0',
      'number.base': 'Amount must be a valid number',
    }),

  date: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Please provide a valid date',
      'any.required': 'Date is required',
    }),
});

// Reusable validation middleware
// const validate = (schema) => (req, res, next) => {
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   if (error) {
//     const errors = error.details.map(d => d.message);
//     return res.status(400).json({
//     //   error: 'Validation failed',
//     //   details: errors
//     error: error.details.map(d => d.message).join(', ')
//     });
//   }

//   next();
// };

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({
      error: 'Validation failed',
      messages: messages,          
      fullError: error.details      
    });
  }

  next();
};

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export const validateExpense = validate(expenseSchema);