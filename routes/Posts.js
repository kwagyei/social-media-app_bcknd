const express = require('express');
const router = express.Router();
const { Posts } = require("../models");


//API for displaying all posts
router.get("/", async(req, res) => {
    const listofPosts = await Posts.findAll(); //this is a sequelize function
    res.json(listofPosts);

});

//API for displaying a selected post 
router.get("/:id", async(req, res) => {

    const itemId = req.params.id;
    const clickedPost = await Posts.findByPk(itemId);
    res.json(clickedPost);

});

//API for creating a POST
router.post("/", async(req, res) => {

    const post = req.body;
    await Posts.create(post); // this is also a seqeulize function
    res.json(post);

})

module.exports = router