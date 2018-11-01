const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
const keys = require('./config/keys')

//const server = express();
const PORT =  process.env.PORT || 5000;
const server = express()

server.use(bodyParser.json())
.listen(PORT, () => console.log(`Listening on ${ PORT }`));
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// )
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/authRoutes')(server);
// require('./routes/billingRoutes')(app);
// require('./routes/members')(app);

//require('./routes/chatRoutes')(app);

//the following is required in PROD 
if (process.env.NODE_ENV === 'production'){ //this node_env is setup automatically by Heroku
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    server.use(express.static('client/build'));
    
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


//app.listen(5000);
//app.listen(PORT);
require('./routes/chatRoutes')(server);

// const WebSocket = require('ws').Server;


// const wss = new WebSocket({ 
//    server
//  });

// const broadcast = (data, ws) => {
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(data))
//   })
// }

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => { 
//     const data = JSON.parse(message); 
//     switch (data.type) {
      
//       case 'ADD_SCORE': ////{"type":"ADD_MESSAGE","id":0,"message":"hello world","author":"Ann"}
//           broadcast({
//               type: 'ADD_SCORE',
//               message: data.message,
//               author: data.author
//           }, ws)

//           break
//       default:
//       break
//     }
//   });
//   ws.on('close', () => console.log('Client disconnected'));
// });
