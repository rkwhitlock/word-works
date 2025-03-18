import axios from "axios";
import React, { useEffect, useState } from "react";
import LogoutButton from "../assets/LogoutButton";

const DatabaseEditor = ({ onLogout }) => {
  const [wordsByDifficulty, setWordsByDifficulty] = useState({});
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [newWord, setNewWord] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("");
  const [customDifficulty, setCustomDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    process.env.API_URL || "https://word-works-production.up.railway.app/";

  // Fetch all words on component mount
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/words`);
      setWordsByDifficulty(response.data);
      setDifficulties(Object.keys(response.data).sort());
      setIsLoading(false);

      // Set default selected difficulty if none is selected
      if (Object.keys(response.data).length > 0 && !selectedDifficulty) {
        setSelectedDifficulty(Object.keys(response.data)[0]);
      }
    } catch (err) {
      console.error("Error fetching words:", err);
      setError("Failed to load words from the server");
      setIsLoading(false);
    }
  };

  const handleAddWord = async () => {
    if (!newWord.trim()) {
      setStatus("Please enter a word");
      return;
    }

    let difficulty = newDifficulty;

    // If custom difficulty is selected, use the custom input
    if (newDifficulty === "custom" && customDifficulty.trim()) {
      difficulty = customDifficulty.trim();
    }

    if (!difficulty) {
      setStatus("Please select or enter a difficulty level");
      return;
    }

    const word = newWord.trim().toLowerCase();

    try {
      setStatus("Adding word...");
      // Replace with your API endpoint for adding words
      await axios.post(
        `${API_URL}/api/words`,
        {
          word: word,
          difficulty: difficulty,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("HSDKHJGFJKSDFG");

      setNewWord("");
      setStatus("Word added successfully!");
      fetchWords(); // Refresh the word list
    } catch (err) {
      console.error("Error adding word:", err);
      setStatus("Failed to add word");
    }
  };

  const handleDeleteWord = async (word, difficulty) => {
    try {
      setStatus("Deleting word...");
      // Replace with your API endpoint for deleting words
      await axios.delete(`${API_URL}/api/words`, {
        data: { word, difficulty },
      });

      setStatus("Word deleted successfully!");
      fetchWords(); // Refresh the word list
    } catch (err) {
      console.error("Error deleting word:", err);
      setStatus("Failed to delete word");
    }
  };

  const handleEditWord = async (oldWord, newWord, difficulty) => {
    if (!newWord.trim()) return;

    try {
      setStatus("Updating word...");
      // Replace with your API endpoint for updating words
      await axios.put(`${API_URL}/api/words`, {
        oldWord,
        newWord: newWord.trim().toLowerCase(),
        difficulty,
      });

      setStatus("Word updated successfully!");
      fetchWords(); // Refresh the word list
    } catch (err) {
      console.error("Error updating word:", err);
      setStatus("Failed to update word");
    }
  };

  // Clear status message after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen min-w-screen bg-green-50 p-4 text-gray-600">
      <header className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">
            Word Works Database Editor
          </h1>
          <LogoutButton onLogout={onLogout} />
          <div className="text-gray-600">Welcome, Christian</div>
        </div>
      </header>

      {status && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            status.includes("Failed")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
          <button onClick={fetchWords} className="ml-4 underline">
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Difficulty List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Difficulty Levels</h2>

          {isLoading ? (
            <p className="text-center py-4">Loading difficulty levels...</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {difficulties.length > 0 ? (
                difficulties.map((difficulty) => (
                  <div
                    key={difficulty}
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedDifficulty === difficulty
                        ? "bg-green-100 border-green-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    <span className="font-medium">{difficulty}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({wordsByDifficulty[difficulty]?.length || 0} words)
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No difficulty levels found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Word List */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {selectedDifficulty
                ? `Words - ${selectedDifficulty}`
                : "Select a difficulty level"}
            </h2>
          </div>

          {selectedDifficulty && (
            <>
              <div className="border rounded-md p-2 mb-4 max-h-96 overflow-y-auto">
                {wordsByDifficulty[selectedDifficulty]?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {wordsByDifficulty[selectedDifficulty].map((word) => (
                      <div
                        key={word}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="mr-2">{word}</span>
                        <button
                          onClick={() =>
                            handleDeleteWord(word, selectedDifficulty)
                          }
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Delete word"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No words at this difficulty level.
                  </p>
                )}
              </div>

              <h3 className="font-medium mb-2">Add New Word</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a new word..."
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-l-md"
                />
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                  className="p-2 border-t border-b border-gray-300"
                >
                  <option value="">Select difficulty</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                  <option value="custom">Custom...</option>
                </select>
                {newDifficulty === "custom" && (
                  <input
                    type="text"
                    placeholder="Custom difficulty..."
                    value={customDifficulty}
                    onChange={(e) => setCustomDifficulty(e.target.value)}
                    className="p-2 border-t border-b border-r border-gray-300 w-40"
                  />
                )}
                <button
                  onClick={handleAddWord}
                  disabled={
                    !newWord.trim() ||
                    (!newDifficulty && newDifficulty !== "custom") ||
                    (newDifficulty === "custom" && !customDifficulty.trim())
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 disabled:bg-green-300"
                >
                  Add
                </button>
              </div>
            </>
          )}

          {!selectedDifficulty && !isLoading && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <p>Select a difficulty level to view and edit words</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <p>Loading words...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseEditor;
