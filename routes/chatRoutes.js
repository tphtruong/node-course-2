const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8989 });
//console.log('websocket',wss);

const Members = require('../models/Players');
const users = []

const broadcast = (data, ws) => {
    console.log('bradcasting...', data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
            console.log('send json data from clients-ws:', data);
            client.send(JSON.stringify(data))
        }
    })
}

module.exports = (app) => {

    wss.on('connection', (ws) => {

        let index
        console.log('on connection...', users);

        ws.on('message', (message) => {
            const data = JSON.parse(message); 

            console.log('on message...',data);
        
            switch (data.type) {
                case 'ADD_USER': {  //// {"type":"ADD_USER","name":"???"}
                    index = users.length
                    users.push({ username: data.username, id: index + 1 })
                    ws.send(JSON.stringify({
                        type: 'USERS_LIST',
                        users
                    }))
                    broadcast({
                        type: 'USERS_LIST',
                        users
                    }, ws)
                    break
                }
                case 'ADD_MESSAGE': ////{"type":"ADD_MESSAGE","id":0,"message":"hello world","author":"Ann"}
                    broadcast({
                        type: 'ADD_MESSAGE',
                        message: data.message,
                        author: data.author
                    }, ws)
                    break
                default:
                break
            }
        })
    
        ws.on('close', () => {
            console.log('on close...before ', users);
            
            users.splice(index, 1)
            broadcast({
                type: 'USERS_LIST',
                users
            }, ws)
        })
    })

    app.post('/api/userLogin', async (req, res) => {
        console.log('user login', req.body);
        const {username, password} = req.body;
        var isOk = false;
        
        Members.forEach(function(user) {
            if (user.username === username && user.password === password){
                var foundUser = users.find(u => u.username === user.username);
                foundUser !==undefined ? foundUser : users.push(user) ;
                isOk = true;
            }           
        });
        console.log('user list',users);

        // or, for inserting large batches of documents
        if(isOk) { //username === 'admin' && password === 'password'){
            //users.push({ username: username, id: users.length + 1 })
            //res.send({name:undefined, error:'wrong username or password'});

            // broadcast({
            //     type: 'USERS_LIST',
            //     users
            // }, ws)
            //break

            //res.redirect('/api/fetchPlayers');
            res.send({error:null, me: username , users: users});
        }else{
            res.send({error:'wrong username or password'});
            
            // res.send(JSON.stringify({
            //     type: 'USERS_LIST',
            //     users,
            //     error:'wrong username or password'
            // }))
        }       

    });

}