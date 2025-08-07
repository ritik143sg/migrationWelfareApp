const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    title: event.target.title.value,
    desc: event.target.desc.value,
    startDate: event.target.start.value,
    endDate: event.target.end.value,
    link: event.target.link.value,
  };

  console.log(data);

  try {
    const res = await axios.post(
      "http://localhost:8000/admin/addProduct",
      data
    );

    console.log(res);

    // const token = res.data.token;
    // const userId = res.data.user._id;
    // console.log(res.data.user._id);

    // localStorage.setItem("token", JSON.stringify(token));
    // localStorage.setItem("userId", JSON.stringify(userId));

    window.location.href = "./adminProject.html";
  } catch (error) {
    console.log(error);
  }

  event.target.title.value = "";
  event.target.desc.value = "";
  event.target.start.value = "";
  event.target.end.value = "";
  event.target.link.value = "";
};
