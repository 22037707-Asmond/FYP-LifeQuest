import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import InsuranceTable from '../components/Insurance/viewAllInsurance'
import ChatBot from './ChatBot';

export default function Insurance() {
  return (
   <>
    <AppNavBar />
    <InsuranceTable />
    <ChatBot />
   </>
  )
}
