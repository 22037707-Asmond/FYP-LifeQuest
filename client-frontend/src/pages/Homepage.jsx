import React from 'react';
import HomepageHeader from '../components/homepageHeader';
import HomepageCarousel from '../components/homepageCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LifeQuest.css';

const Homepage = () => {
    return (
       <>
         <HomepageHeader />
         <br />
          <HomepageCarousel />
       </>
    );
};

export default Homepage;