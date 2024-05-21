import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
<<<<<<< HEAD
import SignUp from './components/Auth/SignUp';
import AboutUs from './pages/AboutUs';
import Login from './components/Auth/Login';
import AccountPage from './pages/AccountPage';
=======
import SignUp from './components/SignUp';
import AboutUS from './pages/AboutUS';
import Login from './components/Login';
>>>>>>> ee2769b9fa16f8678e02d8a6b63283153f1debd8

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='SignUp' element={<SignUp/>} ></Route>
      <Route path='AboutUS' element={<AboutUS/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
      <Route path='AccountPage' element={<AccountPage/>}></Route>
    </Routes>
  );
}

export default App;
