import express from "express";
import {
  similarTvs,
  trendingTv,
  tvDetails,
  tvsByCategories,
  tvTrailers,
} from "../controllers/tv.controllers.js";

const router = express.Router();

router.get("/trending", trendingTv);
router.get("/:category", tvsByCategories);
router.get("/:id/trailers", tvTrailers);
router.get("/:id/details", tvDetails);
router.get("/:id/similar", similarTvs);

export default router;
