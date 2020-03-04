var express = require('express')
var jwt = require('jsonwebtoken');
var router = express.Router()

var User = require("../models/user");
const SECRET_KEY = '123456';

router.post("/", async (req, res) =>{

  let user = User.findOne({email: req.body.email});
  if(!user){
      return res.status(400).send("Invalid login credentials");
  }

  let isPwValid =user.password === req.body.password;
  if(!isPwValid){
    return res.status(400).send("Invalid login credentials");
  }
  let token = jwt.sign({id: user._id, email: (await user)._id.email},SECRET_KEY);

  res.send({
      token: token
  });
  res.send("Nice. I will authenticate You");
});

module.exports = router;