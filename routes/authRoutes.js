const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
require('../models/History');
const Players = mongoose.model('players');
const History = mongoose.model('history');

module.exports = (app) => {
    // app.get('/auth/google', 
    //     passport.authenticate('google', {
    //         scope: ['profile', 'email']
    //     }) 
    // );

    // app.get(
    //     '/auth/google/callback',
    //     passport.authenticate('google'),
    //     (req, res) => {
    //     res.redirect('/surveys');
    //     }
    // );

    // app.get('/api/logout', (req, res) => {
    //     req.logout();
    //     res.send(req.user);
    //});
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

    app.get('/api/fetchPlayers', async (req, res) => {
        const filter = {};//{recipients: false}
        const players = await Players.find({}).select(filter); 
        res.send(players);
      });

    app.get('/api/fetchHistory', async (req, res) => {
        //const filter = {name,date,score};//{recipients: false}
        //const history = await History.find({}).select(filter); 


        //var roles = ["hoa","masay"];
        History.find()
        //    .populate({
        //        path: 'roles',
        //        match: { name: { $in: roles }},
        //        select: 'name,date'
        //    })
           //.sort({'_id': 1})
           .exec(function (err, history) {
       
               res.send(history);
           });
            //res.send(history);
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

    app.get('/api/startGame', (req, res) => {
        const players = Players.remove({}, result => {
            console.log('players removed from db');
            res.send(result);

            res.redirect('/addplayers');
        });           
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
    app.post('/api/saveGameScores',requireLogin, (req, res) => {
        try {
            var players = req.body;
            console.log('server-auth-routes',players);
            var count = players.length;

            
            today = getTodayDate();// 
            players.map(player => {
                console.log(player);
                // a history document instance
                var history = new History({name:player.name, score:player.score, total:player.total, date: today});
                
                // save model to database
                history.save(function (err, history) {
                    count--;

                    if (err) return console.error(err);
                    console.log(history.name + " saved to history collection.");

                    // Players.findByIdAndUpdate(
                    //     player._id,
                    //     player,
                    //     {new: true},
                    //     (err, data) => {
                    //         if (err) return res.status(500).send(err);
                    //         //res.redirect('/api/fetchPlayers');

                    //     }
                    // )

                    if (count === 0){
                        res.redirect('/api/fetchPlayers');
                    }
                });

            })


        }
        catch(e){
            console.log('ERROR module (/api/addplayers):',e);  
            res.redirect('/api/fetchPlayers');
        }

        //res.redirect('/api/fetchPlayers');
    });

    app.post('/api/addPlayers',requireLogin, (req, res) => {
        try {
            Players.remove({}, result => {
                console.log('players removed from db');
                //res.send(result);
    
                //res.redirect('/addplayers');
            }); 

            //var players = Array.prototype.slice.call(req.body.name);
            var players = req.body;
            console.log('server-auth-routes',players);

            var newColl = []
            players.map(x =>
                newColl.push({name:x.name, score:0, total:0})
            )

            console.log('server-auth-routes',newColl);
            // var players = Array(4).fill({name:'',score:0,total:0})

            Players.insertMany(newColl, function (err, coll) {
                if (err) {        
                    console.log('save many error:',err);   
                    return req.status(401).send({error: err});
                    //throw 'ERROR module: authRoutes.js (/api/history) \n'+err;
                }else{ 
                    console.log('new players', coll);
                    //res.send(coll);
                    res.send({svrPlayers:coll});
                }
            }); 

        }
        catch(e){
            console.log('ERROR module (/api/addplayers):',e);  
            res.redirect('/dashboard');
        }


        //res.send({addPlayers: players});
    });

    app.post('/api/stripe', async (req, res) => {
        debugger;
        console.log('stripe-req',req.players);
        res.send(req.players);
    });
}
