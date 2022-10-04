// const mongoose = require("mongoose");
// const RegularUser = require("./models/authentication/RegularUser");
// const HozlaRequest = require("./HozlaRequest");

// mongoose.connect(
//   "mongodb://localhost/HozlaDB",
//   () => {
//     console.log("Connected to HozlaDB");
//   },
//   (e) => console.error(e + "\nerror happend while trying to connect to HozlaDB")
// );

// //option 1 without a function
// // const testUser = new RegularUser({
// //     personalNumber: "1234567",
// //     name: "Test",
// //     unit: "Mekatnar",
// //     anaf: "Ton",
// //     mador: "NG",
// //     phoneNumber: "0123456789 ",
// //   });
// // testUser.save().then(() => console.log("User was Saved"));

// //option 2 with a function
// run();

// async function run() {
//   try {
//     //option 1
//     // const testUser = new RegularUser({
//     //     personalNumber: "1234567",
//     //     name: "Test",
//     //     unit: "Mekatnar",
//     //     anaf: "Ton",
//     //     mador: "NG",
//     //     phoneNumber: "0123456789 ",
//     //   });

//     // await testUser.save()

//     //oprion 2
//     const testUser = await RegularUser.create({
//       personalNumber: "1234567",
//       name: "Test",
//       unit: "Mekatnar",
//       anaf: "Ton",
//       mador: "NG",
//       phoneNumber: "0123456789 ",
//     });

//     console.log(testUser);
//     const testRequest = new HozlaRequest({
//       User: testUser,
//     });
//     await testRequest.save();
//     console.log(testRequest);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// const RegularUser = require("./models/authentication/RegularUser");
// const HozlaRequest = require("./models/Forms/HozlaRequest");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ----------------DB------------------------

mongoose.connect("mongodb://localhost:27017/HozlaDB");

const HozlaRequestSchema = new mongoose.Schema({
  // User: RegularUser,
  unit: String,
  anaf: String,
  mador: String,
  phoneNumber: String,
  workName: String,
  workClearance: String,
  bindingType: String,
  bindingTypeOther: String,
  copyType: String,
  pageType: String,
  numOfCopyies: Number,
  fullNameAsker: String,
  workGivenDate: { type: Date, default: () => Date.now() },
  fullNameReciver: String,
  workRecivedDate: Date,
  files: [String],
  status: String,
});

module.exports = mongoose.model("HozlaRequest", HozlaRequestSchema);

//----------------------------------------

// app.get("/", function(req, res){

//   Post.find({}, function(err, foundPosts){
//     if(!err)
//     {
//       res.render("home",{
//         startingContent: homeStartingContent,
//         posts: foundPosts
//       });
//     }
//   });
// });

// app.get("/about", function(req, res){
//   res.render("about",{
//     aboutContent: aboutContent
//   });
// });

// app.get("/contact", function(req, res){
//   res.render("contact",{
//     contactContent: contactContent
//   });
// });

// app.get("/compose", function(req, res){
//   res.render("compose");
// });
app.get('/',(req, res) => {res.render("hozlaPrintRequestForm")})
app.post("/sendHozlaRequest", function (req, res) {
  const post = new HozlaRequest({
    // User: RegularUser,
    unit: req.body.unit,
    // anaf: req.body.anaf,
    // mador: req.body.mador,
    // phoneNumber: req.body.phoneNumber,
    // workName: req.body.workName,
    // workClearance: req.body.workClearance,
    // bindingType: req.body.bindingType,
    // bindingTypeOther: req.body.bindingTypeOther,
    // copyType: req.body.copyType,
    // pageType: req.body.pageType,
    // numOfCopyies: req.body.numOfCopyies,
    // fullNameAsker: req.body.fullNameAsker,
    // workGivenDate: req.body.workGivenDate,
    // fullNameReciver: req.body.fullNameReciver,
    // workRecivedDate: req.body.workRecivedDate,
    // files: req.body.files,
    // status: "Sent",
  });

  post.save();
});

// app.get("/posts/:postID", function(req, res){
//   console.log(req.params.postID);

//   Post.findById(req.params.postID, function(err, foundPost){
//     if(!err){
//       res.render("post",{
//         postTitle: foundPost.title,
//         postContent: foundPost.content
//       });
//     }
//   });
// });

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
