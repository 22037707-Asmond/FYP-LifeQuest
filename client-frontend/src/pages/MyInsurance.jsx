import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import UserInsurances from '../components/Insurance/UserInsurance'

export default function Agent() {
  return (
   <>
    <AppNavBar />
    <UserInsurances />
   </>
  )
}