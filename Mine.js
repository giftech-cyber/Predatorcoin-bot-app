// mine.js

// Initialize Firebase to access the user's mining status and balance
const userId = "USER_ID"; // This should be dynamically assigned based on the logged-in user

// Function to start mining
async function startMining() {
  try {
    const response = await fetch('https://your-backend-url.com/startMining', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Mining started. Check back in 6 hours to claim rewards!');
      // Disable the mining button to prevent multiple clicks
      document.getElementById('mineBtn').disabled = true;
      startMiningTimer();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error starting mining:', error);
  }
}

// Function to claim mining rewards after 6 hours
async function claimRewards() {
  try {
    const response = await fetch('https://your-backend-url.com/claimRewards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Rewards claimed!');
      updateBalance(data.newBalance);
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error claiming rewards:', error);
  }
}

// Function to start a 6-hour timer
function startMiningTimer() {
  // Use localStorage to store the mining start time
  const miningStartTime = Date.now();
  localStorage.setItem('miningStartTime', miningStartTime);

  // Disable the mining button for 6 hours
  setTimeout(() => {
    document.getElementById('mineBtn').disabled = false;
    alert('You can now claim your rewards!');
  }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
}

// Call `claimRewards()` when user clicks on "Claim" button after 6 hours
document.getElementById('claimBtn').addEventListener('click', claimRewards);
