
const mysql = require('mysql');
const { promisify } = require('util');

const database = {
    host: '149.91.92.4',
    user: 'user_telmi',
    password: 'Telecom2023',
    database: 'telmi',
    port: '3306'
}

const pool = mysql.createPool(database);
  
pool.getConnection((err, connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('DATABASE CONNECTION WAS CLOSED');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        if (err.code === 'ECONNREFUSED')
            console.error('DATABASE CONNECTION WAS REFUSED');
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return
});
  
// Promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;