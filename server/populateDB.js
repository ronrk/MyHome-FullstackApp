require("dotenv").config();

const mockData = require("./MOCK_DATA.json");

const Expanse = require("./models/Expanse");
const User = require("./models/User");
const connectDB = require("./db/connectDB");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await User.create(mockData);
    console.log("success");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
