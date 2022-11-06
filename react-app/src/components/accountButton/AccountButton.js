import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './accountButton.css'

export default function AccountButton() {

    const [amDiv, setAmDiv] = useState();
    const [renderAmDiv, setRenderAmDiv] = useState(false);

    const user = useSelector(state => state.session.user);



    const location = useLocation();
    const amRef = useRef();

    const openForm = () => {
        console.log('openform:', renderAmDiv)
        amDiv.style.height = '100px';
        amDiv.style.width = '300px';
        amDiv.style.border = '1px solid #00da86';
        setRenderAmDiv(true);
        document.addEventListener('click', closeForm)

    }

    const closeForm = (e) => {
        console.log('closeform:', renderAmDiv)
        setRenderAmDiv(false);
        amDiv.style.height = '0px';
        amDiv.style.width = '0px';
        document.removeEventListener('click', closeForm);
    }

    const amBtnClick = (e) => {
        e.stopPropagation();
        console.log('amBtnClick', renderAmDiv)
        !renderAmDiv ? openForm() : closeForm()
    }

    useEffect(() => {
        setAmDiv(document.getElementById('ab-menu-id'));
        if (amDiv) {
            amDiv.style.height = '0px';
            amDiv.style.width = '0px';
        }
        console.log('amRef loaded:', amRef)

    }, [amRef]);


    return ( user &&
        <div className='ab-main'>
            {!location.pathname.includes('dashboard') &&
                <Link to='/app/dashboard' className='ab-link-wrap'>
                    <div className='ab-dash-btn ab-btn-text cyber-grad'>
                        /dashboard
                    </div>
                </Link>
            }
            <LogoutButton classProp='ab-btn-text cyber-grad' />
            <div
                className='ab-btn-text cyber-grad'
                onClick={amBtnClick}
            >
                /account
            </div>
            <div
                className='ab-ab-menu'
                id='ab-menu-id'
                ref={amRef}
            >
                <pre>
                {'     > cybertrade v1.951 build 3 < '}
                </pre>
                <br/>
                {'> user info: ' + user.email}
                <br/>
                {'> first name: ' + user.first_name}
                <br/>
                {'> last name: ' + user.last_name}
                {/* <br/>
                {'> available cash:' }
                <br/>
                {'> total net worth:' } */}


            </div>
        </div>
    )
}
