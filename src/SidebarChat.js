import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from "react-router-dom";

import "./SidebarChat.css";

function SidebarChat({ id, name }) {

    // const [seed, setSeed] = useState('');

    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000));
    // }, [])

    return (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>Last Message..</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
