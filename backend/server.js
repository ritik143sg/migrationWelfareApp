const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const adminRouter = require("./routes/adminRouter");
const path = require("path");
const varifyRouter = require("./routes/varifyRouter");
const complainRouter = require("./routes/complainRouter");
require("./models/schemeModel");
require("./models/complainModel");
require("./models/otpModel");

require("./models/adminModel");
require("./models/userModel");

dotenv.config();
connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/varify", varifyRouter);
app.use("/complain", complainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on the PORT ${PORT}`);
});
