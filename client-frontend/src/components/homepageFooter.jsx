import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center align-items-center" style={{position: 'fixed', bottom: '0', width: '100%', height: '60px', backgroundColor: 'transparent'}}>
            <p>LifeQuest <span role="img" aria-label="emoji">🌟</span></p>
        </footer>
    );
};

export default Footer;