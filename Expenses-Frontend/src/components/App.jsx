import { useState, useEffect} from 'react';

function App() {
  const [register, setRegister] = useState({
    fName:"",
    lName:"",
    email:"",
    password:"",
  })

  function registerInput(event){
    const {name, value} = event.target;
    setRegister((prevValue)=>{
       return {
        ...prevValue,
        [name]: value,
      };
    });
  }


   const [isMouseover, setIsMouseOver] =useState(false);

  function mouseOver() {
    setIsMouseOver(true);
  }

  function mouseOut() {
    setIsMouseOver(false);
  }

  function submitRegister(event){
    setRegister({
        fName:"",
        lName:"",
        email:"",
        password:"",
    })
    event.preventDefault();
  }

  return (
    <div className="registerContainer curved">
      <h1 className="registerH1">REGISTER</h1>
        <form onSubmit={submitRegister} className="formLogs">
          <div className="nameRow">
             <input className="registerName"
              onChange={registerInput}
              name="fName"
              value={register.fName}
              placeholder="First name"
              />
              <input className="registerName"
              onChange={registerInput}
              name="lName"
              value={register.lName}
              placeholder="Last name"
              />
          </div>
            <input className="registerInput"
              onChange={registerInput}
              name="email"
              value={register.email}
              placeholder="Email"
            />
            <input className="registerInput"
              onChange={registerInput}
              name="password"
              value={register.password}
              placeholder="Password"
            />
            <button className="registerButton" 
            style={{ backgroundColor: isMouseover ? "rgba(0, 0, 0, 0.457)" : "rgb(255, 255, 255)" }}
            onMouseOut={mouseOut}
            onMouseOver={mouseOver}>Register</button>
        </form>
        <p>Already registered ?. Sign In</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 277"><path fill="#fff" fill-opacity="1" d="M0,96L30,85.3C60,75,120,53,180,74.7C240,96,300,160,360,208C420,256,480,288,540,272C600,256,660,192,720,181.3C780,171,840,213,900,213.3C960,213,1020,171,1080,149.3C1140,128,1200,128,1260,106.7C1320,85,1380,43,1410,21.3L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
     </div>
  )
}

export default App
