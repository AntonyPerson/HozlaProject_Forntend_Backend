const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const ToraHeilitSchema = new mongoose.Schema(
  {
    // user_card_number: String,
    numPages: { type: Number, default: 1 },
    toraHeilitVolumes: { type: Object },

    // personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToraHeilit", ToraHeilitSchema);
