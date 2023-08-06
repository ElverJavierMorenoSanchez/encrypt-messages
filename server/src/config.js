import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 9000;
export const PROJECT_ID = process.env.PROJECT_ID;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const MONGO_URI = process.env.MONGO_URI;
