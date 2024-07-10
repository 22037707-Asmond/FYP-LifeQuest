import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../services/LocalStorage';
import { authAgent } from '../services/AgentsAPI';

const defaultTheme = createTheme();

export default function Login() {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDetails = await authAgent(username, password);
            console.log(userDetails);
           
            if (userDetails) {
                LocalStorage.setAccount(userDetails); // Store user details in localStorage
                navigate('/Profile');
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('Failed to authenticate. Please try again later.');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        padding: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Avatar sx={{ m: 2, bgcolor: 'error.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login to your TeeUp Account
                    </Typography>
                    {error && (
                        <Typography component="p" variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Link href="/SignUp" variant="body2" sx={{ color: 'red' }}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
