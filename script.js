'use strict';

// Selecting elements
const form = document.querySelector('.js-form');
const inputs = document.querySelectorAll('.js-input');
const alerts = document.querySelectorAll('.js-alert');
const button = document.querySelector('.js-button');
const inputEmail = document.querySelector('.js-input[type="email"]');

// FUNCTIONS
const isEmpty = (input) => (input.value === '' ? true : false);

const isValidEmail = function () {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regexEmail.test(inputEmail.value);
};

const showAlert = function (input, type = 'text') {
  const alert = [...alerts].find((a) => a.id === `${input.name}-alert`);

  input.dataset.valid = 'false';

  if (type === 'email') alert.textContent = `Looks like this is not an email`;
  else alert.textContent = `${input.placeholder} cannot be empty`;
};

const hideAlert = function (input) {
  const alert = [...alerts].find((a) => a.id === `${input.name}-alert`);

  input.dataset.valid = 'true';
  alert.textContent = '';
};

const validatedSubmit = function () {
  if ([...inputs].every((input) => !isEmpty(input)) && isValidEmail(inputEmail)) return true;
  else return false;
};

// EVENT HANDLERS
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Mini load animation...
  button.classList.add('button--loading');
  button.addEventListener('animationend', () => {
    button.classList.remove('button--loading'), { once: true };

    // Show/hide alerts
    inputs.forEach((input) => {
      if (isEmpty(input)) showAlert(input);
      else hideAlert(input);
    });

    if (!isEmpty(inputEmail)) {
      if (!isValidEmail(inputEmail)) showAlert(inputEmail, 'email');
      else hideAlert(inputEmail);
    }

    if (validatedSubmit()) {
      // Submited
      button.classList.add('button--ok');
      button.addEventListener('animationend', function () {
          button.classList.remove('button--ok');
          inputs.forEach(input => input.value = '');
        }, { once: true }
      );
    }
  });
});

// FUNCTION: Verify if input field is empty
//    If empty: show alert

// FUNCTION: Validade email
//    If invalid: show message 'Looks like this is not an email'

// FUNCTION: show alert

// FUNCTION: listen for submit the form
//    onSubmit() => show load (add class 'button--loading') =>
//    => after load => verify if is empty

// On focus out the email => validade email
