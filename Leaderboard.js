// leaderboard.js

// Fetch leaderboard data from Firebase
async function fetchLeaderboard() {
  try {
    const response = await fetch('https://your-backend-url.com/getLeaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const leaderboard = await response.json();
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboard.forEach((user, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${user.username} - ${user.points} points`;
      leaderboardList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
}

// Call fetchLeaderboard on page load
window.onload = function() {
  fetchLeaderboard();
};
