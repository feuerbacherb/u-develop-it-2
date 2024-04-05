const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
const db = new sqlite3.Database("./db/election.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Connected to the election database.");
});

// default response for any other requires (Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});

// start server after DB connection
db.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
