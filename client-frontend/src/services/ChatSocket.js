import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class ChatSocket {
  constructor() {
    this.connect();
  }

  connect() {
    this.socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    console.log('Connected to WebSocket');
    this.stompClient.subscribe('/chatroom/public', this.onMessageReceived);
    this.stompClient.subscribe('/user/private', this.onPrivateMessageReceived);
  };

  onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
  };

  sendMessage = (message) => {
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  };

  sendPrivateMessage = (message) => {
    this.stompClient.send('/app/private-message', {}, JSON.stringify(message));
  };

  onMessageReceived = (message) => {
    console.log('Public message received:', message.body);
  };

  onPrivateMessageReceived = (message) => {
    console.log('Private message received:', message.body);
  };
}

const ChatSocket = new ChatSocket();
export default ChatSocket;
