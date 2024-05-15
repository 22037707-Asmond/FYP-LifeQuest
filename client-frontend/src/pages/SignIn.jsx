import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenOutlined from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomepageHeader from '../components/homepageHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Signup({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // const formData = {
        //     username: data.get('username'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     password2: data.get('password2'),
        // };

        // if (formData.password === formData.password2) {
        //     const res = await UserService.createUser(formData);
        //     const isSuccessful = res.message && res.message.includes("successfully");
        //     if (isSuccessful) {
        //         alert(res.message);
        //         setIsLoggedIn(true);
        //         navigate('/', { replace: true });
        //     } else {
        //         alert(res.response.data.message);
        //     }
        // } else {
        //     alert("Passwords do not match. Please try again");
        // }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <HomepageHeader />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOpenOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up for an account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Name"
                            name="username"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            id="password2"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center" alignItems="center" >
                            <Grid item>
                                <Link href="/" variant="body2" sx={{ color: 'red' }}>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
