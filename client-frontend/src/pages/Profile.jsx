import React from 'react';
import AppNavBar from '../components/Account/AppNavBar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { useAccount } from '../services/LocalStorage';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import BoyIcon from '@mui/icons-material/Boy';
import ProfileCard from '../components/Account/ProfileCard';

export default function Profile() {
  const { account, profilePictureUrl } = useAccount();

  if (!account) {
    return (
      <>
        <AppNavBar />
        <Stack>No account data found</Stack>
      </>
    );
  }
  const username = account.username;

  return (
    <>
      <AppNavBar />
      <br /> <br />
      <ProfileCard />
    </>
  );
}
