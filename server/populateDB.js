require("dotenv").config();

const mockData = require("./MOCK_DATA-expanse.json");

const Expanse = require("./models/Expanse");
const User = require("./models/User");
const Task = require("./models/Task");
const connectDB = require("./db/connectDB");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Expanse.create(mockData);
    console.log("success");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
