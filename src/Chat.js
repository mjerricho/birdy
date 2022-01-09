import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import './Chat.css';
import { useStateValue } from './StateProvider';

import db from "./firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp, orderBy, query, updateDoc } from 'firebase/firestore';

function Chat() {
    // to get the id for the chat room from the react-router-dom
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState('');

    useEffect(() => {
        if (roomId) {
            // get room name
            const roomIdDoc = doc(db, "rooms", roomId);
            onSnapshot(roomIdDoc, (snapshot) => {
                // console.log("Set room name")
                setRoomName(snapshot.data().name)
            })
            // get the ordered messages in the room selected
            const messagesRef = collection(db, "rooms", roomId, "messages");
            const q = query(messagesRef, orderBy("timestamp", "asc"));
            onSnapshot(q, (snapshot) => {
                // console.log("ordered messages")
                // console.log(snapshot.docs.map((doc) => ({
                //     ...doc.data(), id: doc.id
                // })))
                setMessages(snapshot.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                })))
            })
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log("You typed >>>", input);
        const textTimestamp = serverTimestamp()
        addDoc(collection(db, "rooms", roomId, 'messages'), {
            message: input,
            name: user.displayName,
            timestamp: textTimestamp
        })
        updateDoc(doc(db, "rooms", roomId), {
            lastActivity: textTimestamp
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
                    <p key={message.id} className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
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
