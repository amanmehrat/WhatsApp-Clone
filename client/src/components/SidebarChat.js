import React, { useState, useContext, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import './SidebarChat.css'
import { useHistory } from 'react-router-dom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:9000";


function SidebarChat({ roomObj }) {
    const [lastMessage, setLastMessage] = useState(roomObj.LastMessage);


    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("LASTMESSAGE" + roomObj._id, data => {
            setLastMessage(data);
        });
        return () => socket.disconnect();
    }, [roomObj._id]);

    let history = useHistory();
    const [selectedRoom, setSelectedRoom] = useState('');
    const [roomId, setRoomId] = useState('');

    const redirectToChat = () => {
        setSelectedRoom(roomObj.RoomName);
        setRoomId(roomObj._id);
        history.push("/room/" + roomObj._id);
    };
    return (

        <div className="sidebarChat" onClick={redirectToChat} /*style={(selectedRoom == roomName) ? { backgroundColor: "gray" } : { backgroundColor: "white" }}*/  >
            <Avatar />
            <div className="sidebarChat_info">
                <h2>{roomObj.RoomName}</h2>
                <p>{lastMessage}</p>
            </div>
        </div >
    )
}

export default SidebarChat;
;