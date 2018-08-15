const express = require('express');
const app = express();

//create route handler
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT =  process.env.PORT || 5000;
//app.listen(5000);
app.listen(PORT);
