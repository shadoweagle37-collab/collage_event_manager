/*
==========================================================
College Event Management System
File: validation.js

Purpose:
Reusable validation functions
==========================================================
*/

// ==========================================
// Show Error
// ==========================================

function showError(input, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    const error = document.getElementById(input.id + "Error");

    if (error) {
        error.textContent = message;
    }

}

// ==========================================
// Show Success
// ==========================================

function showSuccess(input) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    const error = document.getElementById(input.id + "Error");

    if (error) {
        error.textContent = "";
    }

}

// ==========================================
// Name Validation
// ==========================================

function validateName(input) {

    const value = input.value.trim();

    const regex = /^[A-Za-z ]{3,}$/;

    if (value === "") {

        showError(input, "Name is required.");

        return false;

    }

    if (!regex.test(value)) {

        showError(input, "Minimum 3 letters. Alphabets only.");

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Email Validation
// ==========================================

function validateEmail(input) {

    const value = input.value.trim();

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {

        showError(input, "Email is required.");

        return false;

    }

    if (!regex.test(value)) {

        showError(input, "Enter a valid email.");

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Phone Validation
// ==========================================

function validatePhone(input) {

    const value = input.value.trim();

    const regex = /^[0-9]{10}$/;

    if (value === "") {

        showError(input, "Phone number is required.");

        return false;

    }

    if (!regex.test(value)) {

        showError(input, "Phone must contain exactly 10 digits.");

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Select Validation
// ==========================================

function validateSelect(input, message = "Please select an option.") {

    if (input.value === "") {

        showError(input, message);

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Textarea Validation
// ==========================================

function validateAddress(input) {

    const value = input.value.trim();

    if (value.length < 10) {

        showError(input, "Address must contain at least 10 characters.");

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Roll Number
// ==========================================

function validateRoll(input) {

    if (input.value.trim() === "") {

        showError(input, "Roll Number is required.");

        return false;

    }

    showSuccess(input);

    return true;

}

// ==========================================
// Gender Validation
// ==========================================

function validateGender() {

    const gender =
    document.querySelector(
        'input[name="gender"]:checked'
    );

    const error =
    document.getElementById("genderError");

    if (!gender) {

        error.textContent =
        "Please select gender.";

        return false;

    }

    error.textContent = "";

    return true;

}

// ==========================================
// Terms Validation
// ==========================================

function validateTerms() {

    const checkbox =
    document.getElementById("terms");

    const error =
    document.getElementById("termsError");

    if (!checkbox.checked) {

        error.textContent =
        "You must accept the Terms & Conditions.";

        return false;

    }

    error.textContent = "";

    return true;

}

// ==========================================
// Real-Time Validation
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("name")
        .addEventListener("input", function () {
            validateName(this);
        });

    document.getElementById("email")
        .addEventListener("input", function () {
            validateEmail(this);
        });

    document.getElementById("phone")
        .addEventListener("input", function () {
            validatePhone(this);
        });

    document.getElementById("department")
        .addEventListener("change", function () {
            validateSelect(this);
        });

    document.getElementById("year")
        .addEventListener("change", function () {
            validateSelect(this);
        });

    document.getElementById("event")
        .addEventListener("change", function () {
            validateSelect(this);
        });

    document.getElementById("address")
        .addEventListener("input", function () {
            validateAddress(this);
        });

    document.getElementById("roll")
        .addEventListener("input", function () {
            validateRoll(this);
        });

    document.getElementById("emergency")
        .addEventListener("input", function () {
            validatePhone(this);
        });

});