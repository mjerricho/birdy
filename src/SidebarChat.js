import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from "react-router-dom";

import "./SidebarChat.css";

import { doc, collection, onSnapshot } from "firebase/firestore";
import db from "./firebase";

function SidebarChat({ id, name }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            const messagesDoc = collection(doc(collection(db, "rooms"), id), 'messages')
            // need to order everything in descending order
            onSnapshot(messagesDoc, (snapshot) =>
                setMessages(snapshot.docs.map(doc => doc.data()))
            )
        };
    }, [id]);

    return (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
