import React, { useEffect, useState } from 'react';
import AccountButton from '../accountButton/AccountButton';
import SearchBar from './SearchBar';
import NavLogo from '../navLogo/NavLogo';
import './nav.css';

export default function Nav() {


    return (
        <div className='nav-main'>
            <NavLogo />
            <SearchBar />
            <AccountButton/>
        </div>
    )
}
