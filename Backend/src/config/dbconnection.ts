import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.urwnf.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;

const clientOptions = { 
  dbName: process.env.DB_NAME,
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true } 
};
let mongoServer: MongoMemoryServer;

async function connectDB() {
  try {
      if (process.env.NODE_ENV === 'test') {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, clientOptions);
        console.log("You successfully connected to MongoDB!");
      } else {
        await mongoose.connect(URL, clientOptions);
        console.log("You successfully connected to MongoDB!");
      }
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    await mongoose.disconnect();
  }
}

export { connectDB,  mongoServer};