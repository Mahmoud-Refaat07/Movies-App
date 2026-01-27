import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
    );
    if (response.results.length === 0) {
      res.status(404).json({ message: "Not Found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error in serachPerson endpoint");
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    );

    if (response.results.length === 0) {
      res.status(404).json({ message: "Not Found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error in searchMovie endpoint");
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    );

    if (response.results.length === 0) {
      res.status(404).json({ message: "Not Found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error in searchTv endpoint");
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in get history endpoint");
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({ message: "Item removed from search history" });
  } catch (error) {
    console.log("Error in remove item from search history");
    res.status(500).json({ message: "Server Error" });
  }
};
