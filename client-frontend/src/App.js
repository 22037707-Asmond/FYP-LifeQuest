import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import AboutUs from './pages/AboutUs';
import AccountPage from './pages/AccountPage';
import Agent from './pages/Agent';
import Calculator from './pages/Calculator';
import Calendar from './pages/Calendar';
import Chat from './pages/Chat';
import ChatBot from './pages/ChatBot';
import Homepage from './pages/Homepage';
import Insurance from './pages/Insurance';
import InsuranceDetails from './pages/InsuranceDetails';
import LifeQuest from './pages/LifeQuest';
import MyInsurance from './pages/MyInsurance';
import PaymentPage from './pages/PaymentPage';
import Profile from './pages/Profile';
import Receipt from './pages/ReceiptPage';

function App() {
  return (
     <>
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='SignUp' element={<SignUp />} ></Route>

        <Route path='AboutUS' element={<AboutUs />}></Route>

        <Route path='Login' element={<Login />}></Route>

        <Route path='LifeQuest' element={<LifeQuest />}></Route>

        <Route path='AccountPage' element={<AccountPage />}></Route>

        <Route path="CalendarClient" element={<Calendar/>}></Route>

        <Route path="Profile" element={<Profile/>}></Route>
        
        <Route path="Payment" element={<PaymentPage/>}></Route>

        <Route path='Chat' element={<Chat/>}></Route>

        <Route path="/chat/:agentId" element={<Chat />} />

        <Route path="Agents" element={<Agent/>}></Route>

        <Route path="Insurance" element={<Insurance/>}></Route>

        <Route path="Insurance/:id" element={<InsuranceDetails />} />

        <Route path="Calculator" element={< Calculator/>}></Route>

        <Route path='Agent/:agentId'></Route>

        <Route path='ViewAgent/:agentId' element={<ViewAgent/>}></Route>

        <Route path='myInsurance' element={<MyInsurance/>}></Route>

        <Route path='Receipt' element={<Receipt/>}></Route>

      </Routes>
     
     </>
  );
}

export default App;
