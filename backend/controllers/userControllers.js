const { encryptPassword, comparePassword } = require("../middleware/bcrypt");
const { genToken } = require("../middleware/jwt");
const Complain = require("../models/complainModel");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const password = await encryptPassword(user.password);

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: password,
      phone: user.phone,
      address: user.address,
      pincode: user.pincode,
    });

    await newUser.save();

    res.status(201).json({
      msg: "User Added",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

const authentication = async (req, res) => {
  const user = req.body;

  try {
    const newUser = await User.findOne({ email: user.email });

    if (!newUser) {
      res.status(500).json({
        msg: "User Not Found",
      });
    }

    if (!(await comparePassword(user.password, newUser.password))) {
      res.status(500).json({
        msg: "Password Miss Match",
      });
    }

    const token = genToken(newUser, "user");

    res.status(201).json({
      msg: "User Login",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

const addComplain = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    const newComplain = new Complain({
      title: data.title,
      message: data.msg,
      userId: user._id,
    });

    await newComplain.save();

    res.status(201).json({
      msg: "Complain Added",
      complain: newComplain,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};
const updatePassword = async (req, res) => {
  const user = req.user;
  const updatePassword = req.body;

  try {
    const DBuser = await User.findOne({ _id: user._id });

    if (!(await comparePassword(updatePassword.oldPassword, DBuser.password))) {
      return res.status(400).json({ msg: "Password Mismatch" });
    }

    const hashedPassword = await encryptPassword(updatePassword.newPassword);

    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    await updatedUser.save();

    res.status(200).json({ msg: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  const user = req.user;

  try {
    const newUser = await User.findOne({
      _id: user._id,
    });

    res.status(201).json({
      msg: "User Details",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const NewUsers = await User.find();

    res.status(201).json({
      msg: "All User",
      Users: NewUsers,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const user = req.user;
  const profile = req.body;

  try {
    const updatedUser = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          username: profile.username,
          phoneNumber: profile.phoneNumber,
          address: profile.address,
          pincode: profile.pincode,
        },
      }
    );

    await updatedUser.save();

    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getComplain = async (req, res) => {
  const user = req.user;

  try {
    const newComplain = await Complain.findAll({
      _id: user._id,
    });

    res.status(201).json({
      msg: "All Complains",
      complains: newComplain,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

const getAllComplains = async (req, res) => {
  const user = req.user;

  try {
    const newComplain = await Complain.find();

    res.status(201).json({
      msg: "All Complains",
      complains: newComplain,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  authentication,
  addComplain,
  getComplain,
  updatePassword,
  updateProfile,
  getAllUser,
  getUserDetails,
  getAllComplains,
};
