const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'electrondb'
});

function getConnection() {
    console.log('Connected!');
    return connection;
}

module.exports = {
    getConnection
}