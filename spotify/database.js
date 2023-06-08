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

async function createUserinfo(username, userCreatedTime, tracksData){
    const conn = await connect();
    const sql = `INSERT INTO userinfo(username, lastdate, musicinfo) VALUES (?, ?, ?);`
    const values = [username, userCreatedTime, tracksData];
    return await conn.query(sql, values);
}

async function getUserInfo(username) {
    const conn = await connect();
    const sql = 'SELECT *FROM userinfo where username=?'
    const result = await conn.query(sql, username)
    return result[0][0];
}
async function updateUserInfo(username, tracksData) {
    const conn = await connect();
    const sql = `SELECT musicinfo FROM userinfo WHERE username = ?`;
    const [results] = await conn.query(sql, username);
    
    let tracks = results[0].musicinfo;
    
    tracksData.map((obj) => {
        tracks.push(obj)
    })


    const updateQuery = `UPDATE userinfo SET musicinfo = '${JSON.stringify(tracks)}' WHERE username = ?`;
    const res = await conn.query(updateQuery, username);

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

module.exports = {getPlaylistByYear, getPlaylists, createUserinfo, getUserInfo, updateUserInfo}