import { fetchFromTMDB } from "../services/tmdb.service.js";

export const trendingMovie = async (req, res) => {
  try {
    const movie = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    );
    const randomMovie =
      movie.results[Math.floor(Math.random() * movie.results?.length)];

    res.json({ message: "Fetching Successed", movie: randomMovie });
  } catch (error) {
    console.log("Failed to fetch movie" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const moviesByCategories = async (req, res) => {
  const { category } = req.params;
  try {
    const movie = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    );

    res.json({ message: "Fetching Successed", movie });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch movie" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const movieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const trailer = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    );

    res.json({ message: "Fetching successed", movieTrailler: trailer.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch movie trailer" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const movieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const movieDetails = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );

    res.json({
      message: "Fetching Successed",
      movieDetails: movieDetails,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch movie details" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const similarMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const similarMovies = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    );

    res.json({ message: "Fetching Successed", similarMovies });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found" });
    }
    console.log("Failed to fetch similar movies" + error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
