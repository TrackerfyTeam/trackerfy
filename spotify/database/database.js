const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 5000,
    ssl: {
        rejectUnauthorized: false
    }
});

function getPlaylistId(x){
    connection.connect((err)=>{
      if (err) throw err;
      let sql = `SELECT idLink FROM idLink WHERE ano = ${x}`;
      connection.query(sql, function(err, res) {
          if (err) throw err;
          console.log(res);
      })     
    })
}

function getAcessToken(y) {
    connection.connect((err)=>{
        if(err) throw err;
        let sql2 = `SELECT actk FROM accesstokendb WHERE id = ${y}`;
        connection.query( sql2, function(err, res){
            if(err) throw err;
        })
    })
}

function insertData(actk, id){
    connection.connect((err)=>{
        if(err) throw err;
        let sql2 = `INSERT INTO accesstokendb(actk, id) VALUES ("${actk}", ${id});`
        connection.query( sql2, function(err, res){
            if(err) throw err;
        })
    })
}

function deleteData(w){
    connection.connect((err)=>{
        if(err) throw err;
        let sql3 = `DELETE FROM access_token WHERE access_token = '${w}'`
        connection.query(sql3,function(err,res){
            if(err) throw err;
        })
    })
}

module.exports = {insertData, deleteData, getPlaylistId, getAcessToken}