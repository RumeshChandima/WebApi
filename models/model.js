const mongoose = require('mongoose');


const heroSchema = new mongoose.Schema({
    name: String,
    birthName: String,
    likeCount: Number,
    deceased: Boolean,
    superPowers: [String],
    movies: [String]
});


const Hero = mongoose.model("Hero",heroSchema);

module.exports = Hero;