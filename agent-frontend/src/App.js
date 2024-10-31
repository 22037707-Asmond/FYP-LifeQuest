import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AccountPage from './pages/AccountPage';
import Calendar from './pages/Calendar';
import RequestForm from './pages/RequestForm';
import SideBar from './components/Account/Sidebar';
import Dashboard from './pages/Chart_Dashboard/Dashboard';

function App() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div style={styles.appContainer}>
      {!isLoginPage && <SideBar />}
      <main style={isLoginPage ? styles.mainContentFull : styles.mainContentWithSidebar}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/CalendarAgent" element={<Calendar />} />
          <Route path="/Profile" element={<AccountPage />} />
          <Route path="/RequestForm" element={<RequestForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
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
  mainContentWithSidebar: {
    flexGrow: 1,
    padding: '16px',
    overflowY: 'auto',
  },
  mainContentFull: {
    flexGrow: 1,
    padding: '16px',
    overflowY: 'auto',
    width: '100%', // Take the full width of the container when the sidebar is hidden
  },
};

export default App;
