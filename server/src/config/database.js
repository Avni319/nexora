import mongoose from "mongoose";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    console.error(
      "MongoDB Connection Failed: MONGODB_URI is not set. Add it in Render → Environment."
    );
    return false;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      });

      console.log("MongoDB Connected Successfully");
      return true;
    } catch (error) {
      console.error(`MongoDB Connection Failed (attempt ${attempt}/${MAX_RETRIES})`);
      console.error(error.message);

      if (attempt === MAX_RETRIES) {
        console.error(
          "Could not connect after retries. Check Atlas cluster URL, Network Access (0.0.0.0/0), and MONGODB_URI on Render."
        );
        return false;
      }

      await sleep(RETRY_DELAY_MS);
    }
  }

  return false;
};

export default connectDB;