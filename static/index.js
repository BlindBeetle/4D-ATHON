document.addEventListener("DOMContentLoaded", () => {
    const moneyElement = document.getElementById("totalMoney");
    const trashElement = document.getElementById("totalTrash");

    function loadValues() {
      fetch("http://127.0.0.1:5000/donation_values", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.values) {
            const [totalMoney, totalTrash] = data.values;
            moneyElement.textContent = `$${totalMoney.toFixed(2)}`;
            trashElement.textContent = `${totalTrash.toFixed(2)} kg`;
          } else {
            console.error("Failed to load donation values.");
          }
        })
        .catch((error) => console.error("Error fetching values:", error));
    }

    loadValues();
  });
  