const setVocabularyModel = require('../models/setVocabularyModel'); // Adjust path as needed

/* 
GET /api/v1/set/:set_id/vocabulary/:vocab_id? Fetch all vocabulary related to set_id

Params:
    set_id: ID of the requested set, or `-1` to request from all sets
    vocab_id: ID of the requested vocab, or `null` to request all vocab

Returns: 
    {
    "vocabulary": [{
        "id": <int> vocab_id,
        "chinese_simplified": <string>,
        "chinese_traditional": <string>,
        "pinyin": <string>,
        "english": <string>,
        "frequency": <int>,
        "difficulty": <int>,
        "created_at": <string>,
        "updated_at": <string>
        },
    ...
    ]
}
*/
async function fetchSetVocabulary(req, res) {
    const { set_id, vocab_id } = req.params; 

    if (!set_id) {
        return res.status(400).json({ error: 'Set ID is required as a route paramter.' });
    }

    try {
        if (vocab_id) {
            // If vocab_id is provided, fetch that vocab from the specified set
            const vocabulary = await setVocabularyModel.fetchFromSetVocab(set_id, vocab_id);
            if (!vocabulary) {
                return res.status(404).json({ error: 'Vocabulary not found.' });
            }
            return res.status(200).json({ vocabulary });
        }

        // If vocab_id is not provided, fetch all vocabulary for the set
        const vocabulary = await setVocabularyModel.fetchSetVocabulary(set_id);
        res.status(200).json({ vocabulary });
    } catch (error) {
        console.error('Error in fetchSetVocabularyHandler:', error);
        res.status(500).json({ message: error.message });
    }
}

/* 
POST /api/v1/set/:set_id/vocabulary/:vocab_id Insert a new vocabulary-set relationship

Params:
    set_id: id of the set to insert into
    vocab_id: id of the vocab to insert

Returns:
    200 OK: Succes message
    500 INTERNAL ERROR: Error message
*/
async function insertSetVocabulary(req, res) {
    const { set_id, vocab_id } = req.params;

    // Validate input
    if (!set_id || !vocab_id) {
        return res.status(400).json({ error: 'Set ID and Vocabulary ID are required.' });
    }

    try {
        const result = await setVocabularyModel.insertSetVocabulary(set_id, vocab_id);

        res.status(201).json({
            message: 'Vocabulary successfully added to the set.',
            affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error('Error in insertSetVocabularyHandler:', error);

        // Check for duplicate entry error
        if (error.code === 'ER_DUP_ENTRY') {
            return res
                .status(409)
                .json({ error: 'This vocabulary is already in the set.' });
        }

        res.status(500).json({ message: error.message });
    }
}

module.exports = { fetchSetVocabulary, insertSetVocabulary };