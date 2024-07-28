import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allAgents } from '../../services/AgentAPI';

const AgentTable = () => {
  const [agents, setAgents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    allAgents().then((data) => setAgents(data));
  }, []);

  const handleChatClick = (agent) => {
    navigate(`/chat/${agent.id}`, { state: { agentName: `${agent.firstName} ${agent.lastName}`, agentUserName: `${agent.username}` } });
  };

  const handleProfileClick = (agent) => {
    navigate(`/viewagent/${agent.id}`, { state: { agent } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3} id="petsRow">
        {agents.map((agent, key) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key} style={{ marginTop: '16px' }}>
            <Card id="agentTemplate" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
              <CardHeader title={`${agent.firstName} ${agent.lastName}`} style={{ fontWeight: 'bolder', color: 'black' }} />
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${agent.profilePicture}`}
                alt="agent picture"
                style={{ objectFit: 'contain', height: '300px', width: '100%' }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="body1" gutterBottom>
                  {agent.bio}
                </Typography>
                <Typography variant="body1">
                  <strong>Years of EXP: </strong>
                  {agent.yearsOfExperience}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px', padding: '12px 24px', fontSize: '16px', width: '120px', height: '50px', backgroundColor: 'red' }}
                    onClick={() => handleProfileClick(agent)}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ padding: '12px 24px', fontSize: '16px', width: '120px', height: '50px', backgroundColor: 'red' }}
                    onClick={() => handleChatClick(agent)}
                  >
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AgentTable;
