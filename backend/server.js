import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import databaseConnecting from "./utils/database.js";
import { ENV_VARS } from "./config/envVars.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/movie", protect, movieRoutes);
app.use("/api/tv", protect, tvRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  databaseConnecting();
});
