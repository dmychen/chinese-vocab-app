const express = require('express');
const router = express.Router();
const sqlRoutes = require('./sqlRoutes');
const apiRoutes = require('./apiRoutes');
const gptRoutes = require('./gptRoutes');

router.use('/sql', sqlRoutes); // our sql routes
router.use('/api', apiRoutes); // other api routes
router.use('/gpt', gptRoutes); // gpt api routes

module.exports = router;