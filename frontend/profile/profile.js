const logout = document.getElementById("logout");
const token = JSON.parse(localStorage.getItem("token"));
const userDetails = document.getElementById("userDetails");
const editButton = document.getElementById("editButton");
const editProfile = document.getElementById("editProfile");

const body = document.querySelector("body");

window.onload = () => {
  const token = localStorage.getItem("token");

  if (token) {
    body.hidden = false;
  } else {
    window.location.href = "/";
  }
};

editProfile.addEventListener("click", () => {
  window.location.href = "./editProfile.html";
});

editButton.addEventListener("click", () => {
  window.location.href = "./editUser.html";
});

logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "/";
});

const displayUser = (user) => {
  const h1 = document.createElement("h1");

  h1.innerHTML = `
  <h3>UserName: </strong>${user.username}</h3>
  <p><strong>Email: </strong> ${user.email}</p>
  <p><strong>PhoneNo: </strong> ${user.phone}</p>
   <p><strong>Address: </strong> ${user.address}</p>
    <p><strong>Pincode: </strong> ${user.pincode}</p>
`;

  userDetails.appendChild(h1);
};

const initialize = async () => {
  if (!token) {
    body.hidden = false;
    console.log("ddddddddddd");
  }

  try {
    const res = await axios.get("http://localhost:8000/user/userdetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    displayUser(res.data.user);

    console.log(res.data.user);
  } catch (error) {
    console.log(error);
  }
};

initialize();
