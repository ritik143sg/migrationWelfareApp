const userId = JSON.parse(localStorage.getItem("userId"));

const handleClick = async (event) => {
  event.preventDefault();

  const mobile = event.target.mobile.value;

  const data = {
    to: `+91${mobile}`,
    _id: userId,
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/varify/phoneVarification",
      data
    );

    console.log(res);

    window.location.href = "./varifyMobile.html";
  } catch (error) {
    console.log(error);
  }

  console.log(mobile);

  event.target.mobile.value = "";
};
