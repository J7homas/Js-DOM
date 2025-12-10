/*
As a user, I want to be able to select numbers so that I can perform operations with them.
As a user, I want to be able to add two numbers together.
As a user, I want to be able to subtract one number from another.
As a user, I want to be able to multiply two numbers together.
As a user, I want to be able to divide one number by another.
As a user, I want to be able to see the output of the mathematical operation.
As a user, I want to be able to clear all operations and start from 0.
 */


/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');

const error_msg = "Error, can't divide by zero!";
const add_numbers = (a, b) => a + b;
const subtract_numbers = (a, b) => a - b;
const multiply_numbers = (a, b) => a * b;
const divide_numbers = (a, b) => (b === 0 ? error_msg : a / b);

const displayElement = document.getElementById('output');

/*-------------------------------- Variables --------------------------------*/
let first_value = '';
let second_value = '';
let current_operator = '';
let should_reset_display = false;

/*-------------------------------- Functions --------------------------------*/
function update_display(val) {
  displayElement.innerText = val;
}

function clear_all() {
  first_value = '';
  second_value = '';
  current_operator = '';
  should_reset_display = false;
  update_display('0');
}

function event_button(event) {
  const value = event.target.innerText.trim();
  const is_number = event.target.classList.contains("number");
  const is_operator = event.target.classList.contains("operator");

  // Clear button (C)
  if (value === 'C') {
    clear_all();
    return;
  }

  // Equals button
  if (value === '=') {
    evaluate_expression();
    return;
  }

  // Number pressed
  if (is_number) {
    if (should_reset_display) {
      second_value = '';
      should_reset_display = false;
    }
    second_value += value;
    update_display(second_value);
    return;
  }

  // Operator pressed (+, -, *, /)
  if (is_operator) {
    // If there's already a pending operation and second_value, evaluate first
    if (first_value && second_value && current_operator) {
      evaluate_expression();
    }
    current_operator = value;
    first_value = second_value || first_value; // allow chaining even if user presses op twice
    second_value = '';
    should_reset_display = true;
  }
}

function evaluate_expression() {
  if (!first_value || !second_value || !current_operator) return;

  const num1 = Number(first_value);
  const num2 = Number(second_value);

  let result;

  switch (current_operator) {
    case "+":
      result = add_numbers(num1, num2);
      break;
    case "-":
      result = subtract_numbers(num1, num2);
      break;
    case "*":
      result = multiply_numbers(num1, num2);
      break;
    case "/":
      result = divide_numbers(num1, num2);
      break;
    default:
      return;
  }

  update_display(result);

  first_value = result.toString();
  second_value = "";
  current_operator = "";
  should_reset_display = true;
}

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener('click', event_button);
});
