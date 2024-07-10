import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allAgents } from '../../services/AgentAPI';

const AgentTable = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allAgents().then((res) => {
      setAgents(res.data);
    });
  }, []);

  const handleMessageClick = (agent) => {
    navigate(`/chat/${agent.id}`, { state: { agentName: `${agent.firstName} ${agent.lastName}` , agentUserName: `${agent.username}` } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" align="center" fontWeight="bold">
        List of Agents
      </Typography>
      <Grid container spacing={3} id="petsRow">
        {agents.map((agent, key) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key} style={{ marginTop: '16px' }}>
            <Card id="agentTemplate" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
              <CardHeader title={`${agent.firstName} ${agent.lastName}`} />
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${agent.profilePicture}`}
                alt="agent picture"
                style={{ objectFit: 'contain', height: '200px', width: '100%' }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="body1" gutterBottom>
                  {agent.bio}
                </Typography>
                <Typography variant="body1">
                  <strong>Years of EXP: </strong>
                  {agent.yearsOfExperience}
                </Typography>
              </CardContent>
              <div style={{ padding: '3px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ flex: 1, marginRight: '5px' }}
                >
                  Profile
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ flex: 1 }}
                  onClick={() => handleMessageClick(agent)}
                >
                  Message
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AgentTable;
