import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import InsuranceDetails from '../components/Insurance/insuranceDetails'

export default function Agent() {
  return (
   <>
    <AppNavBar />
    <InsuranceDetails />
   </>
  )
}