// Example goal data
const goal = {
    targetAmount: 500000,
    currentSavings: 200000,
    remainingAmount: 300000,
    daysLeft: 60,
    dailyBudget: 3000,
    priority: "High",
  };
  
  // Set dynamic values for the circle graph, progress bar, and insights
  document.getElementById("total-amount").innerText = goal.targetAmount;
  document.getElementById("spent-amount").innerText = goal.currentSavings;
  document.getElementById("remaining-amount").innerText = goal.remainingAmount;
  document.getElementById("days-left").innerText = goal.daysLeft;
  document.getElementById("daily-spending-limit").innerText = goal.dailyBudget;
  document.getElementById("daily-savings-suggestion").innerText = (goal.targetAmount - goal.currentSavings) / goal.daysLeft;
  document.getElementById("goal-priority").innerText = goal.priority;
  document.getElementById("goal-percentage").innerText = ((goal.currentSavings / goal.targetAmount) * 100).toFixed(2);
  
  // Circle Graph: Update progress (Spent percentage)
  const spentPercentage = (goal.currentSavings / goal.targetAmount) * 100;
  document.querySelector('.circle-graph').style.background = `conic-gradient(#ff5722 0% ${spentPercentage}%, #4caf50 ${spentPercentage}% 100%)`;
  
  // Progress Bar: Update width based on savings
  const progress = document.getElementById("progress");
  progress.style.width = `${spentPercentage}%`;
  
  // Line Graph: Savings trend over the last 7 days
  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
      label: "Savings Trend",
      data: [0, 20000, 40000, 60000, 80000, 100000, goal.currentSavings],
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
    }]
  };
  
  const ctx = document.getElementById("lineChart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: lineChartData,
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          max: goal.targetAmount
        }
      }
    }
  });
  