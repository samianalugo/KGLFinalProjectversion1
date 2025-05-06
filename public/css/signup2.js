document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      let isValid = true;
  
      // Full Name
      const fullName = document.getElementById("fullName");
      if (!fullName.value.trim()) {
        alert("Full name is required.");
        isValid = false;
      }
  
      // Email
      const username = document.getElementById("username");
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!username.value.trim()) {
        alert("Email is required.");
        isValid = false;
      } else if (!emailPattern.test(username.value.trim())) {
        alert("Please enter a valid email address.");
        isValid = false;
      }
  
      // Password
      const password = document.getElementById("password");
      const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!password.value.trim()) {
        alert("Password is required.");
        isValid = false;
      } else if (!strongPasswordPattern.test(password.value)) {
        alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        isValid = false;
      }
  
      // Phone Number
      const phone = document.getElementById("phoneNumber");
      const phonePattern = /^\d{10,}$/;
      if (!phone.value.trim()) {
        alert("Phone number is required.");
        isValid = false;
      } else if (!phonePattern.test(phone.value.trim())) {
        alert("Please enter a valid phone number with at least 10 digits.");
        isValid = false;
      }
  
      // Gender
      const gender = document.querySelector("input[name='gender']:checked");
      if (!gender) {
        alert("Please select your gender.");
        isValid = false;
      }
  
      // Role
      const role = document.querySelector("input[name='role']:checked");
      if (!role) {
        alert("Please select a role.");
        isValid = false;
      }
  
      // Branch (only required if role is NOT director)
      const branch = document.querySelector("input[name='branch']:checked");
      if (role && role.value !== "director" && !branch) {
        alert("Please select a branch.");
        isValid = false;
      }
  
      if (!isValid) e.preventDefault();
    });
  });
  