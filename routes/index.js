const express = require('express');
const router = express.Router();
const Room = require('../models/Room')
const Message = require('../models/Message')


router.get("/rooms", async (req, res) => {

    try {
        const result = await Room.find({}).sort({ Timespan: -1 });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.get("/rooms/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    try {
        const result = await Room.find({ _id: roomId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.get("/rooms/:roomId/messages", async (req, res) => {
    const roomId = req.params.roomId;
    try {
        const result = await Message.find({ RoomId: roomId });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.post("/rooms/:roomId/messages", async (req, res) => {
    try {
        const result = await Message.create(req.body);
        await Room.updateOne({ _id: req.body.RoomId }, { $set: { LastMessage: req.body.Message, Timespan: new Date(), CreatedBy: req.body.CreatedBy } });

        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.post("/rooms", async (req, res) => {
    try {
        const result = await Room.create(req.body);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;