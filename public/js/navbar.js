const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token) {
    // User is connected
    document.querySelectorAll(".hide-connected").forEach((element) => {
        element.style.display = "none";
    });
} else {
    // User is not connected
    document.querySelectorAll(".hide-anon").forEach((element) => {
        element.style.display = "none";
    });
}

const logoutButton = document.querySelector("#logout");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.reload();
    });
}

const profileElement = document.querySelector("#profile");
if (profileElement && user) {
    profileElement.innerText = `Connected as ${user}`;
}
