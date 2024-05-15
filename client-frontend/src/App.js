import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignIn' element = {<SignIn/>} ></Route>s
    </Routes>
  );
}

export default App;
