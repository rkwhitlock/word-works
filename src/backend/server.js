import cors from "cors";
import express from "express";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = new sqlite3.Database("./database.db");
const PORT = process.env.PORT || 8080;

// Configure CORS to allow requests from your Vercel domain
const corsOptions = {
  origin: [
    "https://word-works-rkwhitlocks-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files if available
app.use(express.static(path.join(__dirname, "build")));

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
      words.push(row.word);
    });

    res.json(words);
  });
});

app.post("/api/words", (req, res) => {
  console.log("Request body:", req.body);
  const { word, difficulty } = req.body;

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

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Fixed app.listen() call
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
