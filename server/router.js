const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/", (_, response) => {
  db.all("SELECT * FROM Friends", (err, rows) => {
    response.send(rows);
  });
});

router.put("/:friendId", (request, response) => {
  /** Step 3: Persist updated friend data to the database here.
   * For reference:
   * https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
   */
});

module.exports = router;