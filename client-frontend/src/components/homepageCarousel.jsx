import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const HomepageCarousel = () => {
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         document.querySelector('#carouselExampleIndicators').carousel('next');
    //     }, 5000);

    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        <div className="container">
            <div id="carouselExampleIndicators" className="carousel slide mx-auto" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active c-item">
                        <img className="d-block w-100 c-image" src="/images/young adults.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item c-item">
                        <img className="d-block w-100 c-image" src="/images/teeup team.jpg" alt="Second slide" />
                    </div>
                    <div className="carousel-item c-item">
                        <img className="d-block w-100 c-image" src="/images/youth inspirin.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
}

export default HomepageCarousel;
