import axios from "axios";

export const fetchWords = async (difficulty) => {
  const API_URL =
    process.env.API_URL || "https://word-works-production.up.railway.app";
  try {
    const response = await axios.get(`${API_URL}/api/words/${difficulty}`);
    console.log("Fetched words:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching words:", error.message);
    throw error; // Throw the error so that it can be handled by the caller
  }
};
