import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MessageInput from './MessageInput';

const messages = [
    { sender: 'Ying Yi', text: 'Hello Asmond, thanks for connecting :D.', time: '10:45 PM' },
    // Add more messages
];

function ChatWindow() {
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {messages.map((msg, index) => (
                    <Paper key={index} sx={{ p: 1, mb: 1 }}>
                        <Typography variant="body1"><strong>{msg.sender}:</strong> {msg.text}</Typography>
                        <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                    </Paper>
                ))}
            </Box>
            <MessageInput />
        </Box>
    );
}

export default ChatWindow;
