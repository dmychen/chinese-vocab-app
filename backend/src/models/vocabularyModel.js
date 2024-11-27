const pool = require('../db'); // get connection pool

// Fetch a vocab by ID
async function fetchVocabularyById(id) {
    const query = `
        SELECT * FROM vocabulary 
        WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0]; // Return the first row or undefined if not found
}

// Fetch all vocabulary
async function fetchAllVocabulary() {
    const query = `
        SELECT * FROM vocabulary
    `;
    const [rows] = await pool.execute(query);
    return rows; // Return the first row or undefined if not found
}

/* 
Add a new vocab word 
    
Params:
    vocabularyData:
        chinese_simplified: STRING
        chinese_traditional: STRING
        frequency: INT
        difficulty: DOUBLE
        pinyin: STRING
        meaning: STRING

Return: 
    insertID: id of inserted vocabulary
*/
async function addVocabulary(vocabularyData) {
    const query = `
        INSERT INTO Vocabulary (
            chinese_simplified, 
            chinese_traditional, 
            frequency,
            difficulty, 
            pinyin,
            english
        ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        vocabularyData.chinese_simplified,
        vocabularyData.chinese_traditional,
        vocabularyData.frequency || null,
        vocabularyData.difficulty || null,
        vocabularyData.pinyin,
        vocabularyData.english,
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId; // Return the new character's ID
}

module.exports = {
    fetchVocabularyById,
    fetchAllVocabulary,
    addVocabulary,
};
