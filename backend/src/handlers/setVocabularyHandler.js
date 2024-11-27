const setVocabularyModel = require('../models/setVocabularyModel'); // Adjust path as needed

// Fetch all vocabulary related to set_id
async function fetchSetVocabulary(req, res) {
    const { set_id } = req.params; 

    if (!set_id) {
        return res.status(400).json({ error: 'Set ID is required as a route paramter.' });
    }

    console.log("set id", set_id)
    try {
        const vocabulary = await setVocabularyModel.fetchSetVocabulary(set_id);

        if (!vocabulary.length) {
            return res.status(404).json({ error: 'No vocabulary found for this set.' });
        }

        res.status(200).json({ vocabulary });
    } catch (error) {
        console.error('Error in fetchSetVocabularyHandler:', error);
        res.status(500).json({ message: error.message });
    }
}

/* 
Insert a new vocabulary-set relationship

Req Body:
    {
    "vocabulary_id": INT
    }

Returns:
    200 OK: Succes message
    500 INTERNAL ERROR: Error message
*/
async function insertSetVocabulary(req, res) {
    const { set_id } = req.params;
    const { vocabulary_id } = req.body;

    // Validate input
    if (!set_id || !vocabulary_id) {
        return res.status(400).json({ error: 'Set ID and Vocabulary ID are required.' });
    }

    try {
        const result = await setVocabularyModel.insertSetVocabulary(set_id, vocabulary_id);

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