import axios from "axios";

// no uso el sample.json porque hay muchas url caidas y no se muestran
const API_URL =
  "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.entries;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
