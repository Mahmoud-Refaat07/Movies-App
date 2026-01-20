import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

let URI = ENV_VARS.MONGO_URI;

const databaseConnecting = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.log("Mongoose faild to connect", error);
  }
};

export default databaseConnecting;
