import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function SideProfile({ acc }) {
  return (
    <Box sx={{ display:'flex'}}>
      <Card sx={{ width:300,height:600, ml: 10 ,mt:5, backgroundColor:'d6d5d4'}}>
        <CardContent>
            <PermIdentityIcon sx={{ fontSize: 100 }} />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {acc.firstName} {acc.lastName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {acc.email}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
