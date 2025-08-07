const verify = document.getElementById("verify");

const logout = document.getElementById("logout");

const mobile = document.getElementById("imobile");
const aadhar = document.getElementById("iaadhar");
const email = document.getElementById("iemail");

const complain = document.getElementById("complain");

const scheme = document.getElementById("scheme");

const profile = document.getElementById("profile");

const img = document.getElementById("img");

const phoneDetails = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId"));

    const res = await axios.get(
      `http://localhost:8000/varify/checkPhone/${userId}`
    );

    console.log(res);
    if (res.data.status == true) {
      mobile.className = "fas fa-check-circle verified";
      email.className = "fas fa-check-circle verified";
    }
  } catch (error) {
    console.log(error);
  }
};

phoneDetails();

//mobile.className = "fas fa-check-circle verified";

img.addEventListener("click", () => {
  window.location.href = "./notification.html";
});

scheme.addEventListener("click", () => {
  window.location.href = "./scheme.html";
});

profile.addEventListener("click", () => {
  window.location.href = "../profile/profile.html";
});

logout.addEventListener("click", () => {
  window.location.href = "../index.html";
});

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

complain.addEventListener("click", () => {
  window.location.href = "../complain/complain.html";
});

const display = (item) => {
  console.log(item);

  const div0 = document.getElementById("values");
  const div1 = document.createElement("div");
  div1.className = "excel-row";

  const data = [];

  for (let key in item) {
    const div2 = document.createElement("div");
    div2.className = "excel-cell";

    if (key == "title") {
      div2.innerText = `${item["title"]}`;
      data[0] = div2;
    } else if (key == "notification") {
      div2.innerText = `${item["notification"]}`;
      data[1] = div2;
    }
  }

  for (let i = 0; i < 2; i++) {
    console.log(data[i]);
    div1.appendChild(data[i]);
  }

  div0.appendChild(div1);
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/getNotification");

    console.log(res);

    const notifications = res.data.notifications;
    notifications.map((notification) => {
      display(notification);
    });
  } catch (error) {
    console.log(error);
  }
};

initialize();
