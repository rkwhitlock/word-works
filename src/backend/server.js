// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 5001;

const db = new sqlite3.Database("./database.db");

app.get("/api/words", (req, res) => {
  const selectQuery = `
    SELECT word, difficulty FROM words
  `;

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error("Error fetching words:", err.message);
      return res.status(500).json({ error: "Failed to fetch words" });
    }

    const wordsByDifficulty = {};

    rows.forEach((row) => {
      if (!wordsByDifficulty[row.difficulty]) {
        wordsByDifficulty[row.difficulty] = [];
      }
      wordsByDifficulty[row.difficulty].push(row.word);
    });

    res.json(wordsByDifficulty);
  });
});
app.get("/api/words/:difficulty", (req, res) => {
  const { difficulty } = req.params;
  const selectQuery = `
    SELECT word, difficulty FROM words WHERE difficulty = ?
  `;

  db.all(selectQuery, [difficulty], (err, rows) => {
    if (err) {
      console.error("Error fetching words:", err.message);
      return res.status(500).json({ error: "Failed to fetch words" });
    }

    const words = [];

    rows.forEach((row) => {
      if (!words[row.difficulty]) {
        words[row.difficulty] = [];
      }
      words.push(row.word);
    });

    res.json(words);
  });
});

// Add a new word
app.post("/api/words", (req, res) => {
  console.log("SDKJFLKDS", req.body);
  const { word, difficulty } = req.body;
  console.log("????");

  if (!word || !difficulty) {
    return res.status(400).json({ error: "Word and difficulty are required" });
  }

  const insertQuery = `
    INSERT INTO words (word, difficulty) VALUES (?, ?)
  `;

  db.run(insertQuery, [word, difficulty], function (err) {
    if (err) {
      console.error("Error adding word:", err.message);
      return res.status(500).json({ error: "Failed to add word!!" });
    }

    res.status(201).json({ id: this.lastID, word, difficulty });
  });
});

// Update an existing word
app.put("/api/words", (req, res) => {
  const { oldWord, newWord, difficulty } = req.body;

  if (!oldWord || !newWord || !difficulty) {
    return res
      .status(400)
      .json({ error: "Old word, new word, and difficulty are required" });
  }

  const updateQuery = `
    UPDATE words SET word = ? WHERE word = ? AND difficulty = ?
  `;

  db.run(updateQuery, [newWord, oldWord, difficulty], function (err) {
    if (err) {
      console.error("Error updating word:", err.message);
      return res.status(500).json({ error: "Failed to update word" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.json({ word: newWord, difficulty });
  });
});

// Delete a word
app.delete("/api/words", (req, res) => {
  const { word, difficulty } = req.body;

  if (!word || !difficulty) {
    return res.status(400).json({ error: "Word and difficulty are required" });
  }

  const deleteQuery = `
    DELETE FROM words WHERE word = ? AND difficulty = ?
  `;

  db.run(deleteQuery, [word, difficulty], function (err) {
    if (err) {
      console.error("Error deleting word:", err.message);
      return res.status(500).json({ error: "Failed to delete word" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.json({ message: "Word deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
