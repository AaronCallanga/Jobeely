import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import fs from "fs";
import path from "path";

dotenv.config();

let server;

// Catches synchronous, unexpected errors like referencing an undefined variable.
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!!! 💣 Shutting down...");
  console.log(err.name, err.message, err);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Catches errors from promises that aren't caught with .catch() or try/catch
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection!!! 💥 Server Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});

const uploadDir = path.join("public", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // ✅ Create nested folders if needed
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Ensures compatibility with modern MongoDB connection string
    useUnifiedTopology: true, // Provides improved server discovery and monitoring
  })
  .then(() => console.log(`Database connected at ${process.env.MONGO_URI}`))
  .catch((err) => console.log("Database connection error: " + err));

 server = app.listen(process.env.PORT, () => {
  console.log("Server Started: http://localhost:" + process.env.PORT);
  console.log("Environment: " + process.env.NODE_ENV);
});
