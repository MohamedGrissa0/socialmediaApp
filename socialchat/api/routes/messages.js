const router = require("express").Router();
const Message = require("../models/Message");


router.post('/', async (req, res) => {
    const { sender, text, conversationId } = req.body;

    if (!sender || !text || !conversationId) {
        return res.status(400).json({ message: "All fields (sender, text, conversationId) are required" });
    }
    const newMessage = new Message(req.body);
    console.log(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


//get 

router.get('/:convId', async (req, res) => {
    console.log(req.params.convId)
    try {
        const msgs = await Message.find({
            conversationId : req.params.convId
        })

        res.status(200).json(msgs)
    }
    catch (err) {
        res.status(500).json(err)

    }
})

module.exports = router;
