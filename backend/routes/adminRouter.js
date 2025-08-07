const express = require("express");

const {
  registerAdmin,
  authentication,
  getAllAdmin,
  updatePassword,
  updateProfile,
  deleteAdmin,
  deleteUser,
  adminDetails,
  addProduct,
  getProduct,
  addNotification,
  getNotification,
  deleteNotification,
} = require("../controllers/adminControllers");
const { authenticate } = require("../middleware/jwt");
const checkRole = require("../middleware/checkRole");

const adminRouter = express.Router();

adminRouter.post("/registerAdmin", registerAdmin);
adminRouter.post("/authAdmin", authentication);

adminRouter.get("/getAllAdmin", authenticate, checkRole("admin"), getAllAdmin);

adminRouter.patch(
  "/updatePassword",
  authenticate,
  checkRole("admin"),
  updatePassword
);

adminRouter.patch(
  "/updateProfile",
  authenticate,
  checkRole("admin"),
  updateProfile
);
adminRouter.delete("/admin/:id", authenticate, checkRole("admin"), deleteAdmin);
adminRouter.delete("/user/:id", authenticate, checkRole("admin"), deleteUser);

adminRouter.get(
  "/adminDetails",
  authenticate,
  checkRole("admin"),
  adminDetails
);

adminRouter.post("/addProduct", addProduct);
adminRouter.get("/getProduct", getProduct);
adminRouter.post("/addNotification", addNotification);
adminRouter.get("/getNotification", getNotification);
adminRouter.delete("/deleteNotification/:id", deleteNotification);

module.exports = adminRouter;
