import React from 'react'
import '../styles/ReadPStrategy.css'
import read from './read.json';
import ReadComponent from './ReadComponent';
export const ReadPStrategy = () => {

    const openNavbar = () => {
        const navClose = document.querySelector('.navbar-close');
        const navOpen = document.querySelector('.navbar-open');
        navClose.style.display = 'none';
        navOpen.style.display = 'block';
    }
    const closeNavbar = () => {
        const navClose = document.querySelector('.navbar-close');
        const navOpen = document.querySelector('.navbar-open');
        navClose.style.display = 'block';
        navOpen.style.display = 'none';
    }
    return (
        <>

            <div className='nav'>
                <div className='navbar-close'>
                    <i className="fa-solid fa-bars fa-2x" onClick={openNavbar}></i>
                </div>
                <div className='navbar-open'>
                    <i class="fa-solid fa-xmark fa-2x" onClick={closeNavbar}></i>
                    <a className="side-nav-link" href='/'>Read about Popular Strategies</a>
                    <a className="side-nav-link" href='/Implementations'>View Saved Strategies</a>
                    <a className="side-nav-link" href='/login'>Logout</a>
                </div>
            </div>
            <div className='mainn'>
                {
                    read.map((data)=>{
                    return <ReadComponent name={data.name} description={data.description}/> 
                    })
                }
                
            </div>
        </>
    )
}
export default ReadPStrategy;

