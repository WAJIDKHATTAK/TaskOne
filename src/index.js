//Packages
const express = require("express");
const app = express();
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const httpStatus = require("http-status");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const AuthRoutes = require('./Routes/authRoutes');
const UserRoutes = require('./Routes/userRoutes');
dotenv.config({ path: "../.env" });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(compression());
//DB
const connectDB = require("./Config/dbConfig");
//Routes
app.use("/api/v1/users", UserRoutes , AuthRoutes);
//Connection
const start = async () => {
  try {
    await connectDB();
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is Listening at ${process.env.PORT}...`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("Closing server gracefully...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
