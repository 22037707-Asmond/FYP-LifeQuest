import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const connectWebSocket = (username) => {
    const Sock = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(Sock);

    stompClient.connect({}, () => {
        stompClient.subscribe(`/user/${username}/private`, onPrivateMessageReceived);
        userJoin(username, stompClient);
    }, onError);
};

const userJoin = (username, stompClient) => {
    const chatMessage = {
        sender: username,
        content: "JOIN",
        timestamp: new Date().toISOString()
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
};

const onPrivateMessageReceived = (payload) => {
    // Handle incoming private messages here
};

const onError = (err) => {
    console.error('Error connecting to WebSocket:', err);
};
