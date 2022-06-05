const mysql = require("mysql2");
require("dotenv").config();
const{DB_USER, DB_HOST, DB_NAME, DB_PASSWORD} = process.env;

const db = mysql.createConnection({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD
});

module.exports = {
  query: (sql, params)=>{
      return new Promise((resolve, reject) =>{
        db.query( sql, params, ( err, res ) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
      })
  }
}

