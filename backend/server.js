import express from "express";
import cors from "cors";
import connectDB from "./database/connectDB.js";
import todoRouter from "./routes/todoRouter.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORTNUMMER || 5000;

//
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello von Server!");
});

// CRUD - Routen
app.use("/todos", todoRouter);


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
