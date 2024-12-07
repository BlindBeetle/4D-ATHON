document.addEventListener("DOMContentLoaded", () => {
  const rankingTable = document.getElementById("rankingTable");

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
    rankingTable.innerHTML = "";

    rankings.forEach((ranking, index) => {
      const row = document.createElement("tr");

      // Rank
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      // Donor Name
      const donorCell = document.createElement("td");
      donorCell.textContent = ranking.donorName || "Anonymous";
      row.appendChild(donorCell);

      // Total Donation
      const donationCell = document.createElement("td");
      donationCell.textContent = `$${ranking.totalDonation}`;
      row.appendChild(donationCell);

      // Message
      const messageCell = document.createElement("td");
      messageCell.textContent = ranking.message || "N/A";
      row.appendChild(messageCell);

      rankingTable.appendChild(row);
    });
  }

  loadRankings();
});
