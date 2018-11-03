const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('../config/keys')
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

let jwt = require('jsonwebtoken');
require('../models/Players');
const Players = mongoose.model('players');
// const History = mongoose.model('history');
require('../models/Games');
const Games = mongoose.model('games');
const Members = [
    {username:'admin',password:'password123',secret:'aaaaaaaaaaaaa',role:'admin',isLoggedIn:false},
    {username:'Hoa',password:'hoa123',secret:'bbbbbbbbbbbbbb',role:'admin',isLoggedIn:false},
    {username:'Cau',password:'cau123',secret:'cccccccccccccc',role:'user',isLoggedIn:false},
    {username:'Trinh',password:'trinh123',secret:'dddddddddddd',role:'user',isLoggedIn:false},
    {username:'Masay',password:'masay123',secret:'eeeeeeeeeeeeeeee',role:'user',isLoggedIn:false},
    {username:'Trevor',password:'trevor123',secret:'ffffffffffffffff',role:'user',isLoggedIn:false},
    {username:'Kevin',password:'kevin123',secret:'ffffffffffffffff',role:'user',isLoggedIn:false},
    {username:'Tuong',password:'tuong123',secret:'ffffffffffffffff',role:'user',isLoggedIn:false}
]
//require('./chatRoutes')(Members);
const LocalStrategy = require('passport-local').Strategy;


const cookieSession = require('cookie-session');

module.exports = (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.cookieKey]
        })
    )
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(session({ secret: 'ilovetoplay13' })); // session secret
    
    function getTodayDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) {
            dd = '0'+dd
        } 
        
        if(mm<10) {
            mm = '0'+mm
        } 
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    app.get('/api/current_user', (req, res) => {
        // let user = {username:undefined,usertoken:undefined};
        // if (sessionStorage.getItem('user')) {
        //     user = sessionStorage.getItem('user') ;
        // } 
        //console.log(typeof(Storage));
        //res.send('user');
        res.send(req.user);
      });
    app.get('/api/set_user', (req, res) => {
        let user = {username:'admin',usertoken:'password'};
        sessionStorage.setItem("user", user);
        console.log('set user:',sessionStorage.getItem('user'));
        res.send(user);
      });
 
    app.post('/api/userLogout', async (req, res) => {
        //req.session = null;
        const {username} = req.body;
        //console.log('user logout',username);

        Members.forEach(function(u) {
            if (u.username === username){
                console.log('user logout',username);
                u.isLoggedIn = false;
            }           
        });

        req.logout();
        
        res.redirect('/');
      });
    
    app.get('/api/logoutall', async (req, res) => {
        const {username, password} = req.body;
        Members.forEach(function(u) {
            u.isLoggedIn = false;         
        });
        res.send(Members);
    });     

    app.post('/api/userLogin', requireLogin, async (req, res) => {
        
        console.log('user loginn token', req.body.token);
        console.log('login message', res.message);

        const {username, password} = req.body;
        var notFound = true;
        var user = {username, password, token:undefined,error:undefined};
        var error = '';
        Members.forEach(function(u) {
            //console.log('user loop',u);

            if (notFound && u.username === username && u.password === password && error===''){
                console.log('user isLoggedIn',u.isLoggedIn);
                if (u.username.toLowerCase() !== 'hoa' && u.isLoggedIn){
                    error = 'user already logged in';
                }else{
                    // create the token
                    var token = jwt.sign(u,keys.cookieKey);
                    console.log('token', token);
                    //If token is present pass the token to client else send respective message
                    if(token){
                        user.token = token;
                        user.error = undefined;
                        user.username = u.username;
                        user.role = u.role;
                        notFound = false;
                        u.isLoggedIn = true;

                        res.status(200).json(user);
                    }
                    else{
                        user.error = 'unexpected error'
                        res.status(403).json({
                            user
                        });
                    }

                }
                console.log('user isLoggedIn after',u.isLoggedIn);
            }           
        });

        if (notFound){
            user.error = error === '' ? 'wrong username or password' : error;
            user.token = undefined;
            user.username = undefined
            res.status(403).json({
                user
            });
        }
        console.log('user:',user);
        //res.send(user);
    });




    app.get('/api/fetchPlayers', async (req, res) => {
        const filter = {'_id': 'descending'};//{recipients: false}
        //const playerList = await Players.find({}).sort(filter).limit(20); 

        const games = await Games.find({}).sort(filter).limit(10); 
        // if (games.length > 0) {
        //     console.log('the game key is', games.length>0 ? games[0].gameKey:0);
        //     console.log('the dealer name is', games[0].dealer)
        //     console.log('the dealer Pos', games[0].nextDealerPos)
        //     console.log('the dealing nuymber', games[0].dealingNumber)
        // }
        res.send(games);  
    });

    //find({ id:333 }).remove().exec();
    app.post('/api/removeGame/:id', async (req, res) => {
        console.log('remove game req.body', req.params.id);

        if (req.params.id !== undefined){

            Games.findByIdAndRemove(req.params.id, function(doc) { // doc here is actually err
                console.log('findByIdAndRemove doc: ', doc);
                // Games.find({}, function(err, doc) {
                //   console.log('Finding all: ', doc)
                // })
              })

            const response = await Games.find({id:req.params.id})
                .remove()
                .exec((data => {
                console.log('data',data);
            })); 
            console.log('removing resp',response.data);
        }
        
        //

        res.redirect('/api/fetchPlayers');       
    });

    
    app.post('/api/updatePlayer',requireLogin, (req, res) => {
        try {
            var player = req.body;
            console.log('server-auth-routes',player);
            console.log('server-auth-id',player._id);
            
            Players.findByIdAndUpdate(
                // the id of the item to find              
                player._id,
                
                // the change to be made. Mongoose will smartly combine your existing 
                // document with this change, which allows for partial updates too
                player,
                
                // an option that asks mongoose to return the updated version 
                // of the document instead of the pre-updated one.
                {new: true},
                
                // the callback function
                (err, data) => {
                // Handle any possible database errors
                    if (err) return res.status(500).send(err);
                    res.redirect('/api/fetchPlayers');
                    //return res.send(data);
                    //res.redirect('/');
                }
            )


        }
        catch(e){
            console.log('ERROR module (/api/updatePlayer):',e);  
            res.redirect('/');
        }


        //res.send({addPlayers: players});
    });
//
    app.post('/api/addPlayers',requireLogin, async (req, res) => {
        try {

           //var players = Array.prototype.slice.call(req.body.name);
            var players = req.body;
            console.log('server-auth-routes',players);

            var gameKey = 0; // Math.random()*100;

            //find last gameKey
            const filter = {'_id': 'descending'};//{recipients: false}
            const games = await Games.find({}).sort(filter).limit(10); 
            gameKey = games.length>0 ? games[0].gameKey:0;




            
            var coll = players.map(x => {
                console.log('x.gamekey', x.gameKey);
                return ({gameKey: x.gameKey === undefined ? gameKey : (x.gameKey === 'new' ? gameKey++ : x.gameKey), 
                        name:x.name, 
                        score: x.score === undefined ? 0 : x.score, 
                        total:x.total === undefined ? 0 : x.total});
                //return ({gameKey:gameKey, name:x.name, score:x.score, total:x.total});
            })
            console.log('saving players',coll);

            Players.insertMany(coll, function (err, coll) {
                if (err) {        
                    console.log('save many error:',err);  
                    res.send('Error saving to db') 
                    //return req.status(401).send({error: err});
                    //throw 'ERROR module: authRoutes.js (/api/history) \n'+err;
                }else{ 
                    console.log('new players saved to database', coll);
                    res.send(coll);
                    //res.redirect('/fetchPlayers');
                }
            }); 

        }
        catch(e){
            console.log('ERROR module (/api/addplayers):',e);  
            res.redirect('/dashboard');
        }


        //res.send({addPlayers: players});
    });


    app.get('/api/test1', async (req, res) => {

        var gameKey = 124;
          const players = [ //cookies.get('players') || 
            { name: 'Hoa', score: 0, total:10 },
            { name: 'Trinh', score: 0, total:20 },
            { name: 'Masay', score: 0, total:-10 },
            { name: 'Cau', score: 0, total:-20 }
        ]

        if (gameKey === undefined) gameKey = Math.random() * 100; 
        const game = new Games({
            gameKey : gameKey,
            players
          });
        const data = await game.save();

        console.log('testing  ...',data);

        res.send(data);
    });

    app.post('/api/addgame', async (req, res) => {
        console.log('save game', req.body);
        const {players, gameKey, dealer, nextDealerPos, dealingNumber} = req.body;
        console.log('players, gameKey, dealer', nextDealerPos + '=' + gameKey + '=' + dealer + '=' + dealingNumber);


        // const players = [ //cookies.get('players') || 
        //     { name: 'Hoa', score: 0, total:10 },
        //     { name: 'Trinh', score: 0, total:20 },
        //     { name: 'Masay', score: 0, total:-10 },
        //     { name: 'Cau', score: 0, total:-20 }
        // ]
       
        //var gameKey = 0; // Math.random()*100;
        let _newKey = 1;
        let _nextDealerPos = nextDealerPos;
        let _dealingNumber = dealingNumber;
        //find last gameKey from db
        if (gameKey === undefined || gameKey === -999){
            //gameKey = gameKey = 'new' ? 0 : gameKey;
            console.log('find last gameKey...');
            const filter = {'_id': 'descending'};//{recipients: false}
            const games = await Games.find({}).sort(filter).limit(1); 

            console.log('found last gameKey.length..',games.length);
            if(games.length > 0){
                _newKey = games[0].gameKey + 1;
                console.log('found last gameKey...', _newKey);                
            }
        } else {
            //calculate next dealing position number
            console.log('calculate dealing position...', _dealingNumber);
            //console.log(this.state.players[person].id);
            // if (players.length === 4){
            //     console.log('calculate dealing position...2', _nextDealerPos);

            //     _dealingNumber--;

            //     if (_dealingNumber === 0 || _dealingNumber < 0) _nextDealerPos ++

            //     if (_nextDealerPos === 4) {

            //         console.log('calculate moving next dealer ', _dealingNumber);

            //         _dealingNumber = 3
            //         _nextDealerPos = 0
            //     } 

            // }
        }

        const game = new Games({
            gameKey : _newKey,
            dealer,
            nextDealerPos, _nextDealerPos,
            dealingNumber: _dealingNumber,
            players
          });
        console.log('addgame',game);

        try {
            const data = await game.save();

            // const test = {"__v":0,
            //                 "gameKey":"123New","_id":"5b9ba33458074fd70984ee51",
            //                 "players":[{"name":"Hoa","score":0,"total":10,"_id":"5b9ba33458074fd70984ee55"},
            //                             {"name":"Trinh","score":0,"total":20,"_id":"5b9ba33458074fd70984ee54"},
            //                             {"name":"Masay","score":0,"total":-10,"_id":"5b9ba33458074fd70984ee53"},
            //                             {"name":"Cau","score":0,"total":-20,"_id":"5b9ba33458074fd70984ee52"}
            //                         ]}

            console.log('addgame response',data);
            //res.send(data);
            
        } catch (err) {
            console.log('addgame response error', err);
            res.send(err)
        }
        res.redirect('/api/fetchPlayers');
    });

    app.post('/api/clearHistory', async (req, res) => {
        console.log('clear history');

        // or, for inserting large batches of documents
        const response = Games.remove({}, function(err) {
            if(err!==null)
                console.log('clear history error', err);
        });

        console.log(response);

        res.redirect('/api/fetchPlayers');
    });
   
    app.get('/api-dummy/fetchPlayers', (req, res) => {
        const players = [ //cookies.get('players') || 
            { _id: 1, name: 'Hoa', score: 0, total:10 },
            { _id: 2, name: 'Trinh', score: 0, total:20 },
            { _id: 3, name: 'Masay', score: 0, total:-10 },
            { _id: 4, name: 'Cau', score: 0, total:-20 }
        ]
        res.send(players.JSON);
    });

}
