import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import "./Sidebar.css";
import SidebarChat from './SidebarChat';
// import db from './firebase';

function Sidebar() {

    // const [rooms, setRooms] = useState([]);

    // run it only once when the component sidebar loads, and once only. This reduces the computational power needed, hence faster process.
    // useEffect(() => {
    //     db.collection('rooms').onSnapshot((snapshot) => 
    //         setRooms(snapshot.docs.map(doc => 
    //             ({
    //                 id: doc.id, 
    //                 data: doc.data()
    //             })))
    //     )
    // })

    const createChat = () => {
        console.log("new chat added")
        const roomName = prompt("Please enter room name chat");

        if (roomName) {
            //do something if user enters room name
            console.log(roomName)
        }
    };

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='https://avatars.dicebear.com/api/human/123.svg'/>
                <div className='sidebar__headerRight'>
                    <IconButton onClick={createChat}>
                        <Add/>
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
                {/* {rooms.map(room => (
                    <sidebarChat key={room.id} id={room.id} name={room.data.name}
                ))} */}
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
