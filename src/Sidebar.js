import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';

import db from "./firebase";
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

function Sidebar() {

    const [rooms, setRooms] = useState([{ name: "Loading...", id: "initial" }]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        // getData() is to get data once
        // onSnapshot() is to listen for realtime updates -- return a function to that we can call to terminate listener
        // Put rooms with the latest activity higher
        const q = query(collection(db, "rooms"), orderBy("lastActivity", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) =>
            setRooms(snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        )
        return () => {
            unsubscribe(); 
            // good practice to do as we only need to listen once
        }
    }, []);

    const createChat = () => {
        // console.log("new chat added")
        const roomName = prompt("Please enter room name chat");
        if (roomName) {
            addDoc(collection(db, "rooms"), {
                name: roomName,
                lastActivity: serverTimestamp()
            })
            // console.log(roomName, " added");
        }
    };

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src={user ? user.photoURL : `https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='sidebar__headerRight'>
                    <IconButton onClick={createChat}>
                        <Add />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search chat' type='text' />
                </div>
            </div>
            <div className='sidebar__chats'>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
