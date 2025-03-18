import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Feedback from "../components/Feedback";
import Navbar from "../components/Navbar";
import HomeScreen from "../components/pages/HomeScreen";
import HowToPlay from "../components/pages/HowToPlay";
import LessonSelection from "../components/pages/LessonSelection";
import LoginHandler from "../components/pages/LoginHandler";
import WordGame from "../components/pages/WordGame";
import Words from "../components/pages/Words";

const RouterComponent = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/lessons" element={<LessonSelection />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/lessons/words" element={<Words />} />
        <Route path="/lessons/:difficulty" element={<WordGame />} />
        <Route path="/login" element={<LoginHandler />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
    </HashRouter>
  );
};
export default RouterComponent;
