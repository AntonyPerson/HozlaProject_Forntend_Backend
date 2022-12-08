const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const HozlaAdminRequestSchema = new mongoose.Schema(
  {
    // user_card_number: String,
    // status: { type: Number, default: 50 },

    // order_maker_card_number: String,
    hozlaRequestID: String,
    anaf: String,
    sumColourfulPages: { type: Number, default: 0 },
    sumNoColourfulPages: { type: Number, default: 0 },
    numPages: { type: Number, default: 1 },
    numColourfulBeats: { type: Number, default: 0 },
    numNoColourfulBeats: { type: Number, default: 0 },
    selected: { type: String, default: 0 },
    selectedBW: { type: String, default: 0 },
    twoSides: { type: String, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HozlaAdminRequest", HozlaAdminRequestSchema);
