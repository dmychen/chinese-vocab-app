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
async function searchVocabulary(query, searchField = 'chinese_simplified', count, offset) {
    let results;

    // First try to search by the specified searchField
    try {
        results = await searchByField(query, searchField, count, offset);
        
        // If no results are found and the searchField is "english", try "pinyin"
        if (results.length === 0 && searchField === 'english') {
            results = await searchByField(query, 'pinyin', count, offset);
        }
        
        // If no results are found and the searchField is "pinyin", try "english"
        else if (results.length === 0 && searchField === 'pinyin') {
            results = await searchByField(query, 'english', count, offset);
        }

        // Return the results, which might be from the fallback search
        return results;
    } catch (error) {
        console.error("Error during vocabulary search:", error);
        throw error;
    }
}

// search the vocabulary table by a particular column (`searchField`)
async function searchByField(query, searchField, count, offset) {
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
            WHERE REPLACE(pinyin, ' ', '') 
                  LIKE ? OR 
                  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(pinyin, ' ', ''), '1', ''), '2', ''), '3', ''), '4', ''), '5', '') LIKE ?
            LIMIT ${count} OFFSET ${offset}
        `;
        params =  [`%${query}%`, `%${query}%`];
    } else {
        // Standard query for other fields (POTENTIAL SQL INJECTION?)
        sqlQuery = `
            SELECT * FROM vocabulary
            WHERE ${searchField} LIKE ?
            LIMIT ${count} OFFSET ${offset}
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
