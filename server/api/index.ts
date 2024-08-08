// Import the express in typescript file
import express from "express";
import dotenv from "dotenv";

// Initialize the dotenv
dotenv.config();

// Initialize the express engine
const app: express.Application = express();

// Take a port from .env for running server.
const port: number = Number(process.env.PORT);

// Handling '/' Request
app.get("/", (req, res) => {
  res.send("TypeScript With Express");
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});
