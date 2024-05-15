import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import AboutUs from './pages/AboutUS';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignIn' element = {<SignIn/>} ></Route>s
<<<<<<< HEAD
      <Route path='AboutU' element = {<AboutUs/>} ></Route>s

=======
>>>>>>> cdd2e65eb6537f1630cdc1fb22236d2a395e78b0
    </Routes>
  );
}

export default App;
