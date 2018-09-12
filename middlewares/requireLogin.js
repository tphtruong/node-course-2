module.exports = (req,res,next) => {
    // if (!req.user) {
    //     return req.status(401).send({error:'what ever error'});
    // }
    next();
}