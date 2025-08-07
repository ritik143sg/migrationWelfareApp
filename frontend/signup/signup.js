const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(event);

  console.log(event.target);

  const data = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
    phone: event.target.phone.value,
    address: event.target.address.value,
    pincode: event.target.pin.value,
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/user/registerUser",
      data
    );
    console.log(res);
    window.location.href = "../index.html";
  } catch (error) {
    520;
    console.log(error);
  }
  event.target.username.value = "";
  event.target.email.value = "";
  event.target.password.value = "";
  event.target.phone.value = "";
  event.target.address.value = "";
  event.target.pin.value = "";
};
