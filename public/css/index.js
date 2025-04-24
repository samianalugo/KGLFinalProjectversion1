console.log("i am connected");
//this code is for form submission
/*
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent actual form submission

        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let branch = document.getElementById("branch").value;
        let role = document.getElementById("role").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let errorMessage = document.getElementById("errorMessage");

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = "Password must be at least 6 characters long!";
            return;
        }

        errorMessage.textContent = ""; // Clear error messages if everything is fine
        alert(`Account created successfully for ${fullName}!`);
        
        // Here you can add an API request to send the form data to the server
    });

    //storing data of the bar chat
    
    // Get the canvas element
    var ctx = document.getElementById('myBarChart').getContext('2d');*/

    // Create the bar chart

var xValues = ["jan", "feb", "mar", "apr", "may","jun", "jul","aug","sep","oct","nov","dec"];
var yValues = [55, 49, 44, 24, 15, 20, 59,45,67,12,45,60];
var barColors = ["red", "green","blue","orange","brown","pink","green","purple","white","red","blue","indigo"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "KGL production"
    }
  }
});
