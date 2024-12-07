document.addEventListener("DOMContentLoaded", () => {
    const donorNameInput = document.getElementById("donorName");
    const emailInput = document.getElementById("email");
    const donationAmountInput = document.getElementById("donationAmount");
    const messageInput = document.getElementById("message");
    const donationTypeInputs = document.getElementsByName("donationType");
    const donationForm = document.querySelector(".form-basin form");
  
    function getSelectedDonationType() {
      for (const radio of donationTypeInputs) {
        if (radio.checked) {
          return radio.value;
        }
      }
      return null; 
    }
  
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const donorName = donorNameInput.value;
      const email = emailInput.value;
      const donationAmount = donationAmountInput.value;
      const message = messageInput.value;
      const donationType = getSelectedDonationType();
  
      if (!donorName || !email || !donationAmount || !donationType) {
        alert("Please fill in all required fields!");
        return;
      }
  
      const donationData = {
        donorName,
        email,
        donationAmount: parseFloat(donationAmount),
        message,
        donationType,
      };
  
      fetch("http://127.0.0.1:5000/data_submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Donation submitted successfully!");
            donationForm.reset();
          } else {
            alert("Error submitting the donation. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while submitting your donation.");
        });
    });
  });