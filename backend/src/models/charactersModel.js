const pool = require('../db');

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
    return rows;
}

/* 
Add a new character 
    
Params:
    characterData:
        chinese_simplified: STRING
        chinese_traditional: STRING
        radical_simplified: STRING
        radical_traditional: STRING 
        stroke_count_simplified: INT
        stroke_count_traditional: INT
        difficulty: DOUBLE
        pinyin: STRING
        english: STRING

Return: 
    insertID: id of inserted character
*/
async function addCharacter(characterData) {
    const query = `
        INSERT INTO Characters (
            chinese_simplified, 
            chinese_traditional, 
            radical_simplified, 
            radical_traditional, 
            stroke_count_simplified, 
            stroke_count_traditional, 
            difficulty, 
            pinyin,
            english
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        characterData.chinese_simplified,
        characterData.chinese_traditional,
        characterData.radical_simplified || null,
        characterData.radical_traditional || null,
        characterData.stroke_count_simplified || null,
        characterData.stroke_count_traditional || null,
        characterData.difficulty || null,
        characterData.pinyin,
        characterData.english,
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId; // Return the new character's ID
}

module.exports = {
    fetchCharacterById,
    fetchAllCharacters,
    addCharacter,
};
