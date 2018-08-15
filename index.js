const express = require('express');
const app = express();

//create route handler
app.get('/', (req, res) => {
    res.send({hi: 'there hihihi'});
});

const PORT =  process.env.PORT || 5000;
//app.listen(5000);
app.listen(PORT);
