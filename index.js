const util = require('util');
const express = require('express');
const mysql = require('mysql'); // Use mysql2 instead of mysql
const app = express();
const cookieParser = require('cookie-parser');
const { error } = require('console');
const PORT = 8889;

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.set('view engine', 'ejs');
app.set('views', './views');

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'login'
});

// Promisify MySQL queries
const query = util.promisify(db.query).bind(db);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');

  // Insert data and fetch users using async/await
  insertAndFetch();
});

// Handle MySQL connection errors
// Handle MySQL connection errors
db.on('error', (err) => {
  console.error('MySQL database error:', err.message);
  // Attempt to reconnect on error
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    db.connect();
  } else {
    // throw err; // Corrected to throw err instead of error
    console.log("error");
  }
});


// Function to insert data into 'users' table and fetch users
async function insertAndFetch() {
  try {
    // Insert data into 'users' table
    await query(`INSERT INTO users (email, password) VALUES (?, ?)`, ['sample2@gmail.com', 'password123']);
    console.log('Data inserted into users table');

    // Fetch users from 'users' table
    const users = await query(`SELECT * FROM users`);
    console.log('Fetched users:', users);
  } catch (err) {
    console.error('Database query error:', err.message);
  } finally {
    db.end(); // Close the MySQL connection
  }
}

// Start the Express server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
