import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { useAccount } from '../../services/LocalStorage';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import EditAgent from './EditAgent';
import IconButton from '@mui/material/IconButton';

const ProfileCard = styled(Card)({
    maxWidth: 800,
    margin: 'auto',
    padding: '20px',
});

const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid #ccc',
});

const ProfileInfo = styled(Box)({ 
    paddingTop: '20px',
});

const InfoRow = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
});

const Label = styled(Typography)({
    fontWeight: 'bold',
});

const Value = styled(Typography)({
    color: '#555',
});


export default function Profile() {
    const { account, profilePictureUrl } = useAccount();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleOpenEditDialog = () => {
        setIsEditDialogOpen(true);
    };
    
    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    if (!account) {
        return (
            <Stack>No account data found</Stack>
        );
    }

    return (
        <ProfileCard>
            <ProfileHeader>
                <Avatar
                    sx={{ width: 120, height: 120, marginRight: '20px' }}
                    src={profilePictureUrl}
                    alt="Profile Picture"
                />
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {account.mr_ms} {account.firstName} {account.lastName}
                    </Typography>
                    <Typography variant="body1">
                        Agent ID: {account.id}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton onClick={handleOpenEditDialog}>
                            <EditIcon sx={{ mt: 2 }} fontSize="large" />
                        </IconButton>
                        <Typography variant="caption">Edit</Typography>
                    </Box>

                <EditAgent
                account={account}
                open={isEditDialogOpen}
                handleClose={handleCloseEditDialog}
            />
            </ProfileHeader>

            <ProfileInfo>
                <Typography variant="h6" sx={{ paddingBottom: '10px' }}>
                    Agent Details
                </Typography>

                <InfoRow>
                    <Label>Years of Experience</Label>
                    <Value>{account.yearsOfExperience}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Bio</Label>
                    <Value>{account.bio}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Phone Number</Label>
                    <Value>{account.phoneNumber}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Salary</Label>
                    <Value>${account.salary.toLocaleString()}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>License</Label>
                    <Value>{account.license}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>Email</Label>
                    <Value>{account.email}</Value>
                </InfoRow>

                {/* <InfoRow>
                    <Label>Telephone</Label>
                    <Value>{account.telephone}</Value>
                </InfoRow> */}
            </ProfileInfo>

            <ProfileInfo sx={{ paddingTop: '20px' }}>
                <Typography variant="h6" sx={{ paddingBottom: '10px' }}>
                    About
                </Typography>
                <Typography variant="body1">
                    {account.about}
                </Typography>
            </ProfileInfo>
        </ProfileCard>
    );
}
