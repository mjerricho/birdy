import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import db from "./firebase";

import './Chat.css';

function Chat() {
    const [input, setInput] = useState('');
    // const [seed, setSeed] = useState('');

    // to get the id for the chat room from the react-router-dom
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(collection(db, "rooms"), roomId), (snapshot) => setRoomName(snapshot.data().name))
        }
    }, [roomId])

    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000));
    // }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className='chat__name'>Name</span>
                    Hello
                    <span className='chat__timestamp'>12:00pm</span>
                </p>
                <p className='chat__message'>
                    <span className='chat__name'>Name</span>
                    Hello
                    <span className='chat__timestamp'>12:00pm</span>
                </p>
                <p className='chat__message'>
                    <span className='chat__name'>Name</span>
                    Hello
                    <span className='chat__timestamp'>12:00pm</span>
                </p>
                <div className='chat__send'>

                </div>
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
