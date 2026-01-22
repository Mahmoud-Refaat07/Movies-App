import express from "express";
import {
  movieDetails,
  MoviesByCategories,
  movieTrailers,
  similarMovies,
  trendingMovie,
} from "../controllers/movie.controllers.js";

const router = express.Router();

router.get("/trending", trendingMovie);
router.get("/:category", MoviesByCategories);
router.get("/:id/trailers", movieTrailers);
router.get("/:id/details", movieDetails);
router.get("/:id/similar", similarMovies);

export default router;
