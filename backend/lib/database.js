import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

let URI = ENV_VARS.MONGO_URI;

const databaseConnecting = async () => {
  try {
    const connect = await mongoose.connect(URI);
    console.log("MongoDb connected ", connect.connection.host);
  } catch (error) {
    console.log("MongoDb faild to connect", error);
    process.exit(1);
  }
};

export default databaseConnecting;
