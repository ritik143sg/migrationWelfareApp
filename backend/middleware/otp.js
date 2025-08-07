const genOtp = () => {
  const number = "0123456789";
  let otp = "";

  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 10);
    otp += number[index];
  }
  return otp;
};

module.exports = genOtp;
