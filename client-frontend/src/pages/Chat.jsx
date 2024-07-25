import React, { useEffect, useState, useRef } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AppNavBar from '../components/Account/AppNavBar';
import { useAccount } from '../services/LocalStorage';
import { useParams, useLocation } from 'react-router-dom';
import { getFullName } from '../services/AgentAPI';
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

const ChatPage = () => {
    const { account, profilePictureUrl } = useAccount();
    const { agentId } = useParams();
    const location = useLocation();
    const agentName = location.state?.agentUserName || "Agent";
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState(agentId ? agentName : 'CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receivername: agentName,
        message: ''
    });
    const [agentNames, setAgentNames] = useState(new Map());

    const stompClientRef = useRef(null);

    useEffect(() => {
        if (account) {
            setUserData((prevUserData) => ({ ...prevUserData, username: account.username }));
            connect(account.username);
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            const savedChats = JSON.parse(localStorage.getItem(`privateChats_${account.username}`));
            if (savedChats) {
                setPrivateChats(new Map(savedChats));
            }

            const savedPublicChats = JSON.parse(localStorage.getItem(`publicChats_${account.username}`));
            if (savedPublicChats) {
                setPublicChats(savedPublicChats);
            }
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            localStorage.setItem(`privateChats_${account.username}`, JSON.stringify([...privateChats]));
        }
    }, [privateChats, account]);

    useEffect(() => {
        if (account) {
            localStorage.setItem(`publicChats_${account.username}`, JSON.stringify(publicChats));
        }
    }, [publicChats, account]);

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
        } else {
            console.error('stompClient is not initialized');
        }
    };

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
                        <Conversation name="Chatroom" active={tab === "CHATROOM"} onClick={() => setTab("CHATROOM")}>
                            <Avatar src={profilePictureUrl} status="available" />
                        </Conversation>
                        {[...privateChats.keys()].map((name, index) => (
                            <Conversation
                                key={index}
                                name={agentNames.get(name) || name}
                                active={tab === name} onClick={() => setTab(name)}
                                style={{ fontSize: '25px' }}
                            >
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
                            (chat.sender === userData.username || chat.receiver === userData.username) && (
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
                            )
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
