const mysql = require('mysql2');

// Creating our connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', 
    password: 'dmdmmlad',
    database: 'devx',
    port: 3306
}) 

// connecting
db.connect((err) => {
    if (err) {
    console.error('Error connecting to the database', err.message);
    } else {
    console.log('Connected to the MySQL database!');
    } 
});

// add user to database
exports.addUser = async (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO user (user_email, user_password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding user to the database.');
        }
        res.status(200).send('User added successfully.');
    })
};

// verify a user
exports.verifyUser = async (req, res) => {
    const {email, password} = req.body;
    query = 'SELECT * FROM user WHERE user_email = ? and user_password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send("Error verifying user credentials");
        } if (results.length > 0) {
            const user = results[0];
            // maybe delete user_password for security
            res.status(200).send({ message: 'User verified successfully.', user: user }); // return success and user we found
        } else {
            res.status(401).send('Invalid email or password');
        }
    })
};
