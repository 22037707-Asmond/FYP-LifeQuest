import React from 'react';
import { Stack, Avatar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ViewAgent = () => {
  const location = useLocation();
  const { agent } = location.state;

  return (
    <Stack spacing={2} alignItems="center" style={{ padding: '20px' }}>
      <Avatar src={`data:image/jpeg;base64,${agent.profilePicture}`} alt={`${agent.firstName} ${agent.lastName}`} style={{ width: '150px', height: '150px' }} />
      <Typography variant="h4">{`${agent.firstName} ${agent.lastName}`}</Typography>
      <Typography variant="body1">{agent.bio}</Typography>
      <Typography variant="body1">
        <strong>Years of Experience:</strong> {agent.yearsOfExperience}
      </Typography>
    </Stack>
  );
};

export default ViewAgent;
