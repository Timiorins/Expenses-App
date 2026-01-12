import {useState, useEffect} from "react";

function Login() {
    const [login, setLogin] = useState({
    email:"",
    password:""
  })

  const [isMouseover, setIsMouseOver] =useState(false);

  function mouseOver() {
    setIsMouseOver(true);
  }

  function mouseOut() {
    setIsMouseOver(false);
  }

  function loginInput(event){
    const {name, value} = event.target
    setLogin((prevValue)=>{
       return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitLogin(event){
        setLogin({
        email:"",
        password:""
    });
    event.preventDefault();
    }

    return (
        <div className="loginContainer curved">
      <h1 className="loginH1">LOGIN</h1>
        <form onSubmit={submitLogin}>
            <input className="loginInput"
              onChange={loginInput}
              name="email"
              value={login.email}
              placeholder="Email"
            />
            <input className="loginInput"
              onChange={loginInput}
              name="password"
              value={login.password}
              placeholder="Password"
            />
            <button className="loginButton" 
            style={{ backgroundColor: isMouseover ? "rgba(0, 0, 0, 0.457)" : "rgb(255, 255, 255)" }}
            onMouseOut={mouseOut}
            onMouseOver={mouseOver}>Login</button>
        </form>
        <p>Not registered ?. Sign up now </p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270"><path fill="#fff" fill-opacity="1" d="M0,96L30,85.3C60,75,120,53,180,74.7C240,96,300,160,360,208C420,256,480,288,540,272C600,256,660,192,720,181.3C780,171,840,213,900,213.3C960,213,1020,171,1080,149.3C1140,128,1200,128,1260,106.7C1320,85,1380,43,1410,21.3L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
     </div>
    )
};

export default Login;