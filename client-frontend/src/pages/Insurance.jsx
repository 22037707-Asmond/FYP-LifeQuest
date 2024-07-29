import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import InsuranceTable from '../components/Insurance/viewAllInsurance'

export default function Insurance() {
  return (
   <>
    <AppNavBar />
    <InsuranceTable />
   </>
  )
}
