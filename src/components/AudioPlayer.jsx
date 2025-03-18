// AudioPlayer.jsx
import React from "react";

const AudioPlayer = ({ word }) => {
  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[28];
    utterance.lang = "en-US";
    utterance.rate = 0.6; // Adjust speed for clearer pronunciation
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button
        onClick={playSound}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Play Sound
      </button>
    </div>
  );
};

export default AudioPlayer;
