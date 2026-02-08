import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";
import databaseConnecting from "./utils/database.js";
import cors from "cors";
import { ENV_VARS } from "./config/envVars.js";
import { protect } from "./middlewares/auth.middleware.js";
import path from "path";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes);
app.use("/api/movie", protect, movieRoutes);
app.use("/api/tv", protect, tvRoutes);
app.use("/api/search", protect, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  databaseConnecting();
});
