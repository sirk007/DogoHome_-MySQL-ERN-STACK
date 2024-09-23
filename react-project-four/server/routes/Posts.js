// Import the Express.js framework
const express = require('express');
// Create a new router using the Express Router() function
const router = express.Router();
// Import the Posts.js & Likes.js models from '../models' directory
const { Posts, Likes } = require('../models');

const {validateToken} = require('../middlewares/AuthMiddleware');


// Route to get a list of posts
router.get("/",validateToken, async (req, res)=>{
    // Use the Post.js model to fetch all posts from the database
    const listOfPosts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });    
    // Respond with the list of posts as JSON
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

// Route to get a specific post by its ID
router.get('/byId/:id', async (req, res) =>{
    // Retreive the ID parameter from the URL 3002...
    const id = req.params.id;
    // Use Post.js model to find a post by its primary key
    const post = await Posts.findByPk(id);
    // Respond with the retreived post as JSON
    res.json(post);
});

router.get('/byuserId/:id', async (req, res) =>{
 const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: {UserId: id},
    include: [Likes],
  });
  res.json(listOfPosts);
});


// Route to create a new post
router.post("/", validateToken, async (req, res)=>{
    // Extract the post data from the request body
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    // Use the Post.js model to create a new post in the database
    await Posts.create(post);
    // Respond with the created post as JSON
    res.json(post);
    
});



router.put("/title", validateToken, async (req, res)=>{
  const {newTitle, id} = req.body;
  await Posts.update({title: newTitle}, {where: {id: id}});
  res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res)=>{
  const {newText, id} = req.body;
  await Posts.update({postText: newText}, {where: {id: id}});
  res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  });

  module.exports = router;