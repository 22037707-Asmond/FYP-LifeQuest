import React, { useEffect, useState } from 'react';
import AppNavBar from '../components/Account/AppNavBar';
import SideProfile from '../components/Account/SideProfile';
import PostListings from '../components/Account/PostListings';
import { Stack } from '@mui/material';
import "../LifeQuest.css";
import { LocalStorage } from '../services/LocalStorage';

function AccountPage() {
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
    <div>
      <AppNavBar />
      <br />
      <Stack spacing={5} direction={'row'}>
        <SideProfile acc={account} />
        {/* <PostListings user={account} /> */}
      </Stack>
    </div>
  );
}

export default AccountPage;

