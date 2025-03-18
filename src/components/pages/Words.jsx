import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Words = () => {
  const [wordGroups, setWordGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/words`)
      .then((response) => {
        setWordGroups(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 h-screen w-screen bg-gradient-to-tl from-fuchsia-300 to-blue-200 justify-center text-center text-amber-700">
      <h1 className="text-3xl font-bold mb-4">Choose a Difficulty Level:</h1>
      <ul className="list-disc pl-6 ">
        {Object.keys(wordGroups).map((difficulty) => (
          <Link key={difficulty} className="mb-4" to={`/lessons/${difficulty}`}>
            <h2 className="text-2xl font-semibold mb-2">{difficulty}</h2>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Words;
