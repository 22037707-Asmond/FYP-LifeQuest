import React, { useState } from 'react'
import AppNavBar from '../components/Account/AppNavBar'
import SideProfile from '../components/Account/SideProfile'
import "../LifeQuest.css";

function AccountPage() {
  return (
    <>
      <body>
        <AppNavBar />
        <br />
        <SideProfile />
      </body>
    </>
  )
}

export default AccountPage
