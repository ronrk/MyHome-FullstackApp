require("dotenv").config();
require("express-async-errors");
const path = require("path");
// console.log(path.resolve(__dirname, "../", "client"));

const express = require("express");
const app = express();

const connectDB = require("./db/connectDB");

const authenticatedMiddleware = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHadnlerMiddleware = require("./middleware/error-handler");

const authRoute = require("./routes/auth-route");
const expanseRoute = require("./routes/expanse-route");
const taskroute = require("./routes/task-route");

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expanse", authenticatedMiddleware, expanseRoute);
app.use("/api/v1/task", authenticatedMiddleware, taskroute);

app.use(notFoundMiddleware);
app.use(errorHadnlerMiddleware);

const port = 5010 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port : ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
