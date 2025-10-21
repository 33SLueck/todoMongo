import express from "express";
import cors from "cors";
import connectDB from "./database/connectDB.js";
import todoRouter from "./routes/todoRouter.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//
app.use(cors());
app.use(express.json());

// CRUD - Routen
app.use("/todos", todoRouter);

// Serve frontend static files (will be copied to ./public by the build script)
import path from "path";
const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

// SPA fallback: send index.html for non-API GET requests
// Use a regex to match all GET routes that are not API routes to avoid issues with path-to-regexp
app.get(/.*/, (req, res, next) => {
  // allow API routes to continue
  if (req.path.startsWith("/todos") || req.path.startsWith("/api")) return next();
  res.sendFile(path.join(publicPath, "index.html"));
});
const port = process.env.PORT || process.env.PORTNUMMER || 5000;


const startServer = async () => {
  try {
    // Verbindung zur Datenbank herstellen
    await connectDB(process.env.MONGO_URL);
    console.log("Datenbank verbunden");

    //
    app.listen(port, () => {
      console.log(`Server läuft auf http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Server starten
startServer();
