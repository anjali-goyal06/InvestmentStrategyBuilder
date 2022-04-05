import { Link } from "react-router-dom"
import React, {Component , useEffect, useState , Fragment } from 'react'
import '../styles/Home.css'
import { nanoid } from 'nanoid'


export default class Nav extends Component {

    openNavbar(){
        const navClose = document.querySelector('.navbar-close');
        const navOpen = document.querySelector('.navbar-open');
        navClose.style.display = 'none';
        navOpen.style.display = 'block';
    }
    closeNavbar(){
        const navClose = document.querySelector('.navbar-close');
        const navOpen = document.querySelector('.navbar-open');
        navClose.style.display = 'block';
        navOpen.style.display = 'none';
    }

  render() {
    return (
      <>
            <div className='nav'>
                <div className='navbar-close'>
                    <i className="fa-solid fa-bars fa-2x" onClick={this.openNavbar}></i>
                </div>
                <div className='navbar-open'>
                    <i class="fa-solid fa-xmark fa-2x" onClick={this.closeNavbar}></i>
                    {/* <Link className="side-nav-link" to='/read-p-strategy'>Read about Popular Strategies</Link>
                     */}
                    <Link className="side-nav-link" to='/Implementations'>View Saved Strategies</Link>
                    <Link className="side-nav-link" to='/login'>Logout</Link>
                </div>
            </div>
      </>
    )
  }
}
