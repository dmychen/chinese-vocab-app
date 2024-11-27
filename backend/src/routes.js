const express = require('express');
const charactersHandler = require('./handlers/charactersHandler'); // Queries into our characters table
const vocabularyHandler = require('./handlers/vocabularyHandler');
const setHandler = require('./handlers/setHandler');
const setVocabularyHandler = require('./handlers/setVocabularyHandler');
// const reviewHandler = require('./src/handlers/reviewHandler');

const router = express.Router();

    // Characters routes
    router.get('/characters/:id?', charactersHandler.fetchCharacter); // Get char by id, or all characters if no id supplied
    router.post('/characters', charactersHandler.addCharacter); // Post new char

    // Vocabulary routes
    router.get('/vocabulary/:id?', vocabularyHandler.fetchVocabulary); // Get vocabulary by id, or all vocab if no id supplied
    router.post('/vocabulary', vocabularyHandler.addVocabulary); // Post new vocab

    // Set routes
    router.get('/sets/:id?', setHandler.fetchSet); // Get vocabulary by id, or all vocab if no id supplied
    router.post('/sets', setHandler.insertSet); // Post new vocab

    // SetVocabulary routes
    router.get('/sets/:set_id/vocabulary/', setVocabularyHandler.fetchSetVocabulary); // Get vocabulary by id, or all vocab if no id supplied
    router.post('/sets/:set_id/vocabulary', setVocabularyHandler.insertSetVocabulary); // Post new vocab
// Other routes...

module.exports = router;