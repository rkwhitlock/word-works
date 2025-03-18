import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWords } from "../../api/wordApi";
import AudioPlayer from "../AudioPlayer";
import Feedback from "../Feedback";
import InputField from "../InputField";
import Score from "../Score";
import ErrorBoundary from "../error/ErrorComponent";

const WordGame = () => {
  const { difficulty } = useParams();
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchWords(difficulty)
      .then((data) => setWords(data))
      .catch((err) => console.error(err));
  }, [difficulty]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setFeedback("Correct!");
      setScore(score + 1);
      // Move to the next word
      setIndex(index + 1);
    } else {
      setFeedback(`Incorrect! Try again.`);
    }
    setUserInput("");
  };

  useEffect(() => {
    if (words.length > 0) {
      setCurrentWord(words[index]);
    }
  }, [index, words]);

  return (
    <div className="game-container bg-gradient-to-tl from-green-300 to-blue-200 p-6 rounded-lg text-center h-screen w-screen">
      <h1 className="text-2xl font-bold mb-4">Word Game</h1>
      <ErrorBoundary>
        <AudioPlayer word={currentWord} />
      </ErrorBoundary>

      {/* Input field and button */}
      <InputField
        value={userInput}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Show feedback */}
      <Feedback message={feedback} />

      {/* Display score */}
      <Score score={score} />
    </div>
  );
};

export default WordGame;
