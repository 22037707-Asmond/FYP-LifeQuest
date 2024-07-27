import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import ReceiptPage from '../components/Receipt'

export default function Agent() {
  return (
   <>
    <AppNavBar />
    <ReceiptPage />
   </>
  )
}