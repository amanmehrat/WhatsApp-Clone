const mongoose = require('mongoose');

const MessageSchemas = new mongoose.Schema({
    RoomId: mongoose.Types.ObjectId,
    Message: String,
    Timespan: Date,
    IsRoomOwner: Boolean
})

module.exports = mongoose.model('Message', MessageSchemas);