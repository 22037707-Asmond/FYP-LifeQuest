import React from 'react'
import AppNavBar from '../components/Account/AppNavBar';
import { Typography } from '@mui/material'
import AgentTable from '../components/Agent/viewall'

export default function Agent() {
  return (
   <>
    <AppNavBar />
    <AgentTable />
   </>
  )
}
