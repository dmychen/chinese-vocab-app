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
    return rows;
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

// Search for vocabulary with chinese/pinyin/english that matches the `query`
async function searchVocabulary(query, searchField = 'chinese_simplified') {
    const validFields = ['chinese_simplified', 'chinese_traditional', 'pinyin', 'english'];

    // Validate the searchField
    if (!validFields.includes(searchField)) {
        throw new Error(`Invalid search field: ${searchField}`);
    }

    let sqlQuery = '';
    let params = [];

    if (searchField === 'pinyin') {
        // match query with or without tone numbers for pinyin
        sqlQuery = `
            SELECT * FROM vocabulary
            WHERE REPLACE(pinyin, '1', '') 
                  LIKE ? OR 
                  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(pinyin, '1', ''), '2', ''), '3', ''), '4', ''), '5', '') LIKE ?
        `;
        params = [`%${query}%`, `%${query}%`];
    } else {
        // Standard query for other fields
        sqlQuery = `
            SELECT * FROM vocabulary
            WHERE ${searchField} LIKE ?
        `;
        params = [`%${query}%`];
    }

    try {
        const [rows] = await pool.execute(sqlQuery, params);
        return rows; // Return all matching rows
    } catch (error) {
        console.error("Error searching vocabulary:", error);
        throw error;
    }
}


module.exports = {
    fetchVocabularyById,
    fetchAllVocabulary,
    addVocabulary,
    searchVocabulary,
};
