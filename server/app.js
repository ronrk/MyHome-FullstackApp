require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connectDB");
const authenticatedMiddleware = require("./middleware/authentication");

const notFoundMiddleware = require("./middleware/not-found");
const errorHadnlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
/* app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
); */
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const authRoute = require("./routes/auth-route");
const expanseRoute = require("./routes/expanse-route");
const taskroute = require("./routes/task-route");
const housesRoute = require("./routes/houses-route");
const userRoute = require("./routes/user-route");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expanse", authenticatedMiddleware, expanseRoute);
app.use("/api/v1/task", authenticatedMiddleware, taskroute);
app.use("/api/v1/houses", authenticatedMiddleware, housesRoute);
app.use("/api/v1/user", authenticatedMiddleware, userRoute);

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
