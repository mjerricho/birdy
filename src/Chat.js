import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import './Chat.css';

function Chat() {

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat__headerInfo'>
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined/>
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
                <form>
                    <input type="text"/>
                    <button>Send a message</button>
                </form>

            </div>
        </div>
    )
}

export default Chat
