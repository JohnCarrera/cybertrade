import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountButton from '../accountButton/AccountButton'
import './sessionLinks.css'

export default function SessionLinks() {

    const user = useSelector(state => state.session.user);
    const [links, setLinks] = useState(null);

    useEffect(() => {
        if (user) {
            setLinks(<AccountButton />)
        } else {
            setLinks(
                <div className='sl-top-right'>
                    <Link to='/login' className='sl-link-wrap'>
                        <div className='sl-nav-btn-text cyber-grad'>
                            /login
                        </div>
                    </Link>
                    <Link to='/signup' className='sl-link-wrap'>
                        <div className='sl-nav-btn-text cyber-grad'>
                            /signup
                        </div>
                    </Link>
                </div>
            )
        }

    }, [user])


    return links;
}
