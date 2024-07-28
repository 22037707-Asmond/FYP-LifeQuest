import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogActions, Button, DialogContent, Avatar } from '@mui/material';
import { updateAccount } from '../../services/AccountsAPI';

export default function EditUser({ account, open, handleClose }) {
    const [firstName, setFirstName] = useState(account.firstName || '');
    const [lastName, setLastName] = useState(account.lastName || '');
    const [username, setUsername] = useState(account.username || '');
    const [email, setEmail] = useState(account.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(account.profilePictureUrl || '');

    const handleSave = async () => {
        console.log("account", account);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        const updatedAccount = {
            firstName,
            lastName,
            username,
            email,
            password
        };

        try {
            await updateAccount(account.id, updatedAccount);
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
                    id="outlined-username"
                    label="Edit Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-email"
                    label="Edit Email"
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
