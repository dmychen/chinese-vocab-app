const pool = require('../db');

async function fetchSetVocabulary(setId) {
    // Select all vocabulary tied to setId
    const query = `
        SELECT v.id, v.chinese_simplified, v.chinese_traditional, v.pinyin, v.english, v.frequency, v.difficulty
        FROM Vocabulary v
        INNER JOIN vocabulary_sets vs ON v.id = vs.vocabulary_id
        WHERE vs.set_id = ?;
    `;
    const [rows] = await pool.execute(query, [setId]);
    return rows;
}

async function insertSetVocabulary(setId, vocabularyId) {
    // Insert relationship between this vocab and set
    const query = `
        INSERT INTO vocabulary_sets (set_id, vocabulary_id)
        VALUES (?, ?);
    `;
    const [result] = await pool.execute(query, [setId, vocabularyId]);
    return result; // Return the result of the insertion
}

module.exports = { 
    fetchSetVocabulary,
    insertSetVocabulary 
};
