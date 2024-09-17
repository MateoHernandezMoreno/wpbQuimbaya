import {Link} from 'react-router-dom';
import React, { useState } from 'react';

const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false)
    return (
        <div className='navbar' id="header">
            <div className="nav_logo">hotel quimbaya
                <h3>San Jeronimo</h3>
            </div>
            <div className={`nav_items ${isOpen && "open"}`} >   
            <Link to={'/'}> Home</Link>
            <Link to={'/rooms'}> Reservations</Link>
            <a href="#about">about us</a>
            <a href="#places">places</a>
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