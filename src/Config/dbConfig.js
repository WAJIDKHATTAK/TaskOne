const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
// dotenv.config({path: "../../.env"});
dotenv.config({ path: path.join(__dirname, '../../.env') });
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected To Database Successfully.");
    } catch (error) {
      console.log("Error connecting to MongoDB:", error);
    }
  };
  
  module.exports = connectDB;