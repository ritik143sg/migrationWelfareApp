const admintoken = JSON.parse(localStorage.getItem("admintoken"));

const user = document.getElementById("user");
const project = document.getElementById("project");

if (!admintoken) {
  window.location.href = "./adminLogin.html";
}

const admin = document.getElementById("admin");

const allUser = document.getElementById("allUser");

const complain = document.getElementById("complain");

complain.addEventListener("click", () => {
  window.location.href = "./adminOrg.html";
});

const notification = document.getElementById("notification");

notification.addEventListener("click", () => {
  window.location.href = "./notification.html";
});

admin.addEventListener("click", () => {
  window.location.href = "./adminList.html";
});

user.addEventListener("click", () => {
  window.location.href = "./adminUser.html";
});

project.addEventListener("click", () => {
  window.location.href = "./adminProject.html";
});

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/user/getAllUsers", {
      headers: {
        Authorization: `Bearer ${admintoken}`,
      },
    });

    console.log(res.data);
    allUser.innerText = `${res.data.Users.length}`;
  } catch (error) {
    console.log(error);
  }
};

initialize();
