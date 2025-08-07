const express = require("express");
const getComplains = require("../controllers/complainControllers");

const complainRouter = express.Router();

// varifyRouter.post("/emailVarification", emailVarification);
// varifyRouter.post("/emailVarificationfinal", emailVarificationfinal);

// varifyRouter.post("/phoneVarification", phoneVarification);
// varifyRouter.post("/phoneVarificationfinal", phoneVarificationfinal);

complainRouter.get("/getComplains", getComplains);

module.exports = complainRouter;
