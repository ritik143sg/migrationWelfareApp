const handleClick = async (event) => {
  event.preventDefault();

  const otp = event.target.otp.value;

  const data = {
    otpValue: otp,
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/varify/emailVarificationfinal",
      data
    );

    console.log(res);

    if (res.data.msg == "email varified") {
      window.location.href = "./notification.html";
    } else {
      alert("Otp expired");
      window.location.href = "./email.html";
    }
  } catch (error) {
    console.log(error);
  }

  event.target.otp.value = "";
};
