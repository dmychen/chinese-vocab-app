const pool = require('../db'); // get connection pool

// Fetch a character by ID
async function fetchCharacterById(id) {
    const query = `
        SELECT * FROM Characters 
        WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0]; // Return the first row or undefined if not found
}

// Fetch all characters
async function fetchAllCharacters() {
    const query = `
        SELECT * FROM Characters
    `;
    const [rows] = await pool.execute(query);
    return rows; // Return the first row or undefined if not found
}

/* 
Add a new character 
    
Params:
    characterData:
        character_simplified: STRING
        character_traditional: STRING
        radical_simplified: STRING
        radical_traditional: STRING 
        stroke_count_simplified: INT
        stroke_count_traditional: INT
        difficulty: DOUBLE
        pinyin: STRING
        meaning: STRING

Return: 
    insertID: id of inserted character
*/
async function addCharacter(characterData) {
    const query = `
        INSERT INTO Characters (
            character_simplified, 
            character_traditional, 
            radical_simplified, 
            radical_traditional, 
            stroke_count_simplified, 
            stroke_count_traditional, 
            difficulty, 
            pinyin,
            meaning
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        characterData.character_simplified,
        characterData.character_traditional,
        characterData.radical_simplified || null,
        characterData.radical_traditional || null,
        characterData.stroke_count_simplified || null,
        characterData.stroke_count_traditional || null,
        characterData.difficulty || null,
        characterData.pinyin,
        characterData.meaning,
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId; // Return the new character's ID
}

module.exports = {
    fetchCharacterById,
    fetchAllCharacters,
    addCharacter,
};
