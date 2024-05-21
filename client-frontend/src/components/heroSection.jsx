import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Welcome to LifeQuest</h1>
                        <p>Discover your life's path with LifeQuest</p>
                        <button className="btn btn-primary" style={{ backgroundColor: 'red' }}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;