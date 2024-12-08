document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");
  
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
  
      const donorName = document.getElementById("donorName").value;
      const email = document.getElementById("email").value;
      const donationAmount = document.getElementById("donationAmount").value;
      const message = document.getElementById("message").value;
  
      const data = {
        donorName,
        email,
        donationAmount,
        message,
      };
  
      try {
        const response = await fetch("http://127.0.0.1:5000/data_submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          window.location.href = "ranking.html";
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData.message || "Unknown error");
          alert("An error occurred while submitting your donation.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("Failed to connect to the server. Please try again later.");
      }
    });
  });
  