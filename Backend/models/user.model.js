const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    personalnumber: { type: String, trim: true, unique: true, required: true },
    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastLame: { type: String, trim: true, required: true },
    admin: { type: Boolean, default: false },
    unit: String,
    anaf: String,
    mador: String,
    phoneNumber: String,
    email: {
      type: String,
      lowercase: true,
    },
    holzlaRequest: [mongoose.SchemaTypes.ObjectId],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
