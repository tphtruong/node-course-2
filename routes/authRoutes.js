// const passport = require('passport');
//const express = require('express');

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

    app.get('/api/fetchPlayers', (req, res) => {

       // res.send({hi: 'hi from fetch players'});

        const players = [ //cookies.get('players') || 
            { _id: 1, name: 'Hoa', score: 0, total:10 },
            { _id: 2, name: 'Trinh', score: 0, total:20 },
            { _id: 3, name: 'Masay', score: 0, total:-10 },
            { _id: 4, name: 'Cau', score: 0, total:-20 }
        ]
        
        console.log('players',players);
        res.send(JSON.stringify(players));
    });

    app.get('/server', (req, res) => {
        res.send({hi: 'hellow world from server root'});
    });

    app.get('/', (req, res) => {
        res.send({hi: 'hellow world'});
    });
}
