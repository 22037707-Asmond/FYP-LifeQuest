import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import AccountPage from './pages/AccountPage';
import AboutUs from './pages/AboutUs';
import LifeQuest from './pages/LifeQuest';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Agent from './pages/Agent';
import Insurance from './pages/Insurance';
import Calculator from './pages/Calculator';
import Calendar from './pages/Calendar';
import PaymentPage from './pages/PaymentPage';
import ChatBot from './pages/ChatBot';
import ViewAgent from './pages/viewAgent';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='aboutus' element={<AboutUs />} />
      <Route path='login' element={<Login />} />
      <Route path='lifequest' element={<LifeQuest />} />
      <Route path='accountpage' element={<AccountPage />} />
      <Route path='calendarclient' element={<Calendar />} />
      <Route path='profile' element={<Profile />} />
      <Route path='payment' element={<PaymentPage />} />
      <Route path='chat' element={<Chat />} />
      <Route path='/chat/:agentId' element={<Chat />} />
      <Route path='agents' element={<Agent />} />
      <Route path='insurance' element={<Insurance />} />
      <Route path='calculator' element={<Calculator />} />
      <Route path='agent/:agentId' element={<Agent />} />
      <Route path='chatbot' element={<ChatBot />} />
      <Route path='viewagent/:agentId' element={<ViewAgent />} />
    </Routes>
  );
}

export default App;
