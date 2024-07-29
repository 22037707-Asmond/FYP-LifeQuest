import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { Stack, Avatar, Typography, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AppNavBar from '../components/Account/AppNavBar';
import { useNavigate } from 'react-router-dom';

const ViewAgent = () => {
  const location = useLocation();
  const { agent } = location.state;

  const navigate = useNavigate();

  const handleChatClick = (agent) => {
    navigate(`/chat/${agent.id}`, { state: { agentName: `${agent.firstName} ${agent.lastName}`, agentUserName: `${agent.username}` } });
  };


  return (
    <>
      <AppNavBar />

      <Stack spacing={5} direction={'row'} alignItems="center" justifyContent='center' style={{ marginTop: '80px' }}>
        <Stack spacing={2} sx={{ width: '800px' }}>
          <Typography variant='h3'>HELLO</Typography>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {`I'm ${agent.firstName} ${agent.lastName}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {agent.about}
          </Typography>
          <Box>
            <Typography variant="body2"><strong>License:</strong> {agent.license}</Typography>
            <Typography variant="body2"><strong>Years of Service:</strong> {agent.yearsOfService} years</Typography>
            <Typography variant="body2"><strong>Phone Number:</strong> {agent.telephone}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {agent.email}</Typography>
          </Box>
          <Button
            variant="contained"
            sx={
              {
                backgroundColor: 'red',
                width: '200px',
                fontSize: '20px'
              }}
            onClick={() => handleChatClick(agent)}
          >
            Ask Me
          </Button>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Avatar
            variant="square"
            src={`data:image/jpeg;base64,${agent.profilePicture}`}
            alt={`${agent.firstName} ${agent.lastName}`}
            sx={{
              width: '450px',
              height: '600px',
              marginBottom: '16px',
              objectFit: 'cover',
              backgroundColor: 'white' // Ensure the background is white or any color to fill the empty space
            }}
          />

        </Stack>
      </Stack>
    </>
  );
};

export default ViewAgent;
