import React from 'react';
import './nav.css';

export default function Nav() {
    return (
        <div className='nav-main'>
            <div className='nav-logo nav-text'>
                {'< '}
            <i class="fa-solid fa-microchip nav-icon"></i>
                {'Cybertrade >'}
            </div>
                <div className='tan-search-container'>
                    <div className='nav-search-pseudo-input'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            // history.push()
                            // document.getElementById('search-input-field').blur();
                        }}>
                            <input
                                className='tan-search-input'
                                id='search-input-field'
                                type='text'
                                // value={searchInput}
                                // onChange={(e) => {
                                //     setSearchInput(e.target.value)
                                // }}
                                // onFocus={() => { setSearchIconFocusStyle('tan-search-icon-focus-style') }}
                                // onBlur={() => { setSearchIconFocusStyle('') }}
                            />
                        </form>
                        {/* <img
                        className={`tan-search-down-caret-icon tan-search-icon-style ${searchIconFocusStyle}`}
                        src={downCaret}
                    /> */}
                    </div>
                </div>
                <div className='nav-acct nav-text'>
                    /account
                </div>
        </div>
    )
}
