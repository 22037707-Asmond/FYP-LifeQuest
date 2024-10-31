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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HomepageHeader from '../homepageHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../../services/AccountsAPI';

const defaultTheme = createTheme();

export default function Signup() {
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [ic, setIc] = React.useState('');
    const [sex, setSex] = React.useState(''); // Updated to handle dropdown
    const [role] = React.useState('User');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    function saveAccount(e) {
        e.preventDefault();
        setError('');

        if (password !== password2) {
            setError("Passwords do not match!");
            return;
        }

        if (!['M', 'F'].includes(sex)) {
            setError("Please select a valid gender!");
            return;
        }

        const account = {
            firstName: firstname,
            lastName: lastname,
            username,
            email,
            password,
            role,
            dateOfBirth,
            ic,
            sex,
        };

        addAccount(account)
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    navigate('/Login'); // Navigate to Login page after successful signup
                } else {
                    setError(response.data.message);
                }
            })
            .catch((error) => {
                console.error("There was an error creating the account!", error);
                setError("There was an error creating the account!");
            });
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
                            name="firstname"
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
                            name="lastname"
                            autoComplete="name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dateOfBirth"
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="ic"
                            label="IC"
                            name="ic"
                            autoComplete="ic"
                            value={ic}
                            onChange={(e) => setIc(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="sex"
                                value={sex}
                                label="Gender"
                                onChange={(e) => setSex(e.target.value)}
                            >
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                            </Select>
                        </FormControl>
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
                                <Link href="/Login" variant="body2" sx={{ color: 'red' }}>
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
