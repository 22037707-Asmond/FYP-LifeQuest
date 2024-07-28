import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AccountPage from './pages/AccountPage';
import Calendar from './pages/Calendar';
import RequestForm from './pages/RequestForm';
function App() {
  const location = useLocation();
  const isLoggedIn = false;

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/CalendarAgent' element={<Calendar />} />
        <Route path='/Profile' element={<AccountPage />} />
        <Route path='/RequestForm' element={<RequestForm />} />
      </Routes>
  );
}

export default App;
