import express from "express";
import userRoutes from "./routes/user.routes.js";
import databaseConnecting from "./lib/database.js";
import { ENV_VARS } from "./config/envVars.js";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  databaseConnecting();
});
