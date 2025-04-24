const ctx = document.getElementById('lineChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'March', 'April', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Dec'],
    datasets: [{
      label: 'Earnings in shs',
      data: [2050, 1900, 3000, 1000, 3000, 2500, 3000, 4000, 6000, 4000, 3000, 4000],
      backgroundColor: [
        'rgba(85,85,85,1)'
      ],
      borderColor: [
'rgb(41,155,99)'
      ],
      
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//pie chart
const pie = document.getElementById('doughnut');

new Chart(pie, {
  type: 'doughnut',
  data: {
    labels: ['Director', 'Managers', 'SalesAgents', 'Others'],
    datasets: [{
      label: 'Employees',
      data: [1, 2, 3, ''],
      backgroundColor: [
        'rgba(41, 155, 99, 1)',
        'rgba(54, 162, 215, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(120, 46, 139, 1)'
      ],
      borderColor: [
        'rgba(41, 155, 99, 1)',
        'rgba(54, 162, 215, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(120, 46, 139, 1)'
      ],
      
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});