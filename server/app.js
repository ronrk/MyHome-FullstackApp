require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// PACKAGES
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");

const connectDB = require("./db/connectDB");

const { authenticateUser } = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHadnlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
/* app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
); */
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieparser(process.env.JWT_SECRET));
app.use(helmet());
app.use(cors());
app.use(xss());

const authRoute = require("./routes/auth-route");
const expanseRoute = require("./routes/expanse-route");
const taskroute = require("./routes/task-route");
const housesRoute = require("./routes/houses-route");
const userRoute = require("./routes/user-route");
const messageRoute = require("./routes/message-route");
const friendReqRoute = require("./routes/friendReq-route");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expanse", authenticateUser, expanseRoute);
app.use("/api/v1/task", authenticateUser, taskroute);
app.use("/api/v1/houses", authenticateUser, housesRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/friendRequest", friendReqRoute);

app.use(notFoundMiddleware);
app.use(errorHadnlerMiddleware);

const port = process.env.PORT || 5010;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port : ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
