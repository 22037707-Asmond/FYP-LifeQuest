import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AccountPage from './pages/AccountPage';
import Calendar from './pages/Calendar';



function App() {
  const isLoggedIn = false;
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/chat' element={<Chat />}></Route>

      <Route path='/CalendarAgent' element={<Calendar />}></Route>

      <Route path="/Profile" element={<AccountPage />}></Route>
    </Routes>
  );
}

export default App;

