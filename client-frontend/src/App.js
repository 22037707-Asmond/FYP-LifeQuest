import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AccountPage from './pages/AccountPage';
import AboutUs from './pages/AboutUs';
import LifeQuest from './pages/LifeQuest';
import { AccountProvider } from './AccountState';
import Profile from './pages/Profile';



function App() {
  const isLoggedIn = false;
  return (
    <AccountProvider>
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='SignUp' element={<SignUp />} ></Route>

        <Route path='AboutUS' element={<AboutUs />}></Route>

        <Route path='Login' element={<Login />}></Route>

        <Route path='LifeQuest' element={<LifeQuest />}></Route>

        <Route path='AccountPage' element={<AccountPage />}></Route>

        <Route path="Profile" element={<Profile/>}></Route>

      </Routes>
    </AccountProvider>
  );
}

export default App;
