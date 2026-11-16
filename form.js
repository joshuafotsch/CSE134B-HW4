// Field Elements
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const commentField = document.querySelector("#comments");

const submitButton = document.querySelector("#form-submit");
const formElement = document.querySelector("form");

// Helper functions
function validateEmail(element) {
  let errorString = "";
  let numOfAts = element.value.split("@").length - 1;
  if (numOfAts === 0) {
    errorString += `- @ symbol missing\n`;
  } else if (numOfAts > 1) {
    errorString += `- @ symbol occurs more than once\n`;
  }

  let numOfPeriods = element.value.split(".").length - 1;
  if (numOfPeriods === 0) {
    errorString += "- Domain missing. eg: .com, .net, etc..";
  }

  if (!errorString && !element.validity.valid) {
    errorString = "- Enter an email like name@example.com\n";
  }

  return errorString;
}

function validateLength(element) {
  let errorString = "";

  if (element.value.length < element.minLength) {
    errorString += `- At least ${element.minLength} characters\n`;
  } else if (element.validity.tooLong === true) {
    errorString += `- ${element.value.length - element.maxLength} too many chars\n`;
  }
  return errorString;
}

function getCharsRemaining(element) {
  const maxChars = element.maxLength;
  return maxChars - element.value.length;
}

// Gets error message based off of validity
function getErrorMessage(element) {
  if (element.validity.valueMissing === true) {
    return `- input is required\n`;
  }
  let errorString = "";

  errorString += validateLength(element);

  if (element.type === "email") {
    errorString += validateEmail(element);
  }
  return errorString;
}

// populates the error elements on screen
function displayValidate(element) {
  // console.log(element.checkValidity());
  // console.log(element.validity);
  element.setCustomValidity("");
  let errorElement = document.querySelector(`#${element.id}-error`);
  const errorMessage = getErrorMessage(element);

  if (errorMessage) {
    errorElement.removeAttribute("hidden");
    errorElement.textContent = errorMessage;
    element.setCustomValidity(errorMessage);
  } else {
    errorElement.setAttribute("hidden", "");
  }
}

// toggles if the chars remaining should be shown
function toggleCharsRemaining(element, isShown) {
  const elementInfo = document.querySelector(`#${element.id}-info .char-limit`);
  elementInfo.setAttribute("hidden", "");
  elementInfo.classList.remove("low");

  if (!isShown) return;

  let charCount = getCharsRemaining(element);
  let displayString = `${getCharsRemaining(element)} chars remaining`;
  if (charCount <= 0.1 * element.maxLength) {
    elementInfo.classList.add("low");
  }
  if (charCount == 0) {
    displayString = "No More Characters";
  }

  elementInfo.textContent = displayString;
  elementInfo.removeAttribute("hidden");
}

// Logger
function logInvalidAttempts() {}

// Event Handlers
nameField.addEventListener("focusin", function () {
  toggleCharsRemaining(this, true); // shows char count
});

nameField.addEventListener("input", function () {
  toggleCharsRemaining(this, true); // updates char count
});

nameField.addEventListener("change", function () {
  displayValidate(this); // displays errors if any
});

nameField.addEventListener("focusout", function () {
  toggleCharsRemaining(this, false); // hides char count
});

commentField.addEventListener("focusin", function () {
  toggleCharsRemaining(this, true); // show char count
});
commentField.addEventListener("input", function () {
  toggleCharsRemaining(this, true); // show char count

  // if error showing check if fixed
  const errorElement = document.querySelector(`#${this.id}-error`);
  console.log(errorElement);
  if (errorElement.textContent) {
    displayValidate(this);
  }
});

commentField.addEventListener("change", function () {
  displayValidate(this);
});
commentField.addEventListener("focusout", function () {
  toggleCharsRemaining(this, false);
});

emailField.addEventListener("change", function () {
  displayValidate(this); // display errors if any
});

emailField.addEventListener("input", function () {
  // if error showing check if fixed
  const errorElement = document.querySelector(`#${this.id}-error`);
  if (errorElement.textContent) {
    displayValidate(this);
  }
});

formElement.addEventListener(
  "invalid",
  (e) => {
    displayValidate(e.target); // show the error on the page
    form_errors.push({
      field: e.target.name,
      error: e.target.validationMessage,
    });
  },
  true,
);
