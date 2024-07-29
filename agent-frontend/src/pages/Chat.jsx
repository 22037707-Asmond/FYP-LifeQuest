import {
    Avatar,
    ChatContainer,
    Conversation,
    ConversationHeader,
    ConversationList,
    InfoButton,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    MessageSeparator,
    Search,
    Sidebar,
    VideoCallButton,
    VoiceCallButton
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useAccount } from '../services/LocalStorage';

const ChatPage = () => {
    const { account, profilePictureUrl } = useAccount();
    const { agentId } = useParams();
    const location = useLocation();
    const agentName = location.state?.agentName || "Agent";
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState(agentId ? agentName : 'CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receivername: agentName,
        message: ''
    });

    const [userNames, setUserNames] = useState(new Map());
    const [userPictures, setUserPictures] = useState(new Map());

    useEffect(() => {
        const fetchUserNames = async () => {
            const names = new Map();
            for (let username of privateChats.keys()) {
                try {
                    const fullName = await getFullName(username);
                    names.set(username, fullName);
                } catch (error) {
                    console.error('Error fetching full name:', error);
                }
            }
            setUserNames(names);
        };
        fetchUserNames();
    }, [privateChats]);


    useEffect(() => {
        const fetchUserPicture = async () => {
            const newUserPics = new Map();
            for (let username of privateChats.keys()) {
                try {
                    const pictureUrl = await getPictureUrl(username);
                    newUserPics.set(username, pictureUrl);
                    console.log(`Picture URL for ${username}: ${pictureUrl}`); // Debugging
                } catch (error) {
                    console.error(`Failed to fetch picture for user ${username}:`, error);
                }
            }
            setUserPictures(newUserPics);
        };
        fetchUserPicture();
    }, [privateChats]);





    const stompClientRef = useRef(null);

    useEffect(() => {
        if (account) {
            setUserData((prevUserData) => ({ ...prevUserData, username: account.username }));
            connect(account.username);
            console.log('Account:', account.username);
        }
    }, [account]);

    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem('privateChats'));
        if (savedChats) {
            setPrivateChats(new Map(savedChats));
        }

        const savedPublicChats = JSON.parse(localStorage.getItem('publicChats'));
        if (savedPublicChats) {
            setPublicChats(savedPublicChats);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('privateChats', JSON.stringify([...privateChats]));
    }, [privateChats]);

    useEffect(() => {
        localStorage.setItem('publicChats', JSON.stringify(publicChats));
    }, [publicChats]);

    const connect = (username) => {
        const Sock = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(Sock);
        stompClient.connect({}, () => onConnected(username, stompClient), onError);
        stompClientRef.current = stompClient;
    };

    const onConnected = (username, stompClient) => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe(`/user/${username}/private`, onPrivateMessageReceived);
        userJoin(username);
    };

    const userJoin = (username) => {
        const chatMessage = {
            sender: username,
            content: "JOIN",
            timestamp: new Date().toISOString()
        };
        stompClientRef.current.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        if (payloadData.content !== "JOIN") {
            setPublicChats((prevPublicChats) => [...prevPublicChats, payloadData]);
        }
    };

    const onPrivateMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateChats((prevPrivateChats) => {
            const updatedChats = new Map(prevPrivateChats);
            if (updatedChats.get(payloadData.sender)) {
                updatedChats.get(payloadData.sender).push(payloadData);
            } else {
                updatedChats.set(payloadData.sender, [payloadData]);
            }
            return updatedChats;
        });
    };

    const onError = (err) => {
        console.error('Error connecting to WebSocket:', err);
    };

    const handleMessage = (value) => {
        console.log('Input value:', value);
        setUserData((prevUserData) => ({ ...prevUserData, message: value }));
    };

    const sendValue = () => {
        if (stompClientRef.current) {
            const chatMessage = {
                sender: userData.username,
                content: userData.message,
                timestamp: new Date().toISOString()
            };
            stompClientRef.current.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
        } else {
            console.error('stompClient is not initialized');
        }
    };

    const sendPrivateValue = () => {
        if (stompClientRef.current) {
            const chatMessage = {
                sender: userData.username,
                receiver: tab,
                content: userData.message,
                timestamp: new Date().toISOString()
            };
            setPrivateChats((prevPrivateChats) => {
                const updatedChats = new Map(prevPrivateChats);
                if (updatedChats.get(tab)) {
                    updatedChats.get(tab).push(chatMessage);
                } else {
                    updatedChats.set(tab, [chatMessage]);
                }
                return updatedChats;
            });
            console.log('Private receiver:', tab);
            stompClientRef.current.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
        } else {
            console.error('stompClient is not initialized');
        }
    };

    return (
        <>
            <MainContainer
                responsive
                style={{
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Sidebar position="left" style={{ width: '300px' }}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        <Conversation name="Chatroom" active={tab === "CHATROOM"} onClick={() => setTab("CHATROOM")}>
                            <Avatar src={profilePictureUrl} status="available" />
                        </Conversation>
                        {[...privateChats.keys()].map((name, index) => (
                            <Conversation key={index} name={name} active={tab === name} onClick={() => setTab(name)}>
                                <Avatar src={profilePictureUrl} status="available" />
                            </Conversation>
                        ))}
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Back />
                        <Avatar src={profilePictureUrl} name={tab} />
                        <ConversationHeader.Content userName={tab} />
                        <ConversationHeader.Actions>
                            <VoiceCallButton />
                            <VideoCallButton />
                            <InfoButton />
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList>
                        <MessageSeparator content="Today" />
                        {(tab === "CHATROOM" ? publicChats : privateChats.get(tab) || []).map((chat, index) => (
                            <Message
                                key={index}
                                model={{
                                    direction: chat.sender === userData.username ? 'outgoing' : 'incoming',
                                    message: chat.content,
                                    position: 'single',
                                    sender: chat.sender,
                                    sentTime: new Date(chat.timestamp).toLocaleTimeString()
                                }}
                            >
                                <Avatar src={profilePictureUrl} name={chat.sender} />
                            </Message>
                        ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={userData.message}
                        onChange={handleMessage}
                        onSend={tab === "CHATROOM" ? sendValue : sendPrivateValue}
                    />
                </ChatContainer>
            </MainContainer>
        </>
    );
};

export default ChatPage;
