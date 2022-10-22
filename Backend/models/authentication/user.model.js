const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    personalnumber: { type: String, trim: true, unique: true, required: true },
    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastLame: { type: String, trim: true, required: true },
    admin: { type: String, default: "0" }, // 0-not admin, 1-admin with edit permissons,2-admin without edit permissons
    unit: String,
    anaf: String,
    mador: String,
    phoneNumber: String,
    email: {
      type: String,
      lowercase: true,
    },
    holzlaRequest: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
