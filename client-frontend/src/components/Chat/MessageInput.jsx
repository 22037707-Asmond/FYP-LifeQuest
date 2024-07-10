import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageInput() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderTop: '1px solid #ddd' }}>
            <TextField
                variant="outlined"
                placeholder="Write a message..."
                fullWidth
                sx={{ mr: 1 }}
            />
            <IconButton color="primary">
                <SendIcon />
            </IconButton>
        </Box>
    );
}

export default MessageInput;
