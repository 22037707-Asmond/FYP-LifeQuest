import React from 'react';
import AppNavBar from '../components/Account/AppNavBar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { LocalStorage } from '../services/LocalStorage';

export default function Profile() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const accountData = LocalStorage.getAccount();
    if (accountData) {
      setAccount(accountData);
      console.log(accountData);
    }
  }, []);

  if (!account) {
    return <div>No account data found</div>;
  }

  return (
    <>
      <AppNavBar />
      <br/> <br/>
      <Stack spacing={5} direction={"row"} sx={{ml:10}}>
        <Card sx={
          { width:800,
            height:600,

          }}>
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: 'black',
              width: 200,
              height: 200,
              ml: 5,
              mt:3
            }}
          >
          </Box>
          <Typography >
           {account.firstName} {account.lastName}
          </Typography>
        </Card>
      </Stack>
    </>
  );
}
