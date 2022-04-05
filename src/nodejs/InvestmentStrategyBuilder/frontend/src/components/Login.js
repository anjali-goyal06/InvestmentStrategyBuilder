import React, { useState } from 'react'
import {Link, useHistory} from "react-router-dom";
import '../styles/LoginAndSignUp.css'

export const Login = () => {
  const history = useHistory();
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePass= () =>{
    const password = document.querySelector('#id_password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if(type==='text'){
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  }
  const enterEmail = (event)=>{
      setEmail(event.target.value);
  }
  const enterPassword = (event)=>{
      setPassword(event.target.value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    console.log("...")
    const response = await fetch("http://localhost:8000/api/auth/login", {
        method: 'POST',
        
     //   credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const json =  response.json
    console.log("json")
    console.log(response);
    if (!(json.err)){
      console.log(json);
        console.log("Login Successfull");
        history.push('/home');
    }
    else{
        console.log(json);
        alert("Invalid credentials");
    }
  }
 
  return (
    <>
    <div className="login-component">
    
    <form className='login-form' onSubmit={handleSubmit}>
      <div className='line'>
      <h2>Login</h2>
      </div>
      <div className='form-values'>
      <div className='rows other-row'>
      <input type="email" placeholder='Email' value={email} onChange={enterEmail} className='input-data' required/>
      </div>
      <div className='rows other-row'>
      <input type="password" placeholder='Password' value={password} onChange={enterPassword} className='input-data' id= "id_password" required minLength={8}/>
      <i className={`fa-solid toggle ${!isVisible?'fa-eye':'fa-eye-slash'}`} id="togglePassword" onClick={togglePass}></i>
      </div>
      <div className='row row-button other-row'>
      <button type="submit" className="login-btn">Login</button>
      </div>
      <div className='goto-signup'>
          <p>Don't have an account?&nbsp;<Link to='/' className='link-signin'>Signup</Link></p>
      </div>
      </div>
    </form>
    </div>
    </>
  )
}
