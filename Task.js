// task.js

// Fetch available tasks from backend or Firebase
async function fetchTasks() {
  try {
    const response = await fetch('https://your-backend-url.com/getTasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const tasks = await response.json();
    const tasksList = document.getElementById('tasksList');
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        ${task.description}
        <button onclick="completeTask('${task.id}')">Complete Task</button>
      `;
      tasksList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Function to complete a task
async function completeTask(taskId) {
  try {
    const response = await fetch('https://your-backend-url.com/completeTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, taskId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Task completed! You have earned points.');
      updateBalance(data.newBalance);
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error completing task:', error);
  }
}

// Call fetchTasks on page load
window.onload = function() {
  fetchTasks();
};
