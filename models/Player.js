const mongoose = require('mongoose');
const { Schema } = mongoose; // meaning setting variable called Schema from mongoose.Schema func

// const userSchema = new Schema({
//     googleId : String
// })
const playerSchema = new Schema({
    name : String,
    score: Number,
    total: Number,
})

module.exports = playerSchema;
