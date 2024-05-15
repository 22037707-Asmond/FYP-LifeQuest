import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignInPage/>} />
    </Routes>
  );
}

export default App;
