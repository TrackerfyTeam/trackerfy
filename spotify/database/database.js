const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.NAME
});
  
function conne(x){
    con.connect((err)=>{
      if (err) throw err;
      let sql = `SELECT link FROM links WHERE id = ${x}`;
      con.query(sql, function(err, res) {
          if (err) throw err;
          console.log(res);
      })     
    })
}

function insert(y){
    con.connect((err)=>{
        if(err) throw err;
        let sql2 = `INSERT INTO access_token(access_token) values('${y}')`
        con.query( sql2, function(err, res){
            if(err) throw err;
        })
    })
}

function deleted(z){
    con.connect((err)=>{
        if(err) throw err;
        let sql3 = `DELETE FROM access_token WHERE access_token = '${z}'`
        con.query(sql3,function(err,res){
            if(err) throw err;
        })
    })
}

module.exports = {conne, insert, deleted}