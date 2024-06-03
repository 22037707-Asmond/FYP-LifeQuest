import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useAccount } from '../../services/LocalStorage';

export default function SideProfile() {
  const { account, profilePictureUrl } = useAccount(); // Ensure consistent naming

  if (!account) {
    return <Typography>No account data found</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }} >
      <Card sx={{ width: 300, height: 300, ml: 10, mt: 5, backgroundColor: 'd6d5d4' }}>
        <CardContent>
          <Stack direction={'column'} alignItems={"center"}>
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={profilePictureUrl}
              alt="avatar"
            />
            <Stack sx={{mt: 3, fontSize:20}}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {account.firstName} {account.lastName} {/* Ensure proper property access */}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {account.email} {/* Ensure proper property access */}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
