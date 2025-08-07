const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    typeValue: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    otpValue: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
