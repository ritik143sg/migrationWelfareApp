const { encryptPassword, comparePassword } = require("../middleware/bcrypt");
const { genToken } = require("../middleware/jwt");
const Admin = require("../models/adminModel");
const Notification = require("../models/notificationModel");
const Scheme = require("../models/schemeModel");
const User = require("../models/userModel");

const registerAdmin = async (req, res) => {
  const admin = req.body;
  console.log(admin);
  try {
    const password = await encryptPassword(admin.password);

    const newUser = new Admin({
      username: admin.username,
      email: admin.email,
      password: password,
      address: admin.address,
      pincode: admin.pincode,
    });

    await newUser.save();

    res.status(201).json({
      msg: "Admin Added",
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
  const admin = req.body;

  try {
    const newUser = await Admin.findOne({ email: admin.email });

    if (!newUser) {
      res.status(500).json({
        msg: "Admin Not Found",
      });
    }

    if (!(await comparePassword(admin.password, newUser.password))) {
      res.status(500).json({
        msg: "Password Miss Match",
      });
    }

    const token = genToken(newUser, "admin");

    res.status(201).json({
      msg: "Admin Login",
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

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const delUser = await User.deleteOne({
      _id: userId,
    });

    await delUser.save();

    res.status(200).json({
      msg: "user deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();

    res.status(200).json({
      msg: "get all admin",
      admins: admin,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error all admin",
      error: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const delAdmin = await Admin.deleteOne({
      id: adminId,
    });
    await delAdmin.save();
    res.status(200).json({
      msg: "admin deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const adminDetails = async (req, res) => {
  const admin = req.user;

  try {
    const adminUser = await Admin.findOne({ _id: admin._id });
    res.status(200).json({
      msg: "get admin  ",
      admin: adminUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const admin = req.user;
  const updatePassword = req.body;

  try {
    const DBuser = await Admin.findByPk({ _id: admin._id });

    if (!(await comparePassword(updatePassword.oldPassword, DBuser.password))) {
      return res.status(400).json({ msg: "Password Mismatch" });
    }

    const hashedPassword = await encryptPassword(updatePassword.newPassword);

    const updateUser = await Admin.updateOne(
      {
        _id: admin._id,
      },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ msg: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const admin = req.user;
  const profile = req.body;

  try {
    await Admin.update(
      {
        _id: admin._id,
      },
      { $set: { username: profile.username, phoneNumber: profile.phoneNumber } }
    );

    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const addProduct = async (req, res) => {
  const data = req.body;

  console.log(data);
  try {
    const scheme = new Scheme({
      title: data.title,
      desc: data.desc,
      link: data.link,
      StartDate: data.startDate,
      endDate: data.endDate,
    });

    await scheme.save();

    res.status(200).json({ msg: "Product added Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const scheme = await Scheme.find();

    res.status(200).json({ msg: "Product", schemes: scheme });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const addNotification = async (req, res) => {
  const data = req.body;
  try {
    const notification = new Notification({
      title: data.title,
      notification: data.notification,
    });

    await notification.save();

    res.status(200).json({ msg: "Notification", notification: notification });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find();

    res.status(200).json({ msg: "Notification", notifications: notifications });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const id = req.params.id;
  try {
    const notifications = await Notification.deleteOne({
      _id: id,
    });

    res.status(200).json({ msg: "Notification", notifications: notifications });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  registerAdmin,
  authentication,
  updatePassword,
  updateProfile,
  getAllAdmin,
  adminDetails,
  deleteAdmin,
  deleteUser,
  addProduct,
  getProduct,
  addNotification,
  getNotification,
  deleteNotification,
};
