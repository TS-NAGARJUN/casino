const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files (HTML, CSS, JS)

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nagarjun@123$',  // replace with your MySQL root password
    database: 'casino'          // replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Successfully connected to the database');
});

// Handle POST request from the signup form
app.post('/signup', (req, res) => {
    const { username, phone, pan } = req.body;

    // Ensure we are getting the form values correctly
    console.log('Received Data:', { username, phone, pan });

    const sql = 'INSERT INTO userdetails (username, phone_number, pan_card) VALUES (?, ?, ?)';
    db.query(sql, [username, phone, pan], (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err.stack);
            return res.status(500).send('Failed to store data');
        }
        console.log('Data inserted successfully');
        res.send('Data stored successfully');
    });
});

// Serve the signup page (make sure it's in the "public" folder)
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
