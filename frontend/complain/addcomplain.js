const token = JSON.parse(localStorage.getItem("token"));

const verify = document.getElementById("verify");

const mobile = document.getElementById("mobile");

const complain = document.getElementById("complain");

const profile = document.getElementById("profile");

const img = document.getElementById("img");

img.addEventListener("click", () => {
  window.location.href = "../notification/notification.html";
});

profile.addEventListener("click", () => {
  window.location.href = "../profile/profile.html";
});

const admin = document.getElementById("admin");

admin.addEventListener("click", () => {
  window.location.href = "../admin/adminLogin.html";
});

mobile.addEventListener("click", () => {
  window.location.href = "./mobile.html";
});

complain.addEventListener("click", () => {
  window.location.href = "./complain.html";
});

const handleSubmit = async (event) => {
  event.preventDefault();

  const title = event.target.title.value;

  const msg = event.target.msg.value;

  const data = {
    title: title,
    msg: msg,
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/user/addComplain",
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    window.location.href = "./complain.html";
  } catch (error) {
    console.log(error);
  }

  console.log(data);

  event.target.title.value = "";

  event.target.msg.value = "";
};
