function handleResponse(data) {
  const totalMoneyElement = document.getElementById("totalMoney");
  const totalTrashElement = document.getElementById("totalTrash");
  const totalVolunteerElement = document.getElementById("totalDonors");

  if (data.status === "success") {
      totalMoneyElement.textContent = `$${data.values.total_donations.toFixed(2)}`;
      totalTrashElement.textContent = `${data.values.trash_ratio.toFixed(2)} kg`;
      totalVolunteerElement.textContent = `${data.values.volunteer_count.toFixed(2)}`;
  } else {
      console.error("Error in response:", data.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "http://127.0.0.1:5000/donation_values?callback=handleResponse";
  document.body.appendChild(script);
});