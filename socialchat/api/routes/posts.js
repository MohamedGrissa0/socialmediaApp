const router = require("express").Router();
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Relative path to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });



router.post('/', upload.array('imgs'), async (req, res) => {
  try {
    const { userId, desc, tagsFriends, likes, location, feeling, profilePicture , username } = req.body;
    const imgs = req.files.map(file => file.filename); 
    console.log(userId)
    const newPost = new Post({
      userId,
      desc,
      username,
      profilePicture,
      imgs,
      tagsFriends,
      likes,
      location,
      feeling,
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost); // Use 201 for resource creation success
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const post = await Post.findById(req.params.id);
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.params.userId;

    if (!post.likes.includes(userId)) {
      post.dislikes = post.dislikes.filter(item => item !== userId);

      post.likes.push(userId);
      
      await post.save();
      res.status(200).json("The post has been liked");
    } else {
      res.status(400).json("User already liked this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




router.put("/:id/dislike/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.params.userId;

    if (!post.dislikes.includes(userId)) {
      post.likes = post.likes.filter(item => item !== userId);

      post.dislikes.push(userId);
      
      await post.save();
      res.status(200).json("The post has been disliked");
    } else {
      res.status(400).json("User already disliked this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/:postId/comments/", async (req, res) => {
  const postId = req.params.postId;
  const { comment, userId } = req.body;
  
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { username, profilePicture } = user;

    post.comments.push({ username, profilePicture, comment });
    
    await post.save();
    
    res.status(200).json({ message: "Comment added successfully", comment: { username, profilePicture, comment } });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/:postId/comments/', async (req, res) => {
  const postId = req.params.postId;

  try {
    // Find the post by ID and populate comments if they are referenced
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the comments
    res.status(200).json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/profile/:id", async (req, res) => {
  console.log(req.params)
  try {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  console.log(req.params)
  try {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followerIds = user.followers.map(follower => follower.id);
    followerIds.push(userId);
    const posts = await Post.find({ userId: { $in: followerIds } });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
