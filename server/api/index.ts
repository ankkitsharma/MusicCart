// Import the express in typescript file
import express, { NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import pool from "../dbConfig";
import { CustomError } from "../error";
import authRouter from "../routes/authRouter";
import cookieParser from "cookie-parser";

// Initialize the dotenv
config();

// Initialize the express engine
const app: express.Application = express();

// Enable cors middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);

// Take a port from .env for running server.
const port: number = Number(process.env.PORT);

// Test pool connection with DB
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgresSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database at:", res.rows[0].now);
  }
});

// Handling '/' Request
app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});
