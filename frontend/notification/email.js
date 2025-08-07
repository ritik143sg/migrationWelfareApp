const userId = JSON.parse(localStorage.getItem("userId"));

const handleClick = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  const data = {
    to: email,
    _id: userId,
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/varify/emailVarification",
      data
    );

    console.log(res);

    window.location.href = "./varifyEmail.html";
  } catch (error) {
    console.log(error);
  }

  console.log(email);

  event.target.email.value = "";
};
