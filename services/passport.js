const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // create model 

passport.serializeUser((user, done) => {    //this user is passed in from above (user or existingUser)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user,done) => {
        done(null, user);              
    })
})
    
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {        //<==== this is callback func
        //test if user already exists
        const existingUser = await User.findOne({ googleId : profile.id })
        
        if (existingUser)
            return done(null, existingUser);

        const user = await new User({ googleId : profile.id }).save() // this save method will insert a new record in to DB
        done(null, user);
        
    })
);
