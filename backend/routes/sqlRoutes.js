const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController'); // handles logic of sql requests

router.post('/add', sqlController.addUser);
router.post('/verify', sqlController.verifyUser);

module.exports = router;