import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, TextField, DialogActions, Button, DialogContent, Avatar } from '@mui/material';
import { updateAccount, addImage } from '../../services/AccountsAPI';
import { LocalStorage, pwdStorage } from '../../services/LocalStorage';

export default function EditUser({ account, open, handleClose, onAccountUpdate }) {
    const [firstName, setFirstName] = useState(account.firstName || '');
    const [lastName, setLastName] = useState(account.lastName || '');
    const [username, setUsername] = useState(account.username || '');
    const [email, setEmail] = useState(account.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(account.profilePictureUrl || '');

    useEffect(() => {
        const fetchPassword = async () => {
            try {
                const storedPwd = await pwdStorage.getPwd();
                if (storedPwd) {
                    setPassword(storedPwd);
                    setConfirmPassword(storedPwd); // Set confirm password field to match stored password
                }
            } catch (error) {
                console.error('Error fetching stored password:', error);
            }
        };

        fetchPassword();
    }, []);

    const handleSave = async () => {
        // Check if password and confirmPassword are not empty and match
        if (password !== '' && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const updatedAccount = {
            firstName,
            lastName,
            username,
            email
        };

        if (password !== '') {
            updatedAccount.password = password; // Only add password if it's not empty
        }

        try {
            await updateAccount(account.id, updatedAccount);
            if (profilePicture) {
                await addImage(profilePicture, account.id);
            }
            const newAccount = { ...account, ...updatedAccount, profilePictureUrl: preview };
            LocalStorage.setAccount(newAccount);
            pwdStorage.setPwd(password); // Save the updated password in localStorage
            if (typeof onAccountUpdate === 'function') {
                onAccountUpdate(newAccount);
            }
            handleClose(); // Close the dialog after saving
        } catch (error) {
            setError("Failed to update account");
            console.error('Error updating account:', error);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit Account Details</DialogTitle>
            <DialogContent>
                <Avatar src={preview} alt="Profile Picture" style={{ width: 100, height: 100, marginBottom: 16 }} />
                <input
                    accept="image/*"
                    id="upload-profile-picture"
                    type="file"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="upload-profile-picture">
                    <Button variant="contained" component="span">
                        Upload New Profile Picture
                    </Button>
                </label>
                <TextField
                    required
                    id="outlined-first-name"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-last-name"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="outlined-confirm-password"
                    label="Re-Enter Password"
                    type="password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
