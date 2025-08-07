const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const ul = document.querySelector("ul");

const notification = document.getElementById("notification");

notification.addEventListener("click", () => {
  window.location.href = "./addNotification.html";
});

const displayUsers = (lists) => {
  ul.innerHTML = "";
  lists.map((list) => {
    const li = document.createElement("li");
    const wrapper = document.createElement("div");
    wrapper.className = "hover-trigger";

    const button = document.createElement("button");
    button.innerText = "View";

    const div = document.createElement("div");
    div.className = "details-box";
    div.textContent = `${list.notification}`;

    wrapper.appendChild(button);
    wrapper.appendChild(div);

    const button1 = document.createElement("button");
    button1.innerText = "Delete";

    button1.addEventListener("click", async () => {
      try {
        const res = await axios.delete(
          `http://localhost:8000/admin/deleteNotification/${list._id}`
        );

        console.log(res);
        initialize();
      } catch (error) {
        console.log(error);
      }
    });

    li.innerText = `${list.title}`;
    li.appendChild(wrapper);

    li.appendChild(button1);

    ul.appendChild(li);
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/getNotification", {
      //   headers: {
      //     Authorization: `Bearer ${admintoken}`,
      //   },
    });

    console.log(res.data);
    displayUsers(res.data.notifications);
  } catch (error) {
    console.log(error);
  }
};

initialize();
