import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";

const envFile = path.resolve(__dirname, "../.env")
dotenv.config({ path: envFile });