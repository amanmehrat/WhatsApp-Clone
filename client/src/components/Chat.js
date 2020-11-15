
import React, { useState, useEffect, useContext } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, Search, AttachFile, Mic, InsertEmoticon } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import axios from "../axios";
import { MessageContext } from '../context/MessagesContext'
import { ActionTypes } from '../context/MessagesContext'

function Chat() {
    const [value, setValue] = useState("");
    const [lastSeen, setLastSeen] = useState("");
    const [flag, setFlag] = useState(true);
    const [room, setRoom] = useState([]);
    const [messages, setMessages] = useState([]);
    let { roomId } = useParams();

    const [state, dispatch] = useContext(MessageContext);

    useEffect(() => {
        axios.get("/rooms/" + roomId)
            .then(({ data }) => {
                setRoom(data[0]);
                setLastSeen(new Date(data[0].Timespan).toUTCString())
            })
            .catch(err => console.log(err));
        axios.get("/rooms/" + roomId + "/messages")
            .then(({ data }) => {
                setMessages(data);
                let messageBody = document.querySelector('.chat__body');
                messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            })
            .catch(err => console.log(err));
        return () => { }
    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        setValue("");
        let obj = {
            RoomId: roomId,
            Message: value,
            Timespan: new Date(),
            IsRoomOwner: !flag
        };
        setFlag(!flag);
        axios.post("/rooms/" + roomId + "/messages", obj)
            .then(({ data }) => {
                setMessages([...messages, data])
                setLastSeen(new Date(data.Timespan).toUTCString())
                // dispatch({
                //     type: ActionTypes.ADD_LASTMESSAGE,
                //     payload: data
                //  })
                var messageBody = document.querySelector('.chat__body');
                messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://cdn.britannica.com/s:1500x700,q:85/28/215028-004-6E631B9F/American-actor-Chris-Evans-2019.jpg" />
                <div className="chat__headerInfo">
                    <h3>{room?.RoomName}</h3>
                    <span>{lastSeen}</span>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p key={message._id} className={message.IsRoomOwner ? "chat__message chat__reciever" : "chat__message"}>
                        <span className="chat__name">
                            {message.CreatedBy}
                        </span>
                        {message.Message}
                        <span className="chat__timestamp">
                            {new Date(message.Timespan).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat