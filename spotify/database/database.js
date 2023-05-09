const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 5000,
    ssl: {
        ca: fs.readFileSync('/Users/CycleWs/Desktop/DigiCertGlobalRootCA.crt.pem')
      }
});

function getPlaylistId(x){
    connection.connect((err)=>{
      if (err) throw err;
      let sql = `SELECT link FROM links WHERE id = ${x}`;
      connection.query(sql, function(err, res) {
          if (err) throw err;
          console.log(res);
      })     
    })
}

function insertData(y){
    connection.connect((err)=>{
        if(err) throw err;
        let sql2 = `INSERT INTO accesstokendb(actk) VALUES ("${y}");`
        connection.query( sql2, function(err, res){
            if(err) throw err;
        })
    })
}

function deleteData(z){
    connection.connect((err)=>{
        if(err) throw err;
        let sql3 = `DELETE FROM access_token WHERE access_token = '${z}'`
        connection.query(sql3,function(err,res){
            if(err) throw err;
        })
    })
}

module.exports = {insertData, deleteData, getPlaylistId}