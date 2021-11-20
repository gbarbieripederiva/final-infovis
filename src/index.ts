// Setup env variables at the start of the program
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "config.env") });
dotenv.config({ path: path.join(__dirname, "..", "default.config.env") });

import express from "express";
import ApiRoute from "./routes/ApiRoute";

// Setup express
const app = express();
const PORT = parseInt(process.env.PORT || "8080");

// Setup routes
app.use("/api", ApiRoute);
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(PORT, () => {
    console.log("Server starting in port " + PORT + "...");
});
