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

async function fetchFromSetVocab(set_id, vocab_id) {
    if (set_id === '-1') {
        // Fetch globally if set_id is -1
        const query = `SELECT v.* 
            FROM vocabulary v
            JOIN vocabulary_sets vs ON v.id = vs.vocabulary_id
            WHERE vs.vocabulary_id = ?`;
        const [rows] = await pool.execute(query, [vocab_id]);
        return rows.length ? rows[0] : null;
    } else {
        // Fetch from specific set
        const query = `
            SELECT v.* 
            FROM vocabulary v
            JOIN vocabulary_sets vs ON v.id = vs.vocabulary_id
            WHERE vs.set_id = ? AND v.id = ?`;
        const [rows] = await pool.execute(query, [set_id, vocab_id]);
        return rows.length ? rows[0] : null;
    }
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
    insertSetVocabulary,
    fetchFromSetVocab
};
