document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", validateUserForm);
});

const validateUserForm = (e) => {
  const fullName = document.getElementById("fullname");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const gender = document.querySelector("input[name = 'gender']:checked");
  const phoneNumber = document.getElementById("phoneNumber");
  const role = document.querySelector('input[name="role"]:checked');
  const branch = document.querySelector('input[name="branch"]:checked');
  

  // Clear previous error messages for all fields
  document.getElementById("fullNameError").textContent = "enter your full name.";
  document.getElementById("emailError").textContent = "enter a valid email.";
  document.getElementById("passwordError").textContent = "enter a valid password.";
  document.getElementById("branchError").textContent = "please select branch.";
  document.getElementById("genderError").textContent = "please select gender.";
  document.getElementById("phoneNumberError").textContent = "enter a valid phone number.";
  document.getElementById("roleError").textContent = "please select role";
  
 
  let errorCount = 0;
  //string validation
  const nameRegex = /^[A-Za-z\s]{2,100}$/;
  if (!nameRegex.test(fullName.value.trim())) {
    fullName.style.border = "1px solid red";
    document.getElementById("fullNameError").style.color = "red";
    document.getElementById("fullNameError").textContent =
      "enter a valid full name. Alphabet characters only from 2-200";
    errorCount++;
  } else {
    fullName.style.border = "1px solid green";
    document.getElementById("fullNameError").textContent = "";
  }

  //email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.style.border = "1px solid red";
    document.getElementById("emailError").style.color = "red";
    document.getElementById("emailError").textContent = "enter a valid email.";
    errorCount++;
  } else {
    email.style.border = "1px solid green";
    document.getElementById("emailError").textContent = "";
  }

  //validating a password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordRegex.test(password.value.trim())) {
    password.style.border = "1px solid red";
    document.getElementById("passwordError").style.color = "red";
    document.getElementById("passwordError").textContent =
      "enter a valid password.";
    errorCount++;
  } else {
    password.style.border = "1px solid green";
    document.getElementById("passwordError").textContent = "";
  }

  //validate a phone number
  const phoneNumberregex = /^256\d{9}$/;
  if (!phoneNumberregex.test(phoneNumber.value.trim())) {
    phoneNumber.style.border = "1px solid red";
    document.getElementById("phoneNumberError").style.color = "red";
    document.getElementById("phoneNumberError").textContent =
      "enter a valid phone number.";
    errorCount++;
  } else {
    phoneNumber.style.border = "1px solid green";
    document.getElementById("phoneNumberError").textContent = "";
  }
  //validating a radio button
  if (!gender) {
    document.getElementById("genderError").style.color = "red";
    document.getElementById("genderError").textContent =
      "Please select your gender";
    errorCount++;
  } else {
    document.getElementById("genderError").textContent = "";
  }
  //validating role
  if (!role) {
    document.getElementById("roleError").style.color = "red";
    document.getElementById("roleError").textContent =
      "Please select your role";
    errorCount++;
  } else {
    document.getElementById("roleError").textContent = "";
  }
  //validating branch
  if (!branch) {
    document.getElementById("branchError").style.color = "red";
    document.getElementById("branchError").textContent =
      "Please select your branch";
    errorCount++;
  } else {
    document.getElementById("branchError").textContent = "";
  }

  if (errorCount > 0) {
    e.preventDefault();
    return false;
  }
  return true;

  
};
