const { v4: uuidv4 } = require("uuid");
const path = require("path");
const dotenv = require("dotenv");
const twilio = require("twilio");

const SibApiV3Sdk = require("sib-api-v3-sdk");
const OTP = require("../models/otpModel");
const genOtp = require("../middleware/otp");

dotenv.config();

const accSid = process.env.TWILIO_ACC_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accSid, authtoken);

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

const emailVarification = async (req, res) => {
  const user = req.body;

  try {
    const otp = genOtp();

    const reset = new OTP({
      type: "email",
      typeValue: user.to,
      isActive: true,
      otpValue: otp,
      userId: user._id,
    });

    await reset.save();

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: "ritiksg143@gmail.com",
      name: "MigrationWelfare",
    };

    const receivers = [
      {
        email: user.to,
      },
    ];

    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Test Email from Brevo",
      textContent:
        "This is a plain text fallback for email clients that do not support HTML.",
      htmlContent: `
        <html>
          <body>
            <h1>Hello, ${user.to}, Your OTP is ${otp} </h1>
            <p>This is a test transactional email sent via the Brevo API.</p>
          </body>
        </html>
      `,
    });

    res.status(200).json({
      message: "Email sent successfully",
      sendEmail: sendEmail,
      reset: reset,
    });
  } catch (error) {
    console.error("Error while sending email:", error);
    res.status(500).json({ msg: "error", error: error.message });
  }
};

const emailVarificationfinal = async (req, res) => {
  const otp = req.body;

  console.log(otp);

  try {
    const reset = await OTP.findOne({ otpValue: otp.otpValue });

    console.log(reset);

    const otpCreationTime = reset.createdAt.getTime();
    const otpValidTime = otpCreationTime + 1 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (reset && reset.isActive == true && otpValidTime >= currentTime) {
      await OTP.updateOne(
        { otpValue: otp.otpValue },
        {
          $set: { isActive: false, status: "Success" },
        }
      );

      await reset.save();

      res.json({
        msg: "email varified",
      });
    } else {
      await OTP.updateOne(
        { otpValue: otp.otpValue },
        {
          $set: { isActive: false },
        }
      );

      await reset.save();
      res.status(500).json({
        msg: "otp expired",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const phoneVarification = async (req, res) => {
  const data = req.body;

  console.log(data);

  try {
    const otp = genOtp();

    const reset = new OTP({
      type: "phone",
      typeValue: data.to,
      isActive: true,
      otpValue: otp,
      userId: data._id,
    });

    await reset.save();

    const result = await client.messages.create({
      body: `This is your OTP ${otp}, Never Share it to any one. Thank you!`,
      from: process.env.TWILIO_PHONE_NO,
      to: data.to,
    });

    res.status(201).json({ msg: "SMS send", result: result });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const phoneVarificationfinal = async (req, res) => {
  const otp = req.body;

  console.log(otp);

  try {
    const reset = await OTP.findOne({ otpValue: otp.otpValue });

    console.log(reset);

    const otpCreationTime = reset.createdAt.getTime();
    const otpValidTime = otpCreationTime + 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (reset && reset.isActive == true && otpValidTime >= currentTime) {
      await OTP.updateOne(
        { otpValue: otp.otpValue },
        {
          $set: { isActive: false, status: "Success" },
        }
      );

      await reset.save();

      res.json({
        msg: "phone varified",
      });
    } else {
      await OTP.updateOne(
        { otpValue: otp.otpValue },
        {
          $set: { isActive: false },
        }
      );

      await reset.save();
      res.status(500).json({
        msg: "otp expired",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const checkPhone = async (req, res) => {
  const userId = req.params.id;

  try {
    const otp = await OTP.find({
      userId: userId,
    });

    let flag = false;

    otp.forEach((otp) => {
      if (otp.status == "Success") {
        flag = true;
      }
    });

    res.status(200).json({
      msg: "get phone details",
      otp: otp,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  emailVarification,
  emailVarificationfinal,
  phoneVarification,
  phoneVarificationfinal,
  checkPhone,
};
