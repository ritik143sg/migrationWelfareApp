const express = require("express");
const {
  emailVarification,
  emailVarificationfinal,
  phoneVarification,
  phoneVarificationfinal,
  checkPhone,
} = require("../controllers/varifyControllers");

const varifyRouter = express.Router();

varifyRouter.post("/emailVarification", emailVarification);
varifyRouter.post("/emailVarificationfinal", emailVarificationfinal);

varifyRouter.post("/phoneVarification", phoneVarification);
varifyRouter.post("/phoneVarificationfinal", phoneVarificationfinal);

varifyRouter.get("/checkPhone/:id", checkPhone);

module.exports = varifyRouter;
