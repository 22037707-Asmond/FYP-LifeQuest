import React, { useState, useEffect } from 'react';
import AppNavBar from '../components/Account/AppNavBar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LocalStorage } from '../services/LocalStorage';
import { Avatar } from '@mui/material';

export default function Profile() {
  const [account, setAccount] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountData = await LocalStorage.getAccount();
        if (accountData) {
          setAccount(accountData);
          if (accountData.profilePicture) {
            // Assuming profilePicture is a base64 encoded string
            const url = `data:image/jpeg;base64,${accountData.profilePicture}`;
            setProfilePictureUrl(url);
          }
          console.log(accountData);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchAccountData();
  }, []);

  if (!account) {
    return <div>No account data found</div>;
  }

  return (
    <>
      <AppNavBar />
      <br /> <br />
      <Stack spacing={5} direction={"row"} sx={{ ml: 10 }}>
        <Card sx={{ width: 1200, height: 600 }}>
          <Box
            sx={{
              borderRadius: '50%',
              width: 200,
              height: 200,
              ml: 5,
              mt: 3
            }}
          >
            <Avatar
              sx={{ width: 200, height: 200 }}
              src={profilePictureUrl}
              alt="avatar"
            />
          </Box>
          <Typography sx={{ ml: 5, mt: 3 }}>
            {account.firstName} {account.lastName}
          </Typography>
        </Card>
      </Stack>
    </>
  );
}
