import React from 'react';


const Footer = () => {
    const today = new Date();

    const formattedDate = `${today.getFullYear()}`;

    return (
        <div>
            <footer className="footer">
                <div className="footer-text">
                    <p>Copyrigth © {formattedDate} By Quimbaya hotel | All rights Reserved.</p>
                </div>
            </footer>

        </div>
    );
}

export default Footer;