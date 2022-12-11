const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const AnnualInfoAdminSchema = new mongoose.Schema(
  {
    // user_card_number: String,

    // order_maker_card_number: String,
    // hozlaRequestID: String,
    // numBeatsPerYear: { type: Number, default: 0 },
    // countPrintInDay: { type: Number, default: 0 },
    numPages: { type: Number, default: 1 },
    // numBeatsPerDay: { type: Number, default: 0 },
    // countPrintInYear: { type: Number, default: 0 },

    countPrintInYear: { type: Number, default: 0 },
    numBeatsColourful: { type: Number, default: 0 },
    sumBeatsBlackwhite: { type: Number, default: 0 },
    sumRequestInYear: { type: Number, default: 0 },
    unit: String,
    anaf: String,
    mador: String,

    status: { type: Number, default: 25 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnnualInfoAdmin", AnnualInfoAdminSchema);
