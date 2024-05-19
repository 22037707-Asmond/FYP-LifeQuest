import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/SignUp';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignUp' element={<SignUp/>} ></Route>
      <Route path='AboutUs' element={<AboutUs/>}></Route>
    </Routes>
  );
}

export default App;
