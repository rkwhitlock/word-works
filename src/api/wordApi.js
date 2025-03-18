import axios from "axios";

export const fetchWords = async (level) => {
  try {
    const response = await axios.get(
      `http://word-works-production.up.railway.app/api/words/${level}`
    );
    console.log("Fetched words:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching words:", error.message);
    throw error; // Throw the error so that it can be handled by the caller
  }
};
