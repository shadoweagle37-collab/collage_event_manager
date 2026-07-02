/*
==========================================================
Collage Event Management System
File: register.js

Purpose:
- Load event dropdown
- Auto-select event from URL
- Register participant
- Prevent duplicate registrations
- Update available seats
==========================================================
*/

// ======================================
// DOM Elements
// ======================================

const form = document.getElementById("registrationForm");

const eventSelect = document.getElementById("event");

// ======================================
// Load Events
// ======================================

function loadEvents() {

    const events = getEvents();

    eventSelect.innerHTML =
        '<option value="">Select Event</option>';

    events.forEach(event => {

        if (event.availableSeats > 0) {

            eventSelect.innerHTML += `

            <option value="${event.id}">

                ${event.title}
                (${event.availableSeats} Seats Left)

            </option>

            `;

        }

    });

}

// ======================================
// Auto Select Event
// ======================================

function preSelectEvent() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("event");

    if (id) {

        eventSelect.value = id;

    }

}

// ======================================
// Duplicate Registration
// ======================================

function alreadyRegistered(email, eventId) {

    const participants = getParticipants();

    return participants.some(participant =>

        participant.email.toLowerCase() === email.toLowerCase()

        &&

        Number(participant.eventId) === Number(eventId)

    );

}

// ======================================
// Update Available Seats
// ======================================

function reduceSeat(eventId) {

    const events = getEvents();

    const selected = events.find(

        event => event.id == eventId

    );

    if (!selected) {

        return false;

    }

    if (selected.availableSeats <= 0) {

        return false;

    }

    selected.availableSeats--;

    updateEvent(selected);

    return true;

}

// ======================================
// Form Submit
// ======================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
    document.getElementById("name");

    const email =
    document.getElementById("email");

    const phone =
    document.getElementById("phone");

    const department =
    document.getElementById("department");

    const year =
    document.getElementById("year");

    const address =
    document.getElementById("address");

    const roll =
    document.getElementById("roll");

    const emergency =
    document.getElementById("emergency");

    // ---------------------------
    // Validation
    // ---------------------------

    const valid =

        validateName(name)

        &&

        validateEmail(email)

        &&

        validatePhone(phone)

        &&

        validateSelect(department)

        &&

        validateSelect(year)

        &&

        validateSelect(eventSelect)

        &&

        validateAddress(address)

        &&

        validateRoll(roll)

        &&

        validatePhone(emergency)

        &&

        validateGender()

        &&

        validateTerms();

    if (!valid) {

        showToast(

            "Please correct the form.",

            "#EF4444"

        );

        return;

    }

    // ---------------------------
    // Duplicate Check
    // ---------------------------

    if (

        alreadyRegistered(

            email.value,

            eventSelect.value

        )

    ) {

        showToast(

            "You have already registered for this event.",

            "#EF4444"

        );

        return;

    }

    // ---------------------------
    // Seat Check
    // ---------------------------

    if (!reduceSeat(eventSelect.value)) {

        showToast(

            "No seats available.",

            "#EF4444"

        );

        return;

    }

    // ---------------------------
    // Gender
    // ---------------------------

    const gender =

    document.querySelector(

        'input[name="gender"]:checked'

    ).value;

    // ---------------------------
    // Save Participant
    // ---------------------------

    addParticipant({

        name: name.value.trim(),

        email: email.value.trim(),

        phone: phone.value.trim(),

        department: department.value,

        year: year.value,

        gender: gender,

        eventId: Number(eventSelect.value),

        address: address.value.trim(),

        roll: roll.value.trim(),

        emergency: emergency.value.trim()

    });

    // ---------------------------
    // Success
    // ---------------------------

    showToast(

        "Registration Successful!"

    );

    form.reset();

    loadEvents();

    setTimeout(() => {

        window.location.href =

        "events.html";

    }, 1500);

});

// ======================================
// Initialize
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadEvents();

        preSelectEvent();

    }

);