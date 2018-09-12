// // keys.js - figure out what set of credentials to return
// if (process.env.NODE_ENV === 'production') {
//     // we are in production - return the prod set of keys
//     module.exports = require('./prod');
//   } else {
//     // we are in development - return the dev keys!!!
//     module.exports = require('./dev');
//   }

  module.exports = {
    googleClientID:'111318676083-nkq8rt87uvtabbt4gfr27s1j6lm6sp01.apps.googleusercontent.com',
    googleClientSecret:'ZgJnSGXfOLKsGJmcfacBbINz',
    mongoURI : 'mongodb://hoa:password123@ds047935.mlab.com:47935/emaily-dev',
    cookieKey : 'dsafadsfkjadsnfladskjfnasdlz',
    stripePublishableKey : 'https://dashboard.stripe.com/account/apikeys',
    stripeSecretKey : 'sk_test_X4A4kS4Hf15sE8SskhGTmhj5'
};
