'use strict';

const input_day = document.querySelector('#input__day');
const input_month = document.querySelector('#input__month');
const input_year = document.querySelector('#input__year');
const labelDay = document.querySelector('.label__day');
const labelMonth = document.querySelector('.label__month');
const labelYear = document.querySelector('.label__year');
const requiredDay = document.querySelector('.error-required-day');
const requiredMonth = document.querySelector('.error-required-month');
const requiredYear = document.querySelector('.error-required-year');
const errorDay = document.querySelector('.error-day');
const errorMonth = document.querySelector('.error-month');
const errorYear = document.querySelector('.error-year');
const outputDay = document.querySelector('.output__day-input');
const outputMonth = document.querySelector('.output__month-input');
const outputYear = document.querySelector('.output__year-input');

const calcAgeBtn = document.querySelector('.logo-validate');

function validateAgeForm() {
  // this is the day validation
  const day = input_day.value;
  input_day.value = input_day.value.replace(/[^0-9]/g, '');

  if (day === '' || input_day.value !== day) {
    labelDay.style.color = 'hsl(0, 100%, 67%)';
    requiredDay.style.display = 'block';
    input_day.style.border = '1px solid hsl(0, 100%, 67%)';
    // return false;
  } else if (day === 0 || day > 31 || day < 0) {
    labelDay.style.color = 'hsl(0, 100%, 67%)';
    errorDay.style.display = 'block';
    input_day.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else {
    errorDay.style.display = 'none';
    requiredDay.style.display = 'none';
    labelDay.style.color = 'hsl(0, 1%, 44%)';
    input_day.style.border = '1px solid hsl(0, 0%, 86%)';
  }

  // this is the month validation
  const month = input_month.value;
  input_month.value = input_month.value.replace(/[^0-9]/g, '');

  if (month === '' || input_month.value !== month) {
    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    requiredMonth.style.display = 'block';
    input_month.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else if (month === 0 || month > 12 || month < 0) {
    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    errorMonth.style.display = 'block';
    input_month.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else {
    errorMonth.style.display = 'none';
    requiredMonth.style.display = 'none';
    labelMonth.style.color = 'hsl(0, 1%, 44%)';
    input_month.style.border = '1px solid hsl(0, 0%, 86%)';
  }

  // this is the year validation
  const year = input_year.value;
  input_year.value = input_year.value.replace(/[^0-9]/g, '');
  const now = new Date();
  const yearNow = now.getFullYear();

  if (year === '') {
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    requiredYear.style.display = 'block';
    input_year.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else if (year === 0 || year > yearNow || year < 0) {
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    errorYear.style.display = 'block';
    input_year.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else if (year.length !== 4) {
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    errorYear.style.display = 'block';
    input_year.style.border = '1px solid hsl(0, 100%, 67%)';
    return false;
  } else {
    errorYear.style.display = 'none';
    requiredYear.style.display = 'none';
    labelYear.style.color = 'hsl(0, 1%, 44%)';
    input_year.style.border = '1px solid hsl(0, 0%, 86%)';
  }

  calculateAge(day, month, year);
  isValidDate(day, month, year);

  // console.log(yearNow);
  // console.log(day);
}

function calculateAge(day, month, year) {
  const dob = new Date(year, month - 1, day);
  const now = new Date();

  let ageInYears = now.getFullYear() - dob.getFullYear();
  let ageInMonths = now.getMonth() - dob.getMonth();
  let ageInDays = now.getDate() - dob.getDate();

  // Adjust for negative days
  if (ageInDays < 0) {
    ageInMonths -= 1;

    // Get days in previous month
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    ageInDays += previousMonth.getDate();
  }

  // Adjust for negative months
  if (ageInMonths < 0) {
    ageInYears -= 1;
    ageInMonths += 12;
  }

  outputDay.textContent = `${ageInDays}`;
  outputMonth.textContent = `${ageInMonths}`;
  outputYear.textContent = `${ageInYears}`;

  // console.log(`${ageInYears} years`);
  // console.log(`${ageInMonths} months`);
  // console.log(`${ageInDays} days`);
}

function invalidDateDetails() {
  outputDay.textContent = '- -';
  outputMonth.textContent = '- -';
  outputYear.textContent = '- -';
}

function isValidDate(day, month, year) {
  // month is 1-indexed for this function
  const daysInMonth = new Date(year, month, 0).getDate();

  if (day > daysInMonth) {
    errorDay.style.display = 'block';
    invalidDateDetails();
    return false;
  } else {
    errorDay.style.display = 'none';
  }
}

// making sure there are no letters and border is showing

input_day.addEventListener('input', function () {
  input_day.value = input_day.value.replace(/[^0-9]/g, '');
});

input_month.addEventListener('input', function () {
  input_month.value = input_month.value.replace(/[^0-9]/g, '');
});

input_year.addEventListener('input', function () {
  input_year.value = input_year.value.replace(/[^0-9]/g, '');
});

calcAgeBtn.addEventListener('click', validateAgeForm);
