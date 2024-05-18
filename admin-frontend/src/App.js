import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import AddAdmin from './pages/AddAdmin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignInPage/>} />
      <Route path='/Admin_Create' element={<AddAdmin/>} />
    </Routes>
  );
}

export default App;
