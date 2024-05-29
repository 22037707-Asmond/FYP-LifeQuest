import React from 'react';
import { Link } from 'react-router-dom';
import "../LifeQuest.css";

const HomepageHeader = () => {
    return (
        <>
            <Link to="/"> 
                <img className="logo" src="/images/tee up.png" alt="" />
            </Link>            
            <div className="container">
                <div className="d-flex justify-content-center adjustNav">
                    <nav className="navbar navbar-btnexpand-sm justify-content-center">
                        <Link className="navbar-btnbrand" to='/AboutUs'>
                            <button className=" navbar-btn">About us</button>
                        </Link>
                        <Link className="navbar-btnbrand">
                            <button className=" navbar-btn">Programmes</button>
                        </Link>
                        <Link className="navbar-btnbrand">
                            <button className=" navbar-btn">Careers</button>
                        </Link>
                        <Link className="navbar-btnbrand">
                            <button className=" navbar-btn">Stories</button>
                        </Link>
                        <Link className="navbar-btnbrand" to='/LifeQuest'>
                            <button className="navbar-btn">Game</button>
                        </Link>
                        <Link className="navbar-btnbrand" to='/SignUp'>
                            <button className="navbar-btn">Sign Up</button>
                        </Link>
                        <Link className="navbar-btnbrand" to='/Login'>
                            <button className="navbar-btn">Login</button>
                        </Link>
                    </nav>
                </div>
            </div>


        </>
    );

};

export default HomepageHeader;