import React, {useEffect, useState} from 'react';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from './SearchBar';
import './nav.css';

export default function Nav() {


    return (
        <div className='nav-main'>
            <div className='nav-logo nav-text'>
                {'< '}
            <i class="fa-solid fa-microchip nav-icon"></i>
                {'Cybertrade >'}
            </div>
                <SearchBar />
                <div className='nav-acct nav-text'>
                <div className='main-nav-profile-btn'>
            <LogoutButton classProp='spl-sign-up-btn'/>
            </div>
                    /account
                </div>
        </div>
    )
}
