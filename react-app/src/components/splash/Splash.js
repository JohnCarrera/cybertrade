import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NavLogo from '../navLogo/NavLogo';
import SessionLinks from '../sessionLinks/SessionLinks';
import splashBg from '../../img/vw-city-3.png'
import './splash.css';


export default function Splash() {

    const user = useSelector(state => state.session.user)

    return (
        <div className='spl-main-div'>
            <div className='spl-top-nav'>
                <NavLogo />
                <SessionLinks />
            </div>
            <div className='spl-body'>
                <img className='spl-bg-img' src={splashBg} />
                <div className='spl-gs-div'>
                    <div className='spl-bg-text cyber-grad'>
                        the future is now...
                    </div>
                    {user
                        ?
                        <Link
                            className='spl-link-wrap'
                            to='/app/dashboard/overview'
                        >
                            <button className='spl-gs-btn'>
                                dashboard
                            </button>
                        </Link>


                        :
                        <Link
                            className='spl-link-wrap'
                            to='/signup'
                        >
                            <button className='spl-gs-btn'>
                                get started
                            </button>
                        </Link>
                    }
                </div>
            </div>
            <div className='spl-bot-nav'>
                <div className='spl-bot-name cyber-grad'>
                    {'> a cyber-themed stock trading clone by John Carrera'}
                </div>
                <div className='spl-bot-rt'>
                    <a href='https://www.linkedin.com/in/john-carrera-778b53231/'>
                    <div className='spl-bot-link-icon'>
                        <i class="fa-brands fa-linkedin fa-3x"></i>
                    </div>
                    </a>
                    <a href='https://github.com/JohnCarrera'>
                    <div className='spl-bot-link-icon'>
                        <i class="fa-brands fa-square-github fa-3x"></i>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
