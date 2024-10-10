import {Link} from 'react-router-dom';
import React, { useState } from 'react';

const NavbarAdmin = () => {
    const[isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false);
    return (
        <div className='navbar' id="header">
            <div className="nav_logo">hotel quimbaya
                <h3>San Jeronimo</h3>
            </div>
            <div className={`nav_items ${isOpen && "open"}`} >   
                <Link to={'/wall'} onClick={closeMenu}>Wall</Link>
                <Link to={'/rooms'} onClick={closeMenu}> Rooms</Link>
                <Link to={'#about'} onClick={closeMenu}>Up date</Link>
                <Link to={'#places'} onClick={closeMenu}>Places</Link>   
            </div>
            <div className={`nav_toggle ${isOpen && "open"}`} onClick={()=> setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default NavbarAdmin;