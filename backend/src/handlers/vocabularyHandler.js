const vocabularyModel = require('../models/vocabularyModel'); // deal with queries to db

// Fetch vocab by ID, or all vocab if no id
async function fetchVocabulary(req, res) {
    const { id } = req.params;

    try {
        let vocabulary;
        if (id) {
            // If id is provided, fetch a specific character by id
            vocabulary = await vocabularyModel.fetchVocabularyById(id);
            if (!vocabulary) {
                return res.status(404).json({ error: 'Character not found' });
            }
        } else {
            // If no id is provided, fetch all vocabulary
            vocabulary = await vocabularyModel.fetchAllVocabulary();
        }

        res.status(200).json(vocabulary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

/* 
Add a new vocabulary word

Req Body:
    {
    "chinese_simplified": STRING,
    "chinese_traditional": STRING,
    "frequency": INT,
    "difficulty": DOUBLE,
    "pinyin": STRING,
    "english": STRING
    }

Returns:
    200 OK: Success message
    500 INTERNAL ERROR: Error message
*/
async function addVocabulary(req, res) {
    const vocabularyData = req.body; // json stored in request body

    // check if valid entry
    const error = validateVocabularyData(vocabularyData);
    if (error) {
        return res.status(400).json({ error });
    }

    // insert
    try {
        const insertId = await vocabularyModel.addVocabulary(vocabularyData);

        res.status(201).json({ id: insertId, message: 'Vocab added successfully' });
    } catch (error) {
        console.error(error);

        // if duplicate
        if (error.code === 'ER_DUP_ENTRY') {
            return res
                .status(409)
                .json({ error: 'This vocabulary is already in the set.' });
        }

        res.status(500).json({ message: error.message });
    }
}


// Check if a JSON data object is a valid character entry
function validateVocabularyData(data) {
    if (!data.chinese_simplified || typeof data.chinese_simplified !== 'string') {
        return 'chinese_simplified is required and must be a string';
    }
    if (!data.chinese_traditional || typeof data.chinese_traditional !== 'string') {
        return 'chinese_traditional is required and must be a string';
    }
    if (data.frequency !== undefined && typeof data.frequency !== 'number') {
        return 'frequency must be a number if provided';
    }
    if (data.difficulty !== undefined && typeof data.difficulty !== 'number') {
        return 'difficulty must be a number if provided';
    }
    if (!data.pinyin || typeof data.pinyin !== 'string') {
        return 'pinyin must be a string if provided';
    }
    if (!data.english || typeof data.english !== 'string') {
        return 'english is required and must be a string';
    }

    return null;
}

module.exports = {
    fetchVocabulary,
    addVocabulary,
};
