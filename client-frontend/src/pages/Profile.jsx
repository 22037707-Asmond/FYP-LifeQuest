import React from 'react';
import AppNavBar from '../components/Account/AppNavBar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { useAccount } from '../services/LocalStorage';

export default function Profile() {
  const { account, profilePictureUrl } = useAccount();

  if (!account) {
    return (
      <>
        <AppNavBar />
        <div>No account data found</div>
      </>
    );
  }

  return (
    <>
      <AppNavBar />
      <br /> <br />
        <Card sx={{ width: 1200, height: 600, p: 3 }}>
          <Stack spacing={3} direction={"column"}>
            <Box
              sx={{
                borderRadius: '50%',
                width: 250,
                height: 250
              }}
            >
              <Avatar
                sx={{ width: 250, height: 250 }}
                src={profilePictureUrl}
                alt="avatar"
              />
            </Box>
            <Typography variant="h4">
              {account.firstName} {account.lastName}
            </Typography>
          </Stack>
        </Card>
    </>
  );
}
