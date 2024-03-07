const express = require('express');
const router = express.Router();
const { Comments } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware")


//API for displaying list of comments for a particular post
router.get("/:postId", async(req, res) => {

    const postId = req.params.postId;
    const listofPostComments = await Comments.findAll({ where: { PostId: postId, } }); //this is a sequelize function
    res.json(listofPostComments);

});

//API for creating a comment for a particular post
router.post("/", validateToken, async(req, res) => {

    const comment = req.body;
    await Comments.create(comment); // this is also a seqeulize function
    res.json(comment); //allows newcomment to render immediately

})



module.exports = router