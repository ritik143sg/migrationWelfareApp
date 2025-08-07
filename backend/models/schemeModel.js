const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    link: { type: String, required: true },
    StartDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Scheme = mongoose.model("Scheme", schemeSchema);

module.exports = Scheme;
