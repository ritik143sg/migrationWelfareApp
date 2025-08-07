const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    title: event.target.title.value,
    notification: event.target.notification.value,
  };

  console.log(data);

  try {
    const res = await axios.post(
      "http://localhost:8000/admin/addNotification",
      data
    );

    console.log(res);

    window.location.href = "./notification.html";
  } catch (error) {
    console.log(error);
  }

  event.target.title.value = "";
  event.target.notification.value = "";
};
