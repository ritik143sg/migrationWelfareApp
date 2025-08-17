const mobile = document.getElementById("imobile");
const aadhar = document.getElementById("iaadhar");
const email = document.getElementById("iemail");

const phoneDetails = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId"));

    const res = await axios.get(
      `http://localhost:8000/varify/checkPhone/${userId}`
    );

    console.log(res);
    res.data.otp.map((otp) => {
      if (otp.type == "phone" && otp.status == "Success") {
        mobile.className = "fas fa-check-circle verified";
      }
      if (otp.type == "email" && otp.status == "Success") {
        email.className = "fas fa-check-circle verified";
      }
    });
  } catch (error) {
    console.log(error);
  }
};

phoneDetails();
// emailDetails();

mobile.addEventListener("click", () => {
  console.log(mobile.className);

  if (mobile.className == "fas fa-times-circle not-verified") {
    window.location.href = "./mobile.html";
  } else {
    mobile.className = "fas fa-check-circle verified";
  }
});

email.addEventListener("click", () => {
  console.log(email.className);

  if (email.className == "fas fa-times-circle not-verified") {
    window.location.href = "./email.html";
  } else {
    email.className = "fas fa-check-circle verified";
  }
});
