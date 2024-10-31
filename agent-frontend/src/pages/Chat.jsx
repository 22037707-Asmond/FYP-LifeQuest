import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, InfoButton, MainContainer,
    Message, MessageInput, MessageList, MessageSeparator, Search, Sidebar, VideoCallButton, VoiceCallButton
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLocation, useParams } from 'react-router-dom';
import { useAccount } from '../services/LocalStorage';
import { getFullName, getPictureUrl } from '../services/UserAPI';

const ChatPage = () => {
    const { account, profilePictureUrl } = useAccount();
    const { agentId } = useParams();
    const location = useLocation();
    const agentName = location.state?.agentName || "Agent";

    // Correctly initialize tab and setTab
    const [tab, setTab] = useState(agentId ? agentName : '');

    const [privateChats, setPrivateChats] = useState(new Map());
    const [userData, setUserData] = useState({
        username: '',
        receivername: agentName,
        message: ''
    });

    const [userNames, setUserNames] = useState(new Map());
    const [userPictures, setUserPictures] = useState(new Map());

    const stompClientRef = useRef(null);

    useEffect(() => {
        if (account) { // Check if account exists
            const savedChats = JSON.parse(localStorage.getItem(`privateChats_${account.username}`));
            if (savedChats) {
                setPrivateChats(new Map(savedChats));
            }

            setUserData((prevUserData) => ({ ...prevUserData, username: account.username }));
            connect(account.username);
        }
    }, [account]);

    useEffect(() => {
        if (account) { // Ensure account exists before saving chats
            localStorage.setItem(`privateChats_${account.username}`, JSON.stringify([...privateChats]));
        }
    }, [privateChats, account]);

    useEffect(() => {
        if (account) { // Ensure account exists before fetching user names
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
        }
    }, [privateChats, account]);

    useEffect(() => {
        if (account) { // Ensure account exists before fetching user pictures
            const fetchUserPictures = async () => {
                const newUserPics = new Map();
                for (let username of privateChats.keys()) {
                    try {
                        const pictureUrl = await getPictureUrl(username);
                        newUserPics.set(username, pictureUrl);
                    } catch (error) {
                        console.error(`Failed to fetch picture for user ${username}:`, error);
                    }
                }
                setUserPictures(newUserPics);
            };
            fetchUserPictures();
        }
    }, [privateChats, account]);

    const connect = (username) => {
        const Sock = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(Sock);
        stompClient.connect({}, () => onConnected(username, stompClient), onError);
        stompClientRef.current = stompClient;
    };

    const onConnected = (username, stompClient) => {
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
            stompClientRef.current.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData((prevUserData) => ({ ...prevUserData, message: "" }));
        }
    };

    return (
        <MainContainer responsive style={{ height: '90vh', display: 'flex', flexDirection: 'row' }}>
            <Sidebar position="left" style={{ width: '300px' }}>
                <Search placeholder="Search..." />
                <ConversationList>
                    {[...privateChats.keys()].map((name, index) => (
                        <Conversation key={index} name={userNames.get(name)} active={tab === name} onClick={() => setTab(name)}>
                            <Avatar src={userPictures.get(name)} status="available" />
                        </Conversation>
                    ))}
                </ConversationList>
            </Sidebar>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <Avatar src={userPictures.get(tab) || profilePictureUrl} name={tab} />
                    <ConversationHeader.Content userName={tab} />
                    <ConversationHeader.Actions>
                        <VoiceCallButton />
                        <VideoCallButton />
                        <InfoButton />
                    </ConversationHeader.Actions>
                </ConversationHeader>
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
                        >
                            <Avatar src={userPictures.get(chat.sender) || profilePictureUrl} name={chat.sender} />
                        </Message>
                    ))}
                </MessageList>
                <MessageInput
                    placeholder="Type message here"
                    value={userData.message}
                    onChange={handleMessage}
                    onSend={sendPrivateValue}
                />
            </ChatContainer>
        </MainContainer>
    );
};

export default ChatPage;
