import mongoose from "mongoose";
import "dotenv/config";

let URI = process.env.MONGO_URI;

const databaseConnecting = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.log("Mongoose faild to connect", error);
  }
};

export default databaseConnecting;
