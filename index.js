const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
// main app initialization
const app = express();
dotenv.config();

// mongodb connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected...");
  }
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// app listenning ...
app.listen(5000, () => {
  console.log("backend server is running on port 5000");
});
