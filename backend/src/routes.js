const express = require('express');
const charactersHandler = require('./handlers/charactersHandler'); // Queries into our characters table
const vocabularyHandler = require('./handlers/vocabularyHandler');
const setHandler = require('./handlers/setHandler');
const setVocabularyHandler = require('./handlers/setVocabularyHandler');

const router = express.Router();

    // Characters routes
    router.get('/characters/:id?', charactersHandler.fetchCharacter); // Get char by id, or all characters if no id supplied
    router.post('/characters', charactersHandler.addCharacter); // Post new char

    // Vocabulary routes
    router.get('/vocabulary/:id?', vocabularyHandler.fetchVocabulary); // Get vocabulary by id, or all vocab if no id supplied
    router.post('/vocabulary', vocabularyHandler.addVocabulary); // Post new vocab
    router.get('/vocabulary/search/:search_field/:search_query/:search_count/:search_offset', vocabularyHandler.searchVocabulary); // Search for vocab

    // Set routes
    router.get('/sets/:id?', setHandler.fetchSet); // Get vocabulary by id, or all vocab if no id supplied
    router.post('/sets', setHandler.insertSet); // Post new vocab

    // SetVocabulary routes
    router.get('/sets/:set_id/vocabulary/:vocab_id?', setVocabularyHandler.fetchSetVocabulary); // Get all vocab for a particular set
    router.post('/sets/:set_id/vocabulary/:vocab_id', setVocabularyHandler.insertSetVocabulary); // Post new vocab
    
module.exports = router;