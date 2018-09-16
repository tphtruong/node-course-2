const mongoose = require('mongoose');
const { Schema } = mongoose; // meaning setting variable called Schema from mongoose.Schema func
const PlayerSchema = require('./Player')
// const userSchema = new Schema({
//     googleId : String
// })
const gamesSchema = new Schema({
    gameKey: Number,
    dealer: String,
    nextDealerPos: Number,
    dealingNumber: Number,
    players : [PlayerSchema],
})
mongoose.model('games', gamesSchema);  // create new coll called users (note: if users collection already exists then it just load it)

