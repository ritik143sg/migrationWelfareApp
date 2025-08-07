const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const pending = document.getElementById("pending");

const app = document.getElementById("app");

app.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/index.html";
});
const approve = document.getElementById("approve");

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  window.location.href = "./adminLogin.html";
});

const displayOrgs = (lists) => {
  const ul = document.querySelectorAll("ul");
  ul[0].innerHTML = "";
  ul[1].innerHTML = "";
  ul[2].innerHTML = "";

  lists.map((list) => {
    const li = document.createElement("li");
    li.innerText = `${list.title}`;

    if (list.status == "Pending") {
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");

      // li.innerText = `${list.orgName}`;
      button1.innerText = "Approve";
      //.innerText = "Reject";

      const data = {
        id: list.id,
      };

      button1.addEventListener("click", async () => {
        try {
          const res = await axios.post(
            `http://localhost:8000/user/orgstatus/${1}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${admintoken}`,
              },
            }
          );
          console.log(res.data);
          initialize();
        } catch (error) {
          console.log(error);
        }
      });

      button2.addEventListener("click", async () => {
        try {
          const res = await axios.post(
            `http://localhost:8000/admin/orgstatus/${0}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${admintoken}`,
              },
            }
          );
          console.log(res.data);
          initialize();
        } catch (error) {
          console.log(error);
        }
      });

      // li.innerText = `${list.orgName}`;
      // button1.innerText = "Approve";
      button2.innerText = "Reject";

      li.appendChild(button1);
      li.appendChild(button2);
      ul[0].appendChild(li);
    } else if (list.status == "Accepted") {
      ul[1].appendChild(li);
    } else {
      ul[2].appendChild(li);
    }
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/user/getAllComplains", {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
    });

    console.log(res.data.complains);

    displayOrgs(res.data.complains);
  } catch (error) {
    console.log(error);
  }
};

initialize();
