import { Button, Card, CardContent, Grid, Typography, Avatar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allAgents } from '../../services/AgentAPI';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AgentTable = () => {
  const [agents, setAgents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    allAgents().then((data) => setAgents(data));
  }, []);

  const handleViewClick = (agent) => {
    navigate(`/viewagent/${agent.id}`, { state: { agent } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {agents.map((agent, key) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
            <Card style={{ padding: '20px', boxShadow: 'none', border: '1px solid #ddd' }}>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <Avatar
                  alt="agent picture"
                  src={`data:image/jpeg;base64,${agent.profilePicture}`}
                  sx={{ width: 60, height: 60, marginRight: '16px' }}
                />
                <Box>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {agent.firstName.toUpperCase()} {agent.lastName.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {agent.license}
                  </Typography>
                </Box>
              </Box>
              <CardContent style={{ padding: '0', marginBottom: '16px' }}>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
                  {agent.bio}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="text"
                  onClick={() => handleViewClick(agent)}
                  style={{ color: 'red', fontWeight: 'bold', textTransform: 'none' }}
                  endIcon={<ArrowForwardIosIcon />}
                >
                  View Agent
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AgentTable;
