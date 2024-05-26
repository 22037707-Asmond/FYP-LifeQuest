import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AccountPage from './pages/AccountPage';
import AboutUs from './pages/AboutUs';
import LifeQuest from './pages/LifeQuest';



function App() {
  const isLoggedIn = false;
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignUp' element={<SignUp/>} ></Route>
      <Route path='AboutUS' element={<AboutUs/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
      <Route path='LifeQuest' element={<LifeQuest/>}></Route>
      <Route path='AccountPage' element={<AccountPage/>}></Route>
    </Routes>
  );
}

export default App;
