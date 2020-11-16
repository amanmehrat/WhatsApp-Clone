const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 9000;
const socketIo = require("socket.io");

const mongoose = require('mongoose');
const cors = require('cors');

const io = socketIo(server);



//config
const connection_url = `Your MONGO:DB--URL`
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(obj => console.log(`CONNECTED`))
    .catch(err => console.log(`error while connecting to DB`, err));

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB OPENED CONNECTION');
    const roomCollection = db.collection('rooms');
    const messageCollection = db.collection('messages');

    const roomChangeStream = roomCollection.watch();
    const messageChangeStream = messageCollection.watch();
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    roomChangeStream.on('change', (change) => {
        if (change.operationType == 'update') {
            const fullDocument = change.updateDescription.updatedFields.LastMessage;
            io.emit('LASTMESSAGE' + change.documentKey._id, fullDocument)
        }


    });
    messageChangeStream.on('change', (change) => {
        if (change.operationType == 'update') {
            const fullDocument = change.fullDocument;
            io.emit('LASTMESSAGE' + fullDocument.RoomId, fullDocument)
        }
    });
})



//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require('./routes'))
app.get("/", (req, res) => {
    res.status(200).json({ "room": "aman" });
})

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
//io.listen(PORT);
server.listen(PORT, () => console.log(`app is listening at PORT:${PORT}`));

//INSERT
//////ROOM INSERT
//////MESSAGE INSERT

//UPDATE
////////LAST UPDATE MESSAGE