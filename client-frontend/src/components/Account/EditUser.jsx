import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, DialogActions, Button, DialogContent } from '@mui/material';

export default function EditUser({ account, open, handleClose }) {
    const [username, setUsername] = useState(account.username || '');
    const [email, setEmail] = useState(account.email || '');
    const [password, setPassword] = useState(account.password);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        // Handle save logic here, such as updating the user account
       
        handleClose(); // Close the dialog after saving
    };    

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit Account Details</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    id="outlined-username"
                    label="Edit Username"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="outlined-email"
                    label="Edit Email"
                    defaultValue={email}
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
