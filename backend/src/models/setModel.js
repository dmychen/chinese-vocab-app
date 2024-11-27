const pool = require('../db'); // get connection pool

// Fetch a set by ID
async function fetchSetById(id) {
    const query = `
        SELECT * FROM sets 
        WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0]; // Return the first row or undefined if not found
}

// Fetch all sets
async function fetchAllSets() {
    const query = `
        SELECT * FROM sets
    `;
    const [rows] = await pool.execute(query);
    return rows;
}

/* 
Insert a new set 
    
Params:
    setData:
        name: STRING
        description: STRING
        user_id: INT

Return: 
    insertID: id of inserted character
*/
async function insertSet(setData) {
    const query = `
        INSERT INTO sets (
            name, 
            description, 
            user_id
        ) VALUES (?, ?, ?)
    `;
    const values = [
        setData.name,
        setData.description || null,
        setData.user_id,
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId; // Return the new character's ID
}


module.exports = {
    fetchSetById,
    fetchAllSets,
    insertSet,
}