var express = require('express')
var router = express.Router()

var User = require("../models/user");

router.get('/', (req, res) => {

    res.send('This is heros API');


});

router.post("/", async (req, res) =>{

    let userToBeCtreated = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    await userToBeCtreated.save();
    return res.send({
        username : userToBeCtreated.username,
        email: userToBeCtreated.email
    });
});

module.exports = router;