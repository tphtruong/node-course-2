const mongoose = require('mongoose');
const { Schema } = mongoose; // meaning setting variable called Schema from mongoose.Schema func

// const userSchema = new Schema({
//     googleId : String
// })
const playersSchema = new Schema({
    name : String,
    score: Number,
    total: Number
})

mongoose.model('players', playersSchema);  // create new coll called users (note: if users collection already exists then it just load it)

