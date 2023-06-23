
const mysql = require('mysql');

const database = {
    host: '127.0.0.1',
    user: 'root',
    password: '04863013P',
    database: 'organizador_tareas',
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
  

module.exports = pool;