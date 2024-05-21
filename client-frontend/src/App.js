import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/SignUp';
import AboutUS from './pages/AboutUS';
import Login from './components/Login';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignUp' element={<SignUp/>} ></Route>
      <Route path='AboutUS' element={<AboutUS/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
