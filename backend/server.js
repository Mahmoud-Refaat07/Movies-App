import express from "express";
import userRoutes from "./routes/user.routes.js";
import databaseConnecting from "./lib/database.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("server listening on port 5000");
  databaseConnecting();
});
