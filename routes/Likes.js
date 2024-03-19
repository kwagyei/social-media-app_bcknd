const express = require('express');
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');


router.post("/", validateToken, async(req, res) => {

    const { postId } = req.body

    const userId = req.user.id

    const found = await Likes.findOne({ where: { PostId: postId, UserId: userId } })

    if (!found) {
        await Likes.create({ PostId: postId, UserId: userId })
        res.json("liked")
    } else {

        await Likes.destroy({ PostId: postId, UserId: userId })
        res.json("unliked")
    }


})









module.exports = router