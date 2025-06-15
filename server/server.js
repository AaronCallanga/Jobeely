const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Ensures compatibility with modern MongoDB connection string
    useUnifiedTopology: true, // Provides improved server discovery and monitoring
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: " + err));

 server = app.listen(process.env.PORT, () => {
  console.log("Server Started: " + process.env.PORT);
  console.log("Environment: " + process.env.NODE_ENV);
});
