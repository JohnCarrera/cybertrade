import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './dashNav.css';

export default function DashNav() {

    return (
        <div className='dn-main'>
                <NavLink
                    className='dn-navlink'
                    activeClassName='dn-active-link'
                    to='/app/dashboard/overview'
                >
            <div className={`dn-tab-div`} id='dn-ov'>
                    Overview
            </div>
                </NavLink>
                <NavLink
                    className='dn-navlink'
                    activeClassName='dn-active-link'
                    to='/app/dashboard/assets'
                >
            <div className={`dn-tab-div`} id='dn-assets'>
                    Assets
            </div>
                </NavLink>
                <NavLink
                    className='dn-navlink'
                    activeClassName='dn-active-link'
                    to='/app/dashboard/transactions'
                >
            <div className={`dn-tab-div`} id='dn-trans'>
                    Transactions
            </div>
                </NavLink>
        </div>
    )
}
