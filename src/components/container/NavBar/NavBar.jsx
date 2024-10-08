import {Link} from 'react-router-dom';
import React, { useState } from 'react';

const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false);
    return (
        <div className='navbar' id="header">
            <div className="nav_logo">hotel quimbaya
                <h3>San Jeronimo</h3>
            </div>
            <div className={`nav_items ${isOpen && "open"}`} >   
                <Link to={'/'} onClick={closeMenu}> Home</Link>
                <Link to={'/rooms'} onClick={closeMenu}> Reservations</Link>
                <Link to={'#about'} onClick={closeMenu}>About Us</Link>
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

export default Navbar;