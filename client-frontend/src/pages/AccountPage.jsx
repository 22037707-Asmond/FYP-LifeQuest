import React, { useState } from 'react'
import AppNavBar from '../components/Account/AppNavBar'
import SideProfile from '../components/Account/SideProfile'
import PostListings from '../components/Account/PostListings';
import { Stack } from '@mui/material';
import "../LifeQuest.css";

function AccountPage() {
  return (
    <>
      <body>
        <AppNavBar />
        <br />
        <Stack spacing={5} direction={'row'}>
          <SideProfile />
          <PostListings />
        </Stack>
      </body>
    </>
  )
}

export default AccountPage
