import React, { useRef, useState } from 'react'
import './dropdown.css'

export default function Dropdown({ editForm, wlName, setWlName, wlSubmit}) {

    const [menuState, setMenuState] = useState(false);
    const dropDownMenu = useRef();

    const closeMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('closing menu');
        if (dropDownMenu.current && !dropDownMenu.current.contains(e.target)){
            setMenuState(false);
            document.removeEventListener('click', closeMenu);
        }
    }

    const showMenu = (e) => {
        e.preventDefault()
        e.stopPropagation();

        if (!menuState){
            setMenuState(true);
            console.log(menuState);
            console.log(dropDownMenu)
            document.addEventListener('click', closeMenu)
        } else {
            setMenuState(false);
            document.removeEventListener('click', closeMenu);
        }
    }



    return (
        <div className='dd-main-div'>
            <button onClick={showMenu}>Show Menu</button>

            {menuState &&
                <div
                    className='dd-menu-div'
                    ref={dropDownMenu}
                >
                {editForm}
                </div>}
        </div>
    )
}
