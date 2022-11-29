/* eslint-disable spaced-comment */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

//app config
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// !
app.use(morgan('dev'));
app.use(cookieParser());
// !
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

// Hozla Requests routes for admin
const hozlaAdminRequestsRouter = require("./routes/hozlaAdminRequests");
app.use("/hozlaAdminRequests", hozlaAdminRequestsRouter);

//user routes
const authRoutes = require("./routes/authentication/auth");
const userRoutes = require("./routes/authentication/users");
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// upload files
const fileuploaderRoutes = require("./routes/fileuploader/fileuploader");
app.use("/api", fileuploaderRoutes);


if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//to run type: npm run devStart
