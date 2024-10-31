import React, { useEffect, useState, useRef } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AppNavBar from '../components/Account/AppNavBar';
import { useAccount } from '../services/LocalStorage';
import { useParams, useLocation } from 'react-router-dom';
import { getFullName, getPictureUrl } from '../services/AgentAPI';
import {
    MainContainer,
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    Avatar,
    ChatContainer,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
    MessageList,
    MessageSeparator,
    Message,
    TypingIndicator,
    MessageInput,
    ExpansionPanel
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ChatBot from './ChatBot';

const ChatPage = () => {
    const { account } = useAccount();
    const { agentId } = useParams();
    const location = useLocation();
    const agentName = location.state?.agentUserName || "Agent";
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState(agentId ? agentName : '');
    const [userData, setUserData] = useState({
        username: '',
        receivername: agentName,
        message: ''
    });
    const [agentNames, setAgentNames] = useState(new Map());
    const [agentPictures, setAgentPictures] = useState(new Map());

    const stompClientRef = useRef(null);

    useEffect(() => {
        if (account) {
            setUserData((prevUserData) => ({ ...prevUserData, username: account.username }));
            connect(account.username);
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            const savedPrivateChats = JSON.parse(localStorage.getItem(`privateChats_${account.username}`));
            if (savedPrivateChats) {
                setPrivateChats(new Map(savedPrivateChats));
            }
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            localStorage.setItem(`privateChats_${account.username}`, JSON.stringify([...privateChats]));
        }
    }, [privateChats, account]);

    useEffect(() => {
        const fetchAgentNames = async () => {
            const newAgentNames = new Map();
            for (let username of privateChats.keys()) {
                try {
                    const fullName = await getFullName(username);
                    newAgentNames.set(username, fullName);
                } catch (error) {
                    console.error(`Failed to fetch full name for user ${username}:`, error);
                }
            }
            setAgentNames(newAgentNames);
        };
        fetchAgentNames();
    }, [privateChats]);

    useEffect(() => {
        const fetchAgentPictures = async () => {
            const newAgentPictures = new Map();
            for (let username of privateChats.keys()) {
                try {
                    const pictureUrl = await getPictureUrl(username);
                    newAgentPictures.set(username, pictureUrl);
                } catch (error) {
                    console.error(`Failed to fetch picture for user ${username}:`, error);
                }
            }
            setAgentPictures(newAgentPictures);
        };
        fetchAgentPictures();
    }, [privateChats]);

    const connect = (username) => {
        const Sock = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(Sock);
        stompClient.connect({}, () => onConnected(username, stompClient), onError);
        stompClientRef.current = stompClient;
    };

    const onConnected = (username, stompClient) => {
        console.log('Connected to WebSocket');
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

    const onPrivateMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateChats((prevPrivateChats) => {
            const updatedChats = new Map(prevPrivateChats);
            if (updatedChats.get(payloadData.sender)) {
                updatedChats.get(payloadData.sender).push(payloadData);
            } else {
                updatedChats.set(payloadData.sender, [payloadData]);
            }
            if (account) {
                localStorage.setItem(`privateChats_${account.username}`, JSON.stringify([...updatedChats]));
            }
            return updatedChats;
        });
    };

    const onError = (err) => {
        console.error('Error connecting to WebSocket:', err);
    };

    const handleMessage = (value) => {
        setUserData((prevUserData) => ({ ...prevUserData, message: value }));
    };

    const sendPrivateValue = () => {
        if (stompClientRef.current) {
            const chatMessage = {
                sender: userData.username,
                receiver: userData.receivername,
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
            stompClientRef.current.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
        }
    };

    const handleTabChange = (newTab) => {
        setTab(newTab);
        setUserData((prevUserData) => ({
            ...prevUserData,
            receivername: newTab
        }));
    };

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
    };

    const handleAttachClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const currentAvatar = agentPictures.get(tab);
    const currentAgentName = agentNames.get(tab) || tab;

    return (
        <>
            <AppNavBar />
            <br />
            <MainContainer
                responsive
                style={{
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '1500px',
                    alignContent: 'center',
                    margin: 'auto'
                }}
            >
                <Sidebar position="left" style={{ width: '300px' }}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        {[...privateChats.keys()].map((name, index) => (
                            <Conversation
                                key={index}
                                name={agentNames.get(name) || name}
                                active={tab === name}
                                onClick={() => handleTabChange(name)}
                                style={{ fontSize: '20px' }}
                            >
                                <Avatar src={agentPictures.get(name)} status="available" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                            </Conversation>
                        ))}
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    {tab && (
                        <ConversationHeader>
                            <ConversationHeader.Back />
                            <Avatar src={currentAvatar} name={currentAgentName} />
                            <ConversationHeader.Content userName={currentAgentName} />
                            <ConversationHeader.Actions>
                                <VoiceCallButton />
                                <VideoCallButton />
                                <InfoButton />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                    )}
                    <MessageList>
                        <MessageSeparator content="Today" />
                        {(privateChats.get(tab) || []).map((chat, index) => (
                            <Message
                                key={index}
                                model={{
                                    direction: chat.sender === userData.username ? 'outgoing' : 'incoming',
                                    message: chat.content,
                                    position: 'single',
                                    sender: chat.sender,
                                    sentTime: new Date(chat.timestamp).toLocaleTimeString()
                                }}
                                style={{ fontSize: '30px' }}
                            />
                        ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={userData.message}
                        onChange={handleMessage}
                        onSend={sendPrivateValue}
                        onAttachClick={handleAttachClick}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </ChatContainer>
            </MainContainer>
            <ChatBot />
        </>
    );
};

export default ChatPage;
