document.addEventListener("DOMContentLoaded", () => {
  const rankingTableBody = document.getElementById("rankingTable");

  if (!rankingTableBody) {
      console.error('The <tbody> with id "rankingTable" was not found in the DOM.');
      return;
  }

  async function loadRankings() {
      try {
          const response = await fetch("ranked_donations.csv");

          if (!response.ok) {
              throw new Error("Failed to load the CSV file!");
          }

          const data = await response.text();
          populateTable(data);
      } catch (error) {
          console.error("Error fetching rankings:", error.message);
      }
  }

  function populateTable(data) {
      const rows = data.split("\n").filter(row => row.trim() !== "");


      const header = rows.shift().split(",").map(col => col.trim().toLowerCase());

      if (!header.includes("donorname") || !header.includes("donationamount") || !header.includes("message")) {
          console.error("CSV does not contain the required columns: donorName, donationAmount, message.");
          return;
      }


      const parsedRows = rows.map(row => {
          const cols = row.split(",").map(col => col.trim());
          return {
              donorName: cols[header.indexOf("donorname")] || "Anonymous",
              donationAmount: parseFloat(cols[header.indexOf("donationamount")]) || 0,
              message: cols[header.indexOf("message")] || "No message"
          };
      });


      parsedRows.sort((a, b) => b.donationAmount - a.donationAmount);


      parsedRows.forEach((row, index) => {
          const tr = document.createElement("tr");

          const rankCell = document.createElement("td");
          rankCell.textContent = index + 1;
          tr.appendChild(rankCell);

          const donorCell = document.createElement("td");
          donorCell.textContent = row.donorName;
          tr.appendChild(donorCell);

          const donationCell = document.createElement("td");
          donationCell.textContent = `$${row.donationAmount.toFixed(2)}`;
          tr.appendChild(donationCell);

          const messageCell = document.createElement("td");
          messageCell.textContent = row.message;
          tr.appendChild(messageCell);

          rankingTableBody.appendChild(tr);
      });
  }

  loadRankings();
});
