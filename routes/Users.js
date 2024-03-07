const express = require('express')
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")

const { sign } = require('jsonwebtoken')



//API for signing up
router.post("/", async(req, res) => {

    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (!user) {

        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash
            });

            res.json("SUCCESS")

        });
    } else { res.json({ error: "username already exists" }) }

});


//API for logging in
router.post("/login", async(req, res) => {

    const { username, password } = req.body

    const user = await Users.findOne({ where: { username: username } })

    if (!user) {

        res.json({ error: "User Doesnt Exist" })

    } else {

        bcrypt.compare(password, user.password).then((match) => {

            if (!match) {

                res.json({ error: "Wrong Password" })

            } else {
                //generating the user access token after successful login
                const accessToken = sign({ username: user.username, id: user.id }, "important")

                res.json(accessToken)

            }


        })

    }




})

module.exports = router