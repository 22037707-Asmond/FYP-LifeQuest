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
      <Card sx={{ width: 1200, height: 700, p: 3, ml: 20 }}>
        <Stack spacing={3} direction={"column"}>
          <Stack style={{ marginTop: 70 }}>
            <Box
              sx={{
                borderRadius: '50%',
                width: 250,
                height: 250,
              }}
            >
              <Avatar
                sx={{ width: 250, height: 250 }}
                src={profilePictureUrl}
                alt="avatar"
              />
            </Box>
          </Stack>
          <Typography variant="h4" sx={{ paddingLeft: 3, fontWeight: "bold" }} >
            {account.firstName} {account.lastName}
          </Typography>
        </Stack>
        <br />
        <Stack spacing={3} direction={"column"}>
        <Typography component="div">
            <Box display="flex" alignItems="center" gap={2}>
              <BoyIcon fontSize="large" />
              <TextField
                id="outlined-read-only-input"
                label="IC Number"
                defaultValue= {account.ic}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                sx={{ width: '300px' }}
              />
            </Box>
          </Typography>

          <Typography component="div">
            <Box display="flex" alignItems="center" gap={2}>
              <AlternateEmailIcon fontSize="large" />
              <TextField
                id="outlined-read-only-input"
                label="Username"
                defaultValue= {username}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                sx={{ width: '300px' }}
              />
            </Box>
          </Typography>

          <Typography component="div">
            <Box display="flex" alignItems="center" gap={2}>
              <EmailIcon fontSize="large" />
              <TextField
                id="outlined-read-only-input"
                label="Email"
                defaultValue={account.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                sx={{ width: '300px' }}
              />
            </Box>
          </Typography>
        </Stack>
      </Card>
    </>
  );
}
