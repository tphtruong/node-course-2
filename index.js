const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
const keys = require('./config/keys')

// require('./models/User');
// require('./services/passport');

// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// )
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/authRoutes')(app);
// require('./routes/billingRoutes')(app);
// require('./routes/members')(app);

//the following is required in PROD 
if (process.env.NODE_ENV === 'production'){ //this node_env is setup automatically by Heroku
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
    
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT =  process.env.PORT || 5000;
//app.listen(5000);
app.listen(PORT);
