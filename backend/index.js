const express = require('express');
const bodyparser = require('body-parser');
const app = express(); // create our express app instance
const routes = require('./routes'); // import routes from index.js

// setup parsing and routes
app.use(bodyparser.json()); // converts JSON into js objects stored in req.body
app.use(bodyparser.urlencoded({ extended: false })); // also stores in req.body. extended = false -> don't support nested objects, only flat key-value pairs
app.use('/v1', routes);

// app.listen creates a socket and binds it to the PORT we specified.
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})