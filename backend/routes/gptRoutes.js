const express = require('express');
const router = express.Router();
const gptController = require('../controllers/gptController');


router.get('/tester', gptController.testRouter);
router.post('/generate', gptController.generateText); // takes prompt in req.body

module.exports = router;