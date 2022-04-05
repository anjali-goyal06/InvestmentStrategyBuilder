  import React, { useEffect, useState } from 'react'
  import {Link ,useHistory} from "react-router-dom";
  import '../styles/LoginAndSignUp.css'

export const SignUp = () => {
  const history = useHistory();
  const [isVisible, setVisible] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("run...")
    e.preventDefault(); //so that page should not refresh
    const response = await fetch("http://localhost:8000/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : fName + " " + lName , email, password})
    });
    const json = await response.json()
    console.log(json);
    if (!json.err){
        console.log("register Successfull")
        history.push('/home');
    }
    else{
        console.log(json);
        alert("Invalid credentials");
    }
  }

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

  const enterFName = (event)=>{
      setFName(event.target.value);
  }
  const enterLName = (event)=>{
      setLName(event.target.value);
  }
  const enterEmail = (event)=>{
      setEmail(event.target.value);
  }
  const enterPassword = (event)=>{
      setPassword(event.target.value);
  }
  const enterCPassword = (event)=>{
      setCPassword(event.target.value);
  }

  useEffect(() => {
      const passwordId = document.querySelector('#id_password');
      const cPasswordId = document.querySelector('#id_cPassword');
      if(password!=='' && cPassword!==''){
      if(password===cPassword){
        passwordId.style.border = '2px solid #27d632';
        cPasswordId.style.border = '2px solid #27d632';
      }
      else{
        passwordId.style.border = '2px solid red';
        cPasswordId.style.border = '2px solid red';
      }
    }  
  }, [cPassword])

  useEffect(() => {
    let n = password.length;
    if(n==0){
      const strong = document.querySelector('.strong');
      strong.style.display = 'none';
    }
    else if(n>0){
      const strong = document.querySelector('.strong');
      strong.style.display = 'block';
      let cntLower=0, cntUpper=0,cntSym=0,cntNum=0;
      let strength = 0;
      
      for(let i = 0; i<n;i++){
        if(password[i]>='a' && password[i]<='z'){ cntLower=1; }
        else if(password[i]>='A' && password[i]<='Z'){ cntUpper=1; }
        else if(password[i]>='0' && password[i]<='9'){ cntNum=1; }
        else {cntSym=1;}
        strength = cntLower+cntUpper+cntNum+cntSym;
      }
      if(n>=8) strength++;
      if(strength===1){
        strong.style.width="17%";
        strong.style.backgroundColor="red";
      }
      else if(strength===2){
        strong.style.width="34%";
        strong.style.backgroundColor="yellow";
      }
      else if(strength===3){
        strong.style.width="51%";
        strong.style.backgroundColor="orange";
      }
      else if(strength===4){
        strong.style.width="68%";
        strong.style.backgroundColor="lightgreen";
      }
      else if(strength===5){
        strong.style.width="100%";
        strong.style.backgroundColor="darkgreen";
      }
    }
  }, [password])

    return (
    <>
    <div className="signup-component">
    
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className='line'>
      <h2>Create Account</h2>
      <h4>{fName}&nbsp;{lName}</h4>
      </div>
      <div className='form-values'>
      <div className='rows row-1'>
      <input type="text" placeholder='First Name' value={fName} onChange={enterFName} className='input-data' required/>
      <input type="text" placeholder='Last Name' value={lName} onChange={enterLName} className='input-data' required/>
      </div>
      <div className='rows other-row'>
      <input type="email" placeholder='Email' value={email} onChange={enterEmail} className='input-data' required/>
      </div>
      <div className='rows other-row'>
      <input type="password" placeholder='Password' value={password} onChange={enterPassword} className='input-data' id= "id_password" required minLength={8}/>
      <i className={`fa-solid toggle ${!isVisible?'fa-eye':'fa-eye-slash'}`} id="togglePassword" onClick={togglePass}></i>
      <div class="parent-strong">
      <div className='strong'> 
      </div>
      </div>
      </div>
      <div className='rows other-row'>
      <input type="password" placeholder='Confirm Password' value={cPassword} onChange={enterCPassword} className='input-data' id='id_cPassword' required/>
      </div>
      <div className='row row-button other-row'>
      <button type="submit" className="signup-btn">SignUp</button>
      </div>
      <div className='goto-login'>
          <p>Already have an account?&nbsp;<Link to='/login' className='link-login'>Login</Link></p>
      </div>
      </div>
    </form>
    </div>
    </>
    )
}
