// Get the champion template
const championTemplate = document.querySelector("#champions .card");
const isLogged = localStorage.getItem("token") !== null;

// Function to fetch data from "GET /api/champions" and populate the grid
fetch("/api/champions")
    .then((response) => response.json())
    .then((data) => {
        const champions = data;

        // Clear the grid
        document.querySelector("#champions").innerHTML = "";

        // Populate the grid with champions
        champions.forEach((champion) => {
            const championCard = championTemplate.cloneNode(true);
            championCard.querySelector("input[name='id']").value = champion.id;
            championCard.querySelector("input[name='name']").value = champion.name;
            championCard.querySelector("input[name='role']").value = champion.type;

            // Add event listener to edit button
            if (!isLogged) {
                championCard.querySelector("button[name='edit']").remove();
                championCard.querySelector("button[name='delete']").remove();
            } else {
                championCard.querySelector("button[name='edit']").addEventListener("click", () => {
                    const updatedChampion = {
                        id: championCard.querySelector("input[name='id']").value,
                        name: championCard.querySelector("input[name='name']").value,
                        type: championCard.querySelector("input[name='role']").value,
                    };

                    // Send PUT request to update champion
                    fetch(`/api/champions/${updatedChampion.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(updatedChampion),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                championCard.querySelector("input[name='name']").value = champion.name;
                                championCard.querySelector("input[name='role']").value = champion.type;
                                throw new Error("Failed to update champion");
                            }

                            return response;
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            alert(`${data.name} updated!`);
                        })
                        .catch((error) => {
                            alert(`Oops!\n${error}`);
                        });
                });

                // Add event listener to delete button
                championCard.querySelector("button[name='delete']").addEventListener("click", () => {
                    const championId = championCard.querySelector("input[name='id']").value;

                    // Send DELETE request to delete champion
                    fetch(`/api/champions/${championId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Failed to delete champion");
                            }

                            // Remove the champion card from the grid
                            championCard.remove();
                        })
                        .catch((error) => {
                            alert(`Oops!\n${error}`);
                        });
                });
            }

            // Append the champion card to the grid
            document.querySelector("#champions").appendChild(championCard);
        });
    })
    .catch((error) => {
        console.error("Error fetching champions:", error);
    });
