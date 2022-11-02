const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema(
  {
    collec: {
      type: String,
      required: false,
    },
    item_id: {
      type: String,
      required: false,
    },
    files: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MultipleFile", mulitipleFileSchema);
