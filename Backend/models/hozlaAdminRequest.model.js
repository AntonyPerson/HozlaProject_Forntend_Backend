const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const HozlaAdminRequestSchema = new mongoose.Schema(
    {
        user_card_number: String,
        // unit: String,
        // anaf: String,
        // mador: String,
        // phoneNumber: String,
        // workName: String,
        // workClearance: String,
        // bindingType: String,
        // bindingTypeOther: { type: String, default: "" },
        // copyType: String,
        // pageType: String,
        // numOfCopyies: Number,
        // fullNameAsker: String,
        // workGivenDate: { type: Date, default: () => Date.now() },
        // fullNameReciver: String,
        // workRecivedDate: Date,
        // files: [String],
        status: { type: Number, default: 50 },


        order_maker_card_number: String,

        sumColourfulPages: Number,
        sumNoColourfulPages: Number,
        numPages: Number,
        numColourfulBeats: Number,
        numNoColourfulBeats: Number,
        selected: String,
        selectedBW: String,
        twoSides: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("HozlaAdminRequest", HozlaAdminRequestSchema);

