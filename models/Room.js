const moongoose = require('mongoose');

const Room = new moongoose.Schema({
    RoomName: String,
    LastMessage: String,
    Timespan: Date,
})

module.exports = moongoose.model("Room", Room);