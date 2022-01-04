import React from 'react';
import { Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import "./Sidebar.css";
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar />
                <div className='sidebar__headerRight'>
                    <IconButton>
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
