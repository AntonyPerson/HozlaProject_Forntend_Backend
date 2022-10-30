/* eslint-disable spaced-comment */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");

require("dotenv").config();

//app config
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // to acsses the uploades folder in the server
// Configure Mongo
// const dbUrl = "mongodb://localhost/HozlaDB";
const dbUrl = process.env.DB_URL;

// Connect to Mongo with Mongoose
// Connect to Mongo with Mongoose
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.log(err));

//Hozla Requests routes
const hozlaRequestsRouter = require("./routes/hozlaRequests");
app.use("/hozlaRequests", hozlaRequestsRouter);

//user routes
const authRoutes = require("./routes/authentication/auth");
const userRoutes = require("./routes/authentication/users");
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//to run type: npm run devStart
