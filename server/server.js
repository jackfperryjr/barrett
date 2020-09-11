const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");

const router = require("./router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db
db.serialize(() => {
  db.run(
    "CREATE TABLE Friends (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, activity TEXT, type TEXT)"
  );

  // seed
  db.serialize(() => {
    db.run(
      'INSERT INTO Friends (name, email, activity, type) VALUES ("Tim Bogart", "tbogart@gmail.com", "Learn the periodic table", "education"), ' +
        '("Sally Washburn", "sally12345678@gmail.com", "Learn how to iceskate or rollerskate", "recreational"), ' +
        '("John Stone", "jstone86754321@gmail.com", "Write a note of appreciation to someone", "social")'
    );
  });
});

// router
app.use("/api/friends", router);

const listener = app.listen(3001, () => {
  console.log("Express server is listening on port ", listener.address().port);
});

module.exports = app;
