import React from 'react';
import { Link } from 'react-router-dom';
import "../LifeQuest.css";

const HomepageHeader = () => {
    return (
        <>
            <div className="container">
                <img className="logo" src="/images/tee up.png" alt="" />
                    <nav className="navbar navbar-expand-sm d-flex justify-content-center">
                        <Link className="navbar-brand">
                            <button className="btn btn-warning">About us</button>
                        </Link>
                        <Link className="navbar-brand">
                            <button className="btn btn-warning">Programmes</button>
                        </Link>
                        <Link className="navbar-brand">
                            <button className="btn btn-warning">Careers</button>
                        </Link>
                        <Link className="navbar-brand">
                            <button className="btn btn-warning">Stories</button>
                        </Link>
                    </nav>
                </div>

        </>
    );
};

export default HomepageHeader;