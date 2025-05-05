document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/chart-data");
    const data = await res.json();

    // Format line chart data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const earnings = new Array(12).fill(0); // Default 0 for all months

    data.sales.forEach(sale => {
      const monthIndex = sale._id - 1;
      earnings[monthIndex] = sale.total;
    });

    // Line chart (Earnings)
    const ctx = document.getElementById('lineChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthNames,
        datasets: [{
          label: 'Earnings in shs',
          data: earnings,
          backgroundColor: 'rgba(85,85,85,0.2)',
          borderColor: 'rgb(41,155,99)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }catch (err){
    console.error("Error loading chart data:", err);
  }
});
