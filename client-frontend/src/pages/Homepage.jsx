import React from 'react';
import HomepageHeader from '../components/homepageHeader';
import HomepageCarousel from '../components/homepageCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../LifeQuest.css';
import HeroSection from '../components/heroSection';
import Footer from '../components/homepageFooter';
import LifeQuestGame from '../components/LifeQuest_Game';


const Homepage = () => {
    return (
       <>
         <HomepageHeader />
         <br />
          <HomepageCarousel />
          <br />
         <HeroSection />
         <br />
         <LifeQuestGame />
         <br />
         <Footer />
       </>

    );
};

export default Homepage;