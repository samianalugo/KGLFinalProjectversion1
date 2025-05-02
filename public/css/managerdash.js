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

    // Prepare employee data for pie chart
    const roles = ['Director', 'Manager', 'Salesagent', 'Others'];
    const roleMap = {
      director: 'Director',
      manager: 'Manager',
      sales_agent: 'Salesagent',
    };

    const employeeCounts = { Director: 0, Manager: 0, Salesagent: 0, Others: 0 };
    data.employees.forEach(emp => {
      const role = roleMap[emp._id.toLowerCase()] || 'Others';
      employeeCounts[role]++;
    });

    const pieCtx = document.getElementById('doughnut');
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: roles,
        datasets: [{
          label: 'Employees',
          data: roles.map(r => employeeCounts[r]),
          backgroundColor: [
            'rgba(41, 155, 99, 1)',
            'rgba(54, 162, 215, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

  } catch (err) {
    console.error("Error rendering charts:", err);
  }
});


// const ctx = document.getElementById('lineChart');

// new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['Jan', 'Feb', 'March', 'April', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Dec'],
//     datasets: [{
//       label: 'Earnings in shs',
//       data: [2050, 1900, 3000, 1000, 3000, 2500, 3000, 4000, 6000, 4000, 3000, 4000],
//       backgroundColor: [
//         'rgba(85,85,85,1)'
//       ],
//       borderColor: [
// 'rgb(41,155,99)'
//       ],
      
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

// //pie chart
// const pie = document.getElementById('doughnut');

// new Chart(pie, {
//   type: 'doughnut',
//   data: {
//     labels: ['Director', 'Managers', 'SalesAgents', 'Others'],
//     datasets: [{
//       label: 'Employees',
//       data: [1, 2, 3, ''],
//       backgroundColor: [
//         'rgba(41, 155, 99, 1)',
//         'rgba(54, 162, 215, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(120, 46, 139, 1)'
//       ],
//       borderColor: [
//         'rgba(41, 155, 99, 1)',
//         'rgba(54, 162, 215, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(120, 46, 139, 1)'
//       ],
      
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });