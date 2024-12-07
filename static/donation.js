document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById("submit");
  if (submitButton) {
      submitButton.onclick = async function () {
          const data = {
              donorName: document.getElementById("donorName").value,
              email: document.getElementById("email").value,
              donationAmount: document.getElementById("donationAmount").value,
              message: document.getElementById("message").value,
          };

          try {
              const response = await fetch('http://127.0.0.1:5000/data_submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
              });

              const result = await response.json();
              console.log(result);
          } catch (error) {
              console.error('Error:', error);
          }
      };
  } else {
      console.error('Submit button not found in the DOM.');
  }
});
