const express = require("express");
const {
  registerUser,
  authentication,
  addComplain,
  getComplain,
  getAllUser,
  updatePassword,
  getUserDetails,
  updateProfile,
  getAllComplains,
} = require("../controllers/userControllers");
const { authenticate } = require("../middleware/jwt");
const checkRole = require("../middleware/checkRole");

const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/authUser", authentication);
userRouter.post("/addComplain", authenticate, addComplain);
userRouter.get("/getComplain", getComplain);
userRouter.get(
  "/getAllComplains",
  authenticate,
  checkRole("admin"),
  getAllComplains
);

userRouter.patch("/updatePassword", authenticate, updatePassword);

userRouter.get("/userdetails", authenticate, getUserDetails);
userRouter.get("/getAllUsers", getAllUser);

userRouter.patch("/updateProfile", authenticate, updateProfile);

module.exports = userRouter;
