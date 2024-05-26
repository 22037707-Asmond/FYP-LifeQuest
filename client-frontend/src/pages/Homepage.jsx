import React from 'react';
import HomepageHeader from '../components/homepageHeader';
import HomepageCarousel from '../components/homepageCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LifeQuest.css';
import HeroSection from '../components/heroSection';
import Footer from '../components/homepageFooter';


const Homepage = () => {
    return (
       <>
         <HomepageHeader />
         <br />
          <HomepageCarousel />
          <br />
         <HeroSection />
         <br />
         <Footer />
       </>

    );
};

export default Homepage;