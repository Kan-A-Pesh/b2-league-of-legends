document.getElementById("register").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const tokenResponse = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (tokenResponse.ok) {
            const { token } = await tokenResponse.json();
            localStorage.setItem("token", token);
            localStorage.setItem("user", username);
            window.location.href = "/";
        } else {
            alert("Failed to login");
            window.location.href = "/login.html";
        }
    } else {
        alert("Failed to register account");
    }
});
