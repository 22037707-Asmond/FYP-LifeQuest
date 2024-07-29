import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AccountPage from './pages/AccountPage';
import Calendar from './pages/Calendar';
import RequestForm from './pages/RequestForm';
import SideBar from './components/Account/Sidebar';

function App() {
  const location = useLocation();
  const isLoggedIn = false;

  return (
    <div style={styles.appContainer}>
      <SideBar />
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/CalendarAgent" element={<Calendar />} />
          <Route path="/Profile" element={<AccountPage />} />
          <Route path="/RequestForm" element={<RequestForm />} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
  },
  mainContent: {
    flexGrow: 1,
    padding: '16px',
    overflowY: 'auto',
  },
};

export default App;
