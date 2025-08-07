const verify = document.getElementById("verify");

const logout = document.getElementById("logout");

const addComplain = document.getElementById("addComplain");

const mobile = document.getElementById("mobile");

const profile = document.getElementById("profile");

const img = document.getElementById("img");

img.addEventListener("click", () => {
  window.location.href = "../notification/notification.html";
});

profile.addEventListener("click", () => {
  window.location.href = "../profile/profile.html";
});

logout.addEventListener("click", () => {
  window.location.href = "../index.html";
});

mobile.addEventListener("click", () => {
  window.location.href = "./mobile.html";
});

addComplain.addEventListener("click", () => {
  window.location.href = "./addComplain.html";
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
      // div2.className = "title-cell";
      div2.innerText = `${item["title"]}`;

      data[0] = div2;
    } else if (key == "message") {
      // div2.className = "msg-cell";
      div2.innerText = `${item["message"]}`;
      data[1] = div2;
    } else if (key == "status") {
      // div2.className = "status-cell";
      div2.innerText = `${item["status"]}`;
      if (item["status"] == "Pending") {
        div2.style.color = "red";
      } else {
        div2.style.color = "green";
      }
      data[2] = div2;
    }
  }

  for (let i = 0; i < 3; i++) {
    console.log(data[i]);
    div1.appendChild(data[i]);
  }

  div0.appendChild(div1);
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/complain/getComplains");

    console.log(res);

    complains = res.data.complains;

    complains.map((complain) => {
      display(complain);
    });
  } catch (error) {
    console.log(error);
  }
};

initialize();
