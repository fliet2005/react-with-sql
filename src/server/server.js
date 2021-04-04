const express = require("express");
const mysql = require("mysql");

const app = express();
// const port = 3001;
const table = "customers"; // users

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: "3306",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});
app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log(`App server now listening to port ${app.get("port")}`);
});

app.get("/api/test", (req, res) => {
  let queryString = `select * from ${table}`;
  pool.query(queryString, (err, rows, fields) => {
    // if (err) {
    //   res.send(err);
    // } else {
    //   // console.log(`${rows}`);
    //   res.send(rows);
    // }
    if (err) throw err;

    if (rows.length > 0) {
      res.json(
        rows.map((entry) => {
          const e = {};
          COLUMNS.forEach((c) => {
            e[c] = entry[c];
          });
          return e;
        })
      );
    } else {
      res.json([]);
    }
  });
});
