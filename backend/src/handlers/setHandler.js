const setModel = require('../models/setModel'); // deal with queries to db

// Fetch set by ID, or all sets if no id
async function fetchSet(req, res) {
    const { id } = req.params;

    try {
        let sets;
        
        if (id) { // If id is provided, fetch set by id
            sets = await setModel.fetchSetById(id);
            if (!sets) {
                return res.status(404).json({ error: 'Set not found' });
            }
        } else { // If no id is provided, fetch all sets
            sets = await setModel.fetchAllSets();
        }

        res.status(200).json(sets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

/* 
POST /api/v1/sets/ Insert a new set

Req Body:
    {
    "name": STRING,
    "description": STRING,
    "user_id": INT
    }

Returns:
    200 OK: Success message
    500 INTERNAL ERROR: Error message
*/
async function insertSet(req, res) {
    const setData = req.body; // set data stored in request body

    // check if valid entry
    const error = validateSetData(setData);
    if (error) {
        return res.status(400).json({ error });
    }

    // insert
    try {
        const insertId = await setModel.insertSet(setData);

        res.status(201).json({ id: insertId, message: 'Set added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// Check if JSON is a valid set entry
function validateSetData(data) {
    if (!data.name || typeof data.name !== 'string') {
        return 'name is required and must be a string';
    }
    if (data.description !== undefined && typeof data.description !== 'string') {
        return 'description must be a string if provided';
    }
    if (!data.user_id || typeof data.user_id !== 'number') {
        return 'user_id is required and must be a number';
    }

    return null;
}


module.exports = {
    fetchSet,
    insertSet,
}