import React, { useState, useEffect, useRef } from 'react'
import SidebarChat from './SidebarChat';
import { useHistory } from 'react-router-dom';
import axios from '../axios';

import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import './Sidebar.css'

function Sidebar({ user }) {
    console.log("user", user);
    const addButton = useRef(null);
    const [value, setValue] = useState("");
    const [rooms, setRooms] = useState([]);
    const [filterRooms, setFilterRooms] = useState([]);

    let history = useHistory();

    useEffect(() => {
        axios.get("/rooms")
            .then(data => {
                setRooms(data.data);
                setFilterRooms(data.data);
            })
            .catch(err => console.log(err));
    }, [])

    const addRoom = (e) => {
        e.preventDefault();
        setValue("");
        addButton.current.style.display = "none";
        let obj = { RoomName: value, LastMessage: "", Timespan: new Date() };

        axios.post("/rooms", obj)
            .then(({ data }) => {
                history.push(data._id);
                setRooms([data, ...rooms])
                setFilterRooms([...rooms, data])
            })
            .catch(err => console.log(err));
    };

    const searchRoom = (e) => {
        addButton.current.style.display = "none";
        setValue(e.target.value);
        const data = rooms.filter(room => room.RoomName.toUpperCase().startsWith(e.target.value.toUpperCase()));
        setFilterRooms(data);
        if (data.length <= 0) {
            addButton.current.style.display = "block";
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://pbs.twimg.com/profile_images/964867480580636672/7BCvJq4g_400x400.jpg" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input
                        type="text"
                        value={value}
                        onChange={searchRoom}
                        placeholder="Search or start new chat"
                    />
                    <AddIcon
                        onClick={addRoom}
                        ref={addButton}
                        style={{ display: "none" }}
                    />
                </div>
            </div>
            <div className="sidebar__chats">
                {filterRooms?.map(room => <SidebarChat key={room._id} roomObj={room} />)}
            </div>
        </div>
    )
}

export default Sidebar;
