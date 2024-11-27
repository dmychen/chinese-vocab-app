const charactersModel = require('../models/charactersModel'); // deal with queries to db

// Fetch character by ID, or all Characters if no id
async function fetchCharacter(req, res) {
    const { id } = req.params;

    try {
        let characters;
        if (id) {
            // If id is provided, fetch a specific character by id
            characters = await charactersModel.fetchCharacterById(id);
            if (!characters) {
                return res.status(404).json({ error: 'Character not found' });
            }
        } else {
            // If no id is provided, fetch all characters
            characters = await charactersModel.fetchAllCharacters();
        }

        res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

/* 
Add a new character

Req Body:
    {
    "character_simplified": STRING,
    "character_traditional": STRING,
    "radical_simplified": STRING,
    "radical_traditional": STRING,
    "stroke_count_simplified": INT,
    "stroke_count_traditional": INT,
    "difficulty": DOUBLE,
    "pinyin": STRING,
    "meaning": STRING
    }

Returns:
    200 OK: Succes message
    500 INTERNAL ERROR: Error message
*/
async function addCharacter(req, res) {
    const characterData = req.body; // json stored in request body

    // check if valid entry
    const error = validateCharacterData(characterData);
    if (error) {
        return res.status(400).json({ error });
    }

    // insert
    try {
        const insertId = await charactersModel.addCharacter(characterData);

        res.status(201).json({ id: insertId, message: 'Character added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


// Check if a JSON data object is a valid character entry
function validateCharacterData(data) {
    if (!data.character_simplified || typeof data.character_simplified !== 'string') {
        return 'character_simplified is required and must be a string';
    }
    if (!data.character_traditional || typeof data.character_traditional !== 'string') {
        return 'character_traditional is required and must be a string';
    }
    if (data.radical_simplified !== undefined && typeof data.radical_simplified !== 'string') {
        return 'radical_simplified must be a string if provided';
    }
    if (data.radical_traditional !== undefined && typeof data.radical_traditional !== 'string') {
        return 'radical_traditional must be a string if provided';
    }
    if (data.stroke_count_simplified !== undefined && typeof data.stroke_count_simplified !== 'number') {
        return 'stroke_count_simplified must be a number if provided';
    }
    if (data.stroke_count_traditional !== undefined && typeof data.stroke_count_traditional !== 'number') {
        return 'stroke_count_traditional must be a number if provided';
    }
    if (data.difficulty !== undefined && typeof data.difficulty !== 'number') {
        return 'difficulty must be a number if provided';
    }
    if (!data.pinyin || typeof data.pinyin !== 'string') {
        return 'pinyin must be a string if provided';
    }
    if (!data.meaning || typeof data.meaning !== 'string') {
        return 'meaning is required and must be a string';
    }

    return null;
}

module.exports = {
    fetchCharacter,
    addCharacter,
};
