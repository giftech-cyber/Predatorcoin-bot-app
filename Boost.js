// boost.js

// Function to boost mining power
async function boostMiningPower() {
  try {
    const response = await fetch('https://your-backend-url.com/boostMiningPower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Mining power boosted! Your mining speed has increased.');
      updateBalance(data.newBalance);
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error boosting mining power:', error);
  }
}

// Trigger boost when user clicks the button
document.getElementById('boostBtn').addEventListener('click', boostMiningPower);
