import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import { addDoc, collection, doc, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore';
import db from "./firebase";

import './Chat.css';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');

    // to get the id for the chat room from the react-router-dom
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            const roomIdDoc = doc(collection(db, "rooms"), roomId);

            // get the list of rooms
            onSnapshot(roomIdDoc, (snapshot) =>
                setRoomName(snapshot.data().name));

            // get the messages in the room selected
            // db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => {setMessages(snapshot)})
            const messagesDoc = collection(roomIdDoc, 'messages')
            // need to order everything
            onSnapshot(messagesDoc, (snapshot) =>
                setMessages(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        const roomIdDoc = doc(collection(db, "rooms"), roomId);
        addDoc(collection(roomIdDoc, 'messages'), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp()
        })
        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen {" "} {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()
                    ).toUTCString()}</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map(message => (
                    // need to change the condition for the message and user display name as names might be the same
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder='Type message'
                    />
                    <button type="submit">Send a message</button>
                </form>

            </div>
        </div>
    )
}

export default Chat
