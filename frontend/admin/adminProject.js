const admintoken = JSON.parse(localStorage.getItem("admintoken"));
const projectList = document.getElementById("projectList");

document.getElementById("scheme").addEventListener("click", () => {
  window.location.href = "./addProject.html";
});

document.getElementById("app").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/frontend/index.html";
});

document.getElementById("logout").addEventListener("click", () => {
  window.location.href = "./adminLogin.html";
});

const displayProject = (lists) => {
  projectList.innerHTML = "";

  lists.forEach((list) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
  <h2>${list.title}</h2>
  <p><strong>Description:</strong> ${list.desc || "N/A"}</p>
  <p><strong>Start Date:</strong> ${list.StartDate || "N/A"}</p>
  <p><strong>End Date:</strong> ${list.endDate || "N/A"}</p>
  <p><strong>Link:</strong> 
    ${
      list.link
        ? `<a href="${list.link}" target="_blank" rel="noopener noreferrer">${list.link}</a>`
        : "N/A"
    }
  </p>
  <p><strong>Status:</strong> ${list.status || "N/A"}</p>
  <button class="delete-btn">Delete</button>
`;

    card.querySelector(".delete-btn").addEventListener("click", async () => {
      try {
        await axios.delete(`http://localhost:8000/admin/project/${list.id}`, {
          headers: { Authorization: `Bearer ${admintoken}` },
        });
        initialize();
      } catch (error) {
        console.error(error);
      }
    });

    projectList.appendChild(card);
  });
};

const initialize = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/getProduct", {
      headers: { Authorization: `Bearer ${admintoken}` },
    });
    displayProject(res.data.schemes);
  } catch (error) {
    console.error(error);
  }
};

initialize();
