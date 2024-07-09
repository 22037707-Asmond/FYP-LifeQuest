import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AccountPage from './pages/AccountPage';
import AboutUs from './pages/AboutUs';
import LifeQuest from './pages/LifeQuest';
import Profile from './pages/Profile';
import PremiumTest from './pages/PremiumTest';
import MyInfoForm from './components/MyInfoForm';



function App() {
  const isLoggedIn = false;
  return (
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='SignUp' element={<SignUp />} ></Route>

        <Route path='AboutUS' element={<AboutUs />}></Route>

        <Route path='Login' element={<MyInfoForm />}></Route>

        <Route path='LifeQuest' element={<LifeQuest />}></Route>

        <Route path='AccountPage' element={<AccountPage />}></Route>

        <Route path="Profile" element={<Profile/>}></Route>
        
        <Route path="PremiumTest" element={<PremiumTest/>}></Route>

      </Routes>
  );
}

export default App;
