const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {

    app.get('/api/stripe', (req, res) => {
        console.log('stripe-req',req.body);

        // const players = [ //cookies.get('players') || 
        //     { _id: 1, name: 'Hoa', score: 1, total:10 },
        //     { _id: 2, name: 'Trinh', score: 2, total:20 },
        //     { _id: 3, name: 'Masay', score: 3, total:-10 },
        //     { _id: 4, name: 'Cau', score: 4, total:-20 }
        // ]

        res.send(JSON.stringify(players));
    });
}
// module.exports = app => {
//     app.post('/api/stripe', requireLogin, async (req, res) => {
//       const charge = await stripe.charges.create({
//         amount: 500,
//         currency: 'usd',
//         description: '$5 for 5 credits',
//         source: req.body.id
//       });
  
//       req.user.credits += 5;
//       const user = await req.user.save();
  
//       res.send(user);
//     });
//   };
  