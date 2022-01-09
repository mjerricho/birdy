import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Add, Password } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';

import db from "./firebase";
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp, where } from "firebase/firestore";

function Sidebar() {

    const [rooms, setRooms] = useState([{ name: "Loading...", id: "initial" }]);
    const [showAllChats, setShowAllChats] = useState(false)
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
            setShowAllChats(false)
            // good practice to do as we only need to listen once
        }
    }, [showAllChats]);

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

    const searchChat = (searchInput) => {
        if (searchInput != '') {
            const q = query(collection(db, "rooms"), where("name", "==", searchInput))
            onSnapshot(q, (snapshot) =>
                setRooms(snapshot.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                })))
            )
        } else {
            setShowAllChats(true)
        }
    }

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
                    <input
                        onChange={(e) => searchChat(e.target.value)}
                        type='text'
                        placeholder='Search chat room'
                    />
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
