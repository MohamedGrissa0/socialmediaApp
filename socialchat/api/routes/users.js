const User = require("../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Relative path to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};



router.get("/:friendid", async (req, res) => {
  console.log(req.params.friendid)
  try {

    const user = await User.findOne({ _id: req.params.friendid })
    if (!user) {
      res.status(404).json("message:user doenst exist")
    }
    res.status(200).json(user)

  }
  catch (err) {

    console.log(err.message)
  }

})





// Update user profile route
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Only allow the user to update their own profile
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const updateData = { ...req.body };

    const user = await User.findByIdAndUpdate(userId, {
      $set: updateData,
    }, { new: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Update profile picture
router.put("/:id/upload-profilePicture", verifyToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Only allow the user to update their own profile picture
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own profile picture' });
    }

    const profilePicture = path.relative(path.join(__dirname, '../'), req.file.path); // Store relative path

    const user = await User.findByIdAndUpdate(userId, {
      profilePicture: profilePicture,
    }, { new: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Update cover picture
router.put("/:id/upload-coverPicture", verifyToken, upload.single('coverPicture'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Only allow the user to update their own cover picture
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'You can only update your own cover picture' });
    }

    const coverPicture = path.relative(path.join(__dirname, '../'), req.file.path); // Store relative path

    const user = await User.findByIdAndUpdate(userId, {
      coverPicture: coverPicture,
    }, { new: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});




router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assuming your user ID is stored in req.userId after token verification
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});


router.get("/search/:text", verifyToken, async (req, res) => {
  try {
    const searchText = req.params.text;
    const users = await User.find({ username: { $regex: searchText, $options: 'i' } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});
router.get("/followers/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await User.findById(userid);
    res.status(200).json(user.followers);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});



router.post("/request/:friendid/:userid", async (req, res) => {
  console.log(req.params)
  try {

    const { friendid, userid } = req.params;

    const userfriend = await User.findById(friendid);
    const user = await User.findById(userid);

    if (!userfriend || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    userfriend.Requetes.push({ id: user._id, username: user.username, profilePicture: user.profilePicture });
    user.Invitations.push({ id: userfriend._id, username: userfriend.username, profilePicture: userfriend.profilePicture });

    await userfriend.save();
    await user.save();

    res.status(200).json("Request Sent");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});




router.post("/request/accept/:followerid/:userid", async (req, res) => {
  const { userId, followerid } = req.params

  try {
    const user = await User.findById(req.params.userid);
    const userfriend = await User.findById(req.params.followerid);


    if (!userfriend || !user) {
      return res.status(404).json({ error: 'User not found' });
    }




    // Add each other to followers
    user.followers.push({ id: userfriend._id, username: userfriend.username, profilePicture: userfriend.profilePicture });
    userfriend.followers.push({ id: user._id, username: user.username, profilePicture: user.profilePicture });

    // Remove the accepted request from Requetes and Invitations
    userfriend.Invitations = userfriend.Invitations.filter((item) => item.id.toString() !== user._id.toString());
    user.Requetes = user.Requetes.filter((item) => item.id.toString() !== userfriend._id.toString());

    await user.save();
    await userfriend.save();

    res.status(200).json("Request accepted");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});





module.exports = router;
