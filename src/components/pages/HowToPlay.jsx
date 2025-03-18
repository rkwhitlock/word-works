import React from "react";
import { Link } from "react-router-dom";

// Import your images
import backButtonImage from "../../assets/back-button.png"; // Replace with your image path
import howToPlayImage from "../../assets/how-to-play.png"; // Replace with your image path
import startButtonImage from "../../assets/start-button.png"; // Replace with your image path

const HowToPlayScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="text-center space-y-6">
        {/* How to Play Image */}
        <Link to="/">
          <img
            src={backButtonImage}
            alt="Back"
            className="w-20 cursor-pointer hover:opacity-80 transition-opacity absolute top-30 left-6"
          />
        </Link>

        {/* How to Play Image */}
        <img
          src={howToPlayImage}
          alt="How to Play"
          className="h-screen w-screen"
        />

        {/* Start Button using Link */}
        <Link to="/lessons">
          <img
            src={startButtonImage}
            alt="Start"
            className="w-70 mx-auto cursor-pointer hover:opacity-80 transition-opacity absolute right-10 bottom-14"
          />
        </Link>
      </div>
    </div>
  );
};

export default HowToPlayScreen;
