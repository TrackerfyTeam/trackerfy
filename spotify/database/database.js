const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
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
        let sql2 = `INSERT INTO access_token(access_token) values('${y}')`
        con.query( sql2, function(err, res){
            if(err) throw err;
        })
    })
}

function deleteData(z){
    connection.connect((err)=>{
        if(err) throw err;
        let sql3 = `DELETE FROM access_token WHERE access_token = '${z}'`
        con.query(sql3,function(err,res){
            if(err) throw err;
        })
    })
}

module.exports = {insertData, deleteData, getPlaylistId}