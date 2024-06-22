const express = require("express");
const mysql = require("mysql");
const path = require('path');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rajan@123',
    database: 'project'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the database');
});

app.post("/sign_up", (req, res) => {
    const { name, age, email, phoneNo, gender, password } = req.body;
    console.log("Received data:", req.body);

    const data = { name, age, email, phone: phoneNo, gender, password };

    const query = 'INSERT INTO users SET ?';

    db.query(query, data, (err, result) => {
        if (err) {
            console.error('Error inserting record:', err);
            return res.status(500).send('Error signing up user');
        }

        console.log('Record inserted successfully');
        return res.redirect('/signup_successful.html');
    });
});

// Define route for the root path ('/')
app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

// Start the server
const PORT = 3001; // Change to a different port if needed
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
