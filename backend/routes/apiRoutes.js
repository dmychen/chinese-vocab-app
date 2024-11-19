const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController'); // controls mail logic

router.post('/mail', apiController.nodeMailerSendMail); // post an email
router.get('/pokemon/:name', apiController.pokemon); // get a pokemon
router.get('/simple-get', apiController.simpleGet); // simple-get

module.exports = router;