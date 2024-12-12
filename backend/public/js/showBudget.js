const ctxPie = document.getElementById('budgetPieChart').getContext('2d');

// Pie Chart - Budget Distribution
const budgetPieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Food', 'Travel', 'Entertainment', 'Clothes', 'Health', 'Education', 'Television'],
        datasets: [{
            label: 'Budget Distribution',
            data: [1200, 1400, 800, 500, 300, 500, 300], // Data for each category
            backgroundColor: ['#388e3c', '#1976d2', '#ff5722', '#ffc107', '#4caf50', '#9c27b0', '#ff9800'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                titleColor: '#fff',
                bodyColor: '#fff',
            }
        }
    }
});

// Bar Chart - Spending Trend
const ctxBar = document.getElementById('spendingTrendGraph').getContext('2d');

const spendingTrendGraph = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Food', 'Travel', 'Entertainment', 'Clothes', 'Health', 'Education', 'Television'],
        datasets: [{
            label: 'Spent Amount',
            data: [800, 1200, 500, 300, 150, 50, 350],
            backgroundColor: '#388e3c',
            borderColor: '#388e3c',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 200
                }
            }
        }
    }
});
