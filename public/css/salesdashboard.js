const ctx = document.getElementById('lineChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Beans', 'Cow peas', 'Gnuts', 'Soya beans', 'Maize', ],
    datasets: [{
      label: 'Earnings in shs',
      data: [2050, 1900, 3000, 1000, 3000],
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
