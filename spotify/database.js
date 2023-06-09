const mysql = require('mysql2/promise');
require('dotenv').config();

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection
    }

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectTimeout: 5000,
        ssl: {
            rejectUnauthorized: false
        }
    });

    global.connection = connection;
    return connection
}

async function getPlaylistByYear(year) {
    const conn = await connect();
    const sql = 'SELECT *FROM idLink where ano=?;'
    const result = await conn.query(sql, year);
    return result[0][0].idlink;
}

async function getPlaylists() {
    const conn = await connect();
    const sql = 'SELECT ano FROM idLink;'
    const result = await conn.query(sql);
    return result[0]; 
}

module.exports = {getPlaylistByYear, getPlaylists}