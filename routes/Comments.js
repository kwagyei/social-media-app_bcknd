const express = require('express');
const router = express.Router();
const { Comments } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware")


//API for displaying list of comments for a particular post
router.get("/:postId", async(req, res) => {

    const postId = req.params.postId
    const listofPostComments = await Comments.findAll({ where: { PostId: postId, } }); //this is a sequelize function
    res.json(listofPostComments);

});

//API for creating a comment for a particular post
router.post("/", validateToken, async(req, res) => {

    const comment = req.body;
    const username = req.user.username
    comment.username = username
    const newComment = await Comments.create(comment); // this is also a seqeulize function
    res.json(newComment); //allows newcomment to render immediately

})

router.delete("/:id", validateToken, async(req, res) => {

    const commentId = req.params.id

    await Comments.destroy({ where: { id: commentId } })

    res.json("comment deleted")

})



module.exports = router