import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../img/cybertrade-lite.png'
import './navLogo.css';


export default function NavLogo() {
    return (
        <Link to='/' className='nl-link-wrap'>
            <div className='nl-main-div'>
                {/* <img className='nl-logo-img' src={logo} /> */}
                <div className='nl-name-logo cyber-grad'>
                    {'< cybertrade >'}
                </div>
            </div>
        </Link>
    )
}
