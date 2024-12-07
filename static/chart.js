document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("rankingTableBody");

    function loadRankings() {
        fetch("http://127.0.0.1:5000/load_rankings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success" && data.rankings) {
                    displayRankings(data.rankings);
                } else {
                    console.error("Failed to load rankings.");
                }
            })
            .catch((error) => console.error("Error fetching rankings:", error));
    }

    function displayRankings(rankings) {
        table.innerHTML = "";

        rankings.forEach((ranking, index) => {
            const row = document.createElement("tr");

            const rankCell = document.createElement("td");
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = ranking.;
            row.appendChild(teamNameCell);

            const donationCell = document.createElement("td");
            donationCell.textContent = ranking.totalDonation;
            row.appendChild(donationCell);

            table.appendChild(row);
        });
    }

    loadRankings();
});
