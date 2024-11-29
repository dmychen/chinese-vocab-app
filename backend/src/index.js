const express = require('express');
const bodyparser = require('body-parser'); // allows json and url parsing
const routes = require('./routes'); // registers our routes
const app = express(); // create our express app instance
const cors = require("cors"); // accessing from frontend

// setup cors, parsing and routes
app.use(cors({
    origin: ['http://localhost:3000'], // Allow origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Restrict allowed headers
  })); 
app.use(bodyparser.json()); // converts JSON into js objects stored in req.body
app.use(bodyparser.urlencoded({ extended: false })); // also stores in req.body. extended = false -> don't support nested objects, only flat key-value pairs
app.use('/api/v1', routes);


// app.listen creates a socket and binds it to the PORT we specified.
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})