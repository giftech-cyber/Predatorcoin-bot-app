// friends.js

// Display user's referral code
function displayReferralCode() {
  const referralCode = "YOUR_REFERRAL_CODE"; // Retrieve from backend or Firebase
  document.getElementById('referralCode').textContent = referralCode;
}

// Copy referral code to clipboard
function copyReferralCode() {
  const referralCode = document.getElementById('referralCode').textContent;
  navigator.clipboard.writeText(referralCode).then(() => {
    alert('Referral code copied to clipboard!');
  }).catch(err => {
    console.error('Error copying referral code:', err);
  });
}

// Fetch referred friends from Firebase
async function fetchReferredFriends() {
  try {
    const response = await fetch('https://your-backend-url.com/getReferredFriends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const friends = await response.json();
    const friendsList = document.getElementById('friendsList');
    friends.forEach(friend => {
      const friendItem = document.createElement('li');
      friendItem.textContent = friend.name;
      friendsList.appendChild(friendItem);
    });
  } catch (error) {
    console.error('Error fetching referred friends:', error);
  }
}

// Call displayReferralCode and fetchReferredFriends on page load
window.onload = function() {
  displayReferralCode();
  fetchReferredFriends();
};

document.getElementById('copyCodeBtn').addEventListener('click', copyReferralCode);
