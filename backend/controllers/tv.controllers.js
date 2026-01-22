import { fetchFromTMDB } from "../services/tmdb.service.js";

export const trendingTv = async (req, res) => {
  try {
    const tv = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    );
    const randomTv = tv.results[Math.floor(Math.random() * tv.results?.length)];

    console.log(randomTv);

    res.json({ message: "Fetching Successed", movie: randomTv });
  } catch (error) {
    console.log("Failed to fetch tv" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const tvsByCategories = async (req, res) => {
  const { category } = req.params;
  try {
    const tv = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
    );

    res.json({ message: "Fetching Successed", tv });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch tv" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const tvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const trailer = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
    );

    res.json({ message: "Fetching successed", tvTrailers: trailer.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch tv trailer" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const tvDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const tvDetails = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    );

    res.json({
      message: "Fetching Successed",
      tvDetails,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch tv details" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const similarTvs = async (req, res) => {
  const { id } = req.params;

  try {
    const similarTv = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
    );

    res.json({
      message: "Fetching Successed",
      similarMovies: similarTv.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch similar tvs" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
