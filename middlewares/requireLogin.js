const keys = require('../config/keys')
module.exports = (req,res,next) => {
    // if (!req.user) {
    //     return req.status(401).send({error:'what ever error'});
    // }
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('check token',token);

    if(token){
        //Decode the token
        jwt.verify(token,keys.cookieKey,(err,decod)=>{
        if(err){
            res.status(403).json({
            message:"Wrong Token"
            });
        }
        else{
            //If decoded then call next() so that respective route is called.
            req.decoded=decod;
            next();
        }
        });
    }
    else{
        console.log('erroe cheking message');
        // res.status(403).json({
        // message:"No Token"
        // });
    }
    next();
}