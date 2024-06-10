const router = require("express").Router();
const Conversation = require("../models/Conversation");



router.post('/', async (req, res) => {

    console.log(req.body)

    const newconv = new Conversation({
        membres: [req.body.senderId, req.body.receiverId],
    })



    

    try {
        const savedconv = await newconv.save()
        res.status(200).json(savedconv)
    }
    catch (err) {
        res.status(500).json(err)
    }
})



//get conv of a user 

router.get('/:userId', async (req, res) => {
    try {
        const conv = await Conversation.find(
            {
                membres: { $in: [req.params.userId] }
            }
        )

        res.status(200).json(conv)
    }
    catch (err) {
        res.status(500).json(err)

    }
})

module.exports = router;
