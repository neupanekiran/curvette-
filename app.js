// Importing required modules
const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root', // Replace with your database username
  password: 'root', // Replace with your database password
  database: 'login', // Replace with your database name
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Example query
connection.query('SELECT * FROM your_table', (err, rows) => {
  if (err) throw err;

  console.log('Data received from database:');
  console.log(rows);
});

// Close the connection
connection.end((err) => {
  if (err) {
    console.error('Error closing database connection: ' + err.stack);
    return;
  }
  console.log('Database connection closed.');
});
