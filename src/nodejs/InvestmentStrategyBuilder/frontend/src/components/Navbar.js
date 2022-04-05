import React from 'react'
import '../styles/Navbar.css'
import {Link,useLocation} from "react-router-dom";
export const Navbar = () => {
  let location = useLocation();
    return (
    <>
    <nav>
      <ul className='nav-list'>
        <li>
          <h1 className='logo'>Strategy Builder <span className="fa-rotate-by" style={{'display':'inline-block', '--fa-rotate-angle':'135deg'}}>
            <i className="fa-solid fa-share fa-flip-horizontal "></i>
            </span></h1>
        </li>
        <li>
          {
            (location.pathname==='/' || location.pathname==='/login' || location.pathname==='/register') &&
            <Link className='goto-login-text' to={`${location.pathname==='/'?'/login':'/'}`}>{location.pathname==='/'?'Login':'Signup'}</Link>
          }
          {
             (location.pathname==='/home') 
             && 
             <div className='userName'>
               <p >A</p>
             </div>
          }
        </li>
      </ul>
    </nav>
    </>
  )
}