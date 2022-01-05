import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

import "./SidebarChat.css";

function SidebarChat() {

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    return (
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='sidebarChat__info'>
                <h2>Room name</h2>
                <p>Last Message..</p>
            </div>

        </div>
    )
}

export default SidebarChat
