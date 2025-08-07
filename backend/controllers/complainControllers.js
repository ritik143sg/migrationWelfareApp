const Complain = require("../models/complainModel");

const getComplains = async (req, res) => {
  try {
    const complain = await Complain.find();

    res.json({
      msg: "got All Complains",
      complains: complain,
    });
  } catch (error) {
    res.json({
      msg: "Error",
      error: error.message,
    });
  }
};

module.exports = getComplains;
