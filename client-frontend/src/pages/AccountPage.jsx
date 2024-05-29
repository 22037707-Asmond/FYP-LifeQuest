import React from 'react';
import { useLocation } from 'react-router-dom';
import AppNavBar from '../components/Account/AppNavBar';
import SideProfile from '../components/Account/SideProfile';
import PostListings from '../components/Account/PostListings';
import { Stack } from '@mui/material';
import "../LifeQuest.css";

function AccountPage() {
  const location = useLocation();
  const { acc } = location.state || {}; 
  
  return (
    <div>
      <AppNavBar />
      <br />
      <Stack spacing={5} direction={'row'}>
        <SideProfile acc={acc} />
        <PostListings user={acc} />
      </Stack>
    </div>
  );
}

export default AccountPage;
