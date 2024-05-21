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
import HomepageHeader from '../homepageHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../../apis/api';

const defaultTheme = createTheme();

export default function Signup({ setIsLoggedIn }) {
    
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    function saveAccount(e) {
        e.preventDefault();
        setError('');
    
        if (password !== password2) {
            setError("Passwords do not match!");
            return;
        } else {
            const account = {
                firstName: firstname, // Updated to match backend
                lastName: lastname,   // Updated to match backend
                username,
                email,
                password,
            };
    
            addAccount(account)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        setIsLoggedIn(true);
                        
                    } 
                    navigate('/');
                })
                .catch((error) => {
                    console.error("There was an error creating the account!", error);
                    setError("There was an error creating the account!");
                });
        }
    }
    

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
                    {error && (
                        <Typography component="p" variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={saveAccount} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="first name"
                            autoComplete="name"
                            autoFocus
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="last name"
                            autoComplete="name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            id="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Link href="/SignIn" variant="body2" sx={{ color: 'red' }}>
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
