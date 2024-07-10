import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Avatar, IconButton } from '@mui/material';
import { useAccount } from '../../services/LocalStorage';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import BoyIcon from '@mui/icons-material/Boy';
import AppNavBar from './AppNavBar';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import EditUser from './EditUser';

const ProfileBackground = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '250px', // Adjust the height as needed
    backgroundImage: 'url(images/background.jpg)', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
});


export default function ProfileCard() {
    const { account, profilePictureUrl } = useAccount();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    if (!account) {
        return (
            <>
                <AppNavBar />
                <Stack>No account data found</Stack>
            </>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('account');
        window.location.href = '/';
    };

    const handleOpenEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    return (
        <Card sx={{ width: 800, height: 700, p: 3, ml: 20, position: 'relative' }}>
            <ProfileBackground />
            <Stack spacing={3} direction={"column"} sx={{ position: 'relative', zIndex: 2, mt: 5 }}>
                <Box
                    sx={{
                        borderRadius: '50%',
                        width: 250,
                        height: 250,
                        backgroundColor: 'white',
                        zIndex: 3,
                        position: 'relative',
                        marginTop: '-100px',
                        marginLeft: '20px',
                        border: '5px solid white',
                    }}
                >
                    <Avatar
                        sx={{ width: '100%', height: '100%' }}
                        src={profilePictureUrl}
                        alt="avatar"
                    />
                </Box>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: -1 }}>
                    <Typography variant="h4" sx={{ paddingLeft: 3, fontWeight: "bold", mt: 2, flexGrow: 1 }}>
                        {account.firstName} {account.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton onClick={handleOpenEditDialog}>
                            <EditIcon sx={{ mt: 2 }} fontSize="large" />
                        </IconButton>
                        <Typography variant="caption">Edit</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton>
                            <HealthAndSafetyIcon sx={{ mt: 2 }} fontSize="large" />
                        </IconButton>
                        <Typography variant="caption">Health</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon sx={{ mt: 2 }} fontSize="large" />
                        </IconButton>
                        <Typography variant="caption">Logout</Typography>
                    </Box>
                </Stack>
            </Stack>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
            >
                
            </IconButton>
            <Stack spacing={3} direction={"column"} sx={{ position: 'relative', zIndex: 2, mt: 1 }}>
                <Typography component="div">
                    <Box display="flex" alignItems="center" gap={2}>
                        <BoyIcon fontSize="large" />
                        <TextField
                            id="outlined-read-only-input"
                            label="IC Number"
                            defaultValue={account.ic}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            sx={{ width: '300px' }}
                        />
                    </Box>
                </Typography>

                <Typography component="div">
                    <Box display="flex" alignItems="center" gap={2}>
                        <AlternateEmailIcon fontSize="large" />
                        <TextField
                            id="outlined-read-only-input"
                            label="Username"
                            defaultValue={account.username}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            sx={{ width: '300px' }}
                        />
                    </Box>
                </Typography>

                <Typography component="div">
                    <Box display="flex" alignItems="center" gap={2}>
                        <EmailIcon fontSize="large" />
                        <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue={account.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            sx={{ width: '300px' }}
                        />
                    </Box>
                </Typography>
            </Stack>
            <EditUser
                account={account}
                open={isEditDialogOpen}
                handleClose={handleCloseEditDialog}
            />
        </Card>
    );
}
