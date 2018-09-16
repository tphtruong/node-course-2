const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
// require('../models/History');
const Surveys = mongoose.model('surveys');
// const History = mongoose.model('history');
// gameKey: Number,
// players : [PlayerSchema],
// score: {type:Number, default:0},
// yes:  {type:Number, default:0},
// no:  {type:Number, default:0},
// _playerId: {type: Schema.Types.ObjectId, ref: 'Players'},
// dateCreated: Date,

module.exports = (app) => {
    app.post('/api/surveys', (req, res) => {
        const {players, score, gameKey} = req.body;
        // create new instance of a Surveys coll
        const surveys = new Surveys({
            players, 
            score, 
            gameKey
        })
    });

    app.post('/api/saveGameScores',requireLogin, (req, res) => {
        try {
            var players = req.body;
            console.log('server-saveGameScores-requuest-body',players);
            var count = players.length;

            
            //today = getTodayDate();// 
            players.map(player => {
                console.log(player);
                // a history document instance
                //var history = new History({name:player.name, score:player.score, total:player.total, date: today});
                var player = new Players({
                        gameKey: player.gameKey,
                        name:player.name, 
                        score:player.score, 
                        total:player.total //+ player.score
                    });
                
                // save model to database
                player.save(function (err, player) {
                    count--;

                    if (err) return console.error(err);
                    console.log(player.name + " saved to Players collection.");

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
                        console.log("redirect to api.fetchPlayers",req.players);
                        //res.send(players)
                        res.redirect('/fetchPlayers');
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

    
}
