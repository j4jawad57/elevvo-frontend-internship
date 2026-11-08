const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

// Show an error under a field
function showError(input, message) {
  input.parentElement.classList.add("invalid");
  document.getElementById(input.id + "Error").textContent = message;
}

// Remove the error from a field
function clearError(input) {
  input.parentElement.classList.remove("invalid");
  document.getElementById(input.id + "Error").textContent = "";
}

// Check one field. Returns true if it is OK.
function validateField(input) {
  const value = input.value.trim();
  clearError(input);

  if (value === "") {
    showError(input, "This field is required.");
    return false;
  }

  if (input.id === "email") {
    // simple email pattern: something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(input, "Please enter a valid email address.");
      return false;
    }
  }

  if (input.id === "message" && value.length < 10) {
    showError(input, "Message must be at least 10 characters.");
    return false;
  }

  return true;
}

const fields = form.querySelectorAll("input, textarea");

// Check each field when the user leaves it, and fix errors while typing
fields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.parentElement.classList.contains("invalid")) validateField(field);
  });
});

// When the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();            // stop the page from reloading
  successMsg.textContent = "";

  let allValid = true;
  fields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });

  if (allValid) {
    successMsg.textContent = "Thank you! Your message has been sent.";
    form.reset();
  } else {
    // Move focus to the first field with an error
    form.querySelector(".invalid input, .invalid textarea").focus();
  }
});
