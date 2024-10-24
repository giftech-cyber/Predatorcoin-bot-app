// app.js

// Import necessary modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    databaseURL: "YOUR_FIREBASE_DATABASE_URL",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// TON Web configuration for USDT transaction
const TonWeb = require('tonweb');
const tonweb = new TonWeb();

// Frontend logic

// Fetch the current user data from Firebase
async function fetchUserData(userId) {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, `users/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to update user balance
async function updateUserBalance(userId, newBalance) {
    try {
        await set(ref(database, `users/${userId}/balance`), newBalance);
        alert('Balance updated successfully.');
    } catch (error) {
        console.error('Error updating balance:', error);
    }
}

// Event listener for the "Mine" button
document.getElementById('mineBtn').addEventListener('click', async () => {
    await startMining();
});

// Function to start mining
async function startMining() {
    // Check if 6 hours have passed
    const lastMiningTime = localStorage.getItem('lastMiningTime');
    const currentTime = Date.now();
    if (lastMiningTime && currentTime - lastMiningTime < 6 * 60 * 60 * 1000) {
        alert('You need to wait 6 hours between mining sessions.');
        return;
    }

    localStorage.setItem('lastMiningTime', currentTime);

    // Fetch user data
    const userId = 'USER_ID'; // Get the actual user ID from your session or auth
    const userData = await fetchUserData(userId);

    if (userData) {
        const newBalance = userData.balance + 10; // Add mining rewards (e.g., 10 points)
        await updateUserBalance(userId, newBalance);
    }
}

// Event listener for the "Boost" button
document.getElementById('boostBtn').addEventListener('click', async () => {
    await boostMiningPower();
});

// Function to boost mining power using USDT via TON blockchain
async function boostMiningPower() {
    const userId = 'USER_ID'; // Get the actual user ID from your session or auth
    const userData = await fetchUserData(userId);

    // Check if user has sufficient balance
    if (userData.balance < 5) {
        alert('You need at least 5 USDT to boost mining power.');
        return;
    }

    // Process the USDT transaction
    try {
        // TON transaction logic here (send 5 USDT)
        const wallet = tonweb.wallet.create({ publicKey: 'YOUR_PUBLIC_KEY' });
        const seqno = await wallet.methods.seqno().call();

        await wallet.methods.transfer({
            secretKey: 'YOUR_SECRET_KEY',
            toAddress: 'TON_DESTINATION_ADDRESS',
            amount: TonWeb.utils.toNano('5'), // Convert 5 USDT to nanoTON
            seqno: seqno,
            sendMode: 3,
        }).send();

        // Update user balance after successful transaction
        const newBalance = userData.balance - 5; // Deduct 5 USDT
        await updateUserBalance(userId, newBalance);

        alert('Mining power boosted successfully!');
    } catch (error) {
        console.error('Error processing the USDT transaction:', error);
    }
}

// Fetch and display the leaderboard
async function displayLeaderboard() {
    const leaderboardData = await fetch('https://your-backend-url.com/getLeaderboard'); // Replace with your backend leaderboard endpoint
    const leaderboardList = document.getElementById('leaderboardList');

    leaderboardData.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${user.username} - ${user.points} points`;
        leaderboardList.appendChild(listItem);
    });
}

// Event listener for task completion
document.getElementById('completeTaskBtn').addEventListener('click', async () => {
    await completeTask('TASK_ID'); // Pass the task ID
});

// Function to complete tasks and award points
async function completeTask(taskId) {
    const userId = 'USER_ID'; // Get the actual user ID from your session or auth

    // Call backend to mark task as completed and update user's points
    const response = await fetch('https://your-backend-url.com/completeTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, taskId }),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Task completed! Points added to your balance.');
        updateUserBalance(userId, data.newBalance);
    } else {
        alert('Error: ' + data.message);
    }
}

// Event listener for "Friends" section to display referral code
document.getElementById('copyCodeBtn').addEventListener('click', () => {
    copyReferralCode();
});

// Function to copy referral code
function copyReferralCode() {
    const referralCode = document.getElementById('referralCode').textContent;
    navigator.clipboard.writeText(referralCode).then(() => {
        alert('Referral code copied to clipboard!');
    }).catch(err => {
        console.error('Error copying referral code:', err);
    });
}

// Display referral code and referred friends
async function displayReferralSection() {
    const userId = 'USER_ID'; // Get the actual user ID from your session or auth

    // Fetch referral code and friends from backend
    const referralData = await fetch('https://your-backend-url.com/getReferralData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    const data = await referralData.json();
    document.getElementById('referralCode').textContent = data.referralCode;

    const friendsList = document.getElementById('friendsList');
    data.referredFriends.forEach(friend => {
        const friendItem = document.createElement('li');
        friendItem.textContent = friend.name;
        friendsList.appendChild(friendItem);
    });
}

// Call initial functions when the app starts
window.onload = async () => {
    displayReferralSection();
    displayLeaderboard();
};
