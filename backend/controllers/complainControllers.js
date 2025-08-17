const Complain = require("../models/complainModel");

const getComplains = async (req, res) => {
  try {
    const complains = await Complain.find()
      .populate("userId", "phone") // only get phone from user
      .sort({ createdAt: -1 });

    res.status(200).json({
      msg: "Got All Complains",
      complains: complains,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

module.exports = getComplains;
