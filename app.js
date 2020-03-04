let http = require('http');
let uppercase = require('upper-case')
let fileExtension = require('file-extension');
let mongoose = require('mongoose');
let cors = require("cors");
let jwt = require("cors");


let express = require('express')
let app = express();

mongoose.connect('mongodb://localhost:27017/HeroDB', { useNewUrlParser: true, useUnifiedTopology: true});

let authenticator = require('./middleware/authenticator')
let sendemail = require('./middleware/emailsender')
let heroRoutes = require('./routes/heros')
let homeRoutes = require('./routes/home')
let users = require('./routes/users');
let auth = require('./routes/auth');


const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(authenticator);
app.use(sendemail);

//Custom middleware

app.use('/', homeRoutes);
app.use('/api/heros/', heroRoutes);
app.use('/api/users/',users);
app.use('/api/auth/',auth);



//specify only admin routes
//app.use('/api/admin',customAdminRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));