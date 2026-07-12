/*=========================================================
                REGISTER PAGE
=========================================================*/

"use strict";

/*=========================================================
                DOM ELEMENTS
=========================================================*/

const registrationForm = document.getElementById(
    "eventRegistrationForm"
);

const eventSelect = document.getElementById(
    "eventSelect"
);

const summaryImage = document.getElementById(
    "summaryImage"
);

const summaryTitle = document.getElementById(
    "summaryTitle"
);

const summaryDescription = document.getElementById(
    "summaryDescription"
);

const summaryDate = document.getElementById(
    "summaryDate"
);

const summaryTime = document.getElementById(
    "summaryTime"
);

const summaryVenue = document.getElementById(
    "summaryVenue"
);

const summarySeats = document.getElementById(
    "summarySeats"
);

const summaryCategory = document.getElementById(
    "summaryCategory"
);

const summaryPrice = document.getElementById(
    "summaryPrice"
);

const registrationProgressFill = document.getElementById(
    "registrationProgress"
);

const progressText = document.getElementById(
    "progressText"
);

const successModal = document.getElementById(
    "successModal"
);

const processingOverlay = document.getElementById(
    "processingOverlay"
);

/*=========================================================
                APPLICATION STATE
=========================================================*/

let selectedEvent = null;

let registrationEvents = [];

let participants = [];

/*=========================================================
                LOAD EVENTS
=========================================================*/

function loadEvents() {

    registrationEvents = Storage.getEvents();

    eventSelect.innerHTML = `
        <option value="">
            Select an Event
        </option>
    `;

    registrationEvents
        .filter(event => event.availableSeats > 0)
            .forEach(event => {

            const option = document.createElement("option");

            option.value = event.id;

            option.textContent =
                `${event.title} (${event.availableSeats} Seats Left)`;

            eventSelect.appendChild(option);

        });

}

/*=========================================================
                UPDATE EVENT SUMMARY
=========================================================*/

function updateEventSummary(eventId) {

    selectedEvent = registrationEvents.find(

        event => event.id === Number(eventId)

    );

    if (!selectedEvent) {

        summaryImage.src = "images/placeholder-event.jpg";

        summaryTitle.textContent = "Select an Event";

        summaryDescription.textContent =
            "Event details will appear here after selecting an event.";

        summaryDate.textContent = "--";

        summaryTime.textContent = "--";

        summaryVenue.textContent = "--";

        summarySeats.textContent = "--";

        summaryCategory.textContent = "--";

        summaryPrice.textContent = "--";

        return;

    }

    summaryImage.src =
        selectedEvent.image ||
        "images/placeholder-event.jpg";

    summaryTitle.textContent =
        selectedEvent.title;

    summaryDescription.textContent =
        selectedEvent.description;

    summaryDate.textContent =
        selectedEvent.date;

    summaryTime.textContent =
        selectedEvent.time;

    summaryVenue.textContent =
        selectedEvent.venue;

    summarySeats.textContent =
        selectedEvent.availableSeats;

    summaryCategory.textContent =
        selectedEvent.category;

    summaryPrice.textContent =
    selectedEvent.registrationFee === 0
        ? "Free"
        : `₹${selectedEvent.registrationFee}`;

}



/*=========================================================
                PRESELECT EVENT
=========================================================*/

function preSelectEvent() {

    const params = new URLSearchParams(

        window.location.search

    );

    const eventId = params.get("event");

    if (!eventId) {

        updateEventSummary("");

        return;

    }

    eventSelect.value = eventId;

    updateEventSummary(eventId);

}

eventSelect.addEventListener(

    "change",

    function () {

        updateEventSummary(

            this.value

        );

    }

);

/*=========================================================
                REGISTRATION PROGRESS
=========================================================*/

function updateProgress() {

    const fields = [

        document.getElementById("fullName"),

        document.getElementById("email"),

        document.getElementById("phone"),

        document.getElementById("department"),

        document.getElementById("year"),

        document.querySelector(

            'input[name="gender"]:checked'

        ),

        document.getElementById("eventSelect"),

        document.getElementById("terms")

    ];

    let completed = 0;

    fields.forEach(field => {

        if (!field) {

            return;

        }

        if (field.type === "checkbox") {

            if (field.checked) {

                completed++;

            }

        }

        else if (

            field.tagName === "SELECT"

        ) {

            if (field.value !== "") {

                completed++;

            }

        }

        else {

            if (

                field.value.trim() !== ""

            ) {

                completed++;

            }

        }

    });

    const percentage = Math.round(

        (completed / fields.length) * 100

    );

    registrationProgressFill.style.width =

        `${percentage}%`;

    progressText.textContent =

        `${percentage}% Completed`;

}

/*=========================================================
                LIVE PROGRESS EVENTS
=========================================================*/

function initializeProgressTracking() {

    const controls =

        registrationForm.querySelectorAll(

            "input, select, textarea"

        );

    controls.forEach(control => {

        control.addEventListener(

            "input",

            updateProgress

        );

        control.addEventListener(

            "change",

            updateProgress

        );

    });

}

/*=========================================================
                DISPLAY VALIDATION ERRORS
=========================================================*/

function clearValidationErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(error => {

            error.textContent = "";

        });

    document
        .querySelectorAll(".input-error")
        .forEach(input => {

            input.classList.remove("input-error");

        });

    document
        .querySelectorAll(".input-valid")
        .forEach(input => {

            input.classList.remove("input-valid");

        });

}



/*=========================================================
                SHOW FIELD ERROR
=========================================================*/

function showFieldError(fieldId, message) {

    const field = document.getElementById(fieldId);

    if (!field) return;

    field.classList.add("input-error");

    const error = field.parentElement.querySelector(
        ".error-message"
    );

    if (error) {

        error.textContent = message;

    }

}



/*=========================================================
                SHOW FIELD SUCCESS
=========================================================*/

function showFieldSuccess(fieldId) {

    const field = document.getElementById(fieldId);

    if (!field) return;

    field.classList.add("input-valid");

}



/*=========================================================
                VALIDATE FORM
=========================================================*/

function validateRegistrationForm() {

    clearValidationErrors();

    const selectedGender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const formData = {

        name: document.getElementById("fullName").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        department: document.getElementById("department").value,

        year: document.getElementById("year").value,

        gender: selectedGender
            ? selectedGender.value
            : "",

        eventId: eventSelect.value,

        terms: document.getElementById("terms").checked

    };

    const result = Validation.validateRegistration(
        formData
    );

    if (!result.valid) {

        Object.entries(result.errors).forEach(
            ([field, message]) => {

                const fieldMap = {

                    name: "fullName",

                    email: "email",

                    phone: "phone",

                    department: "department",

                    year: "year",

                    eventId: "eventSelect"

                };

                if (fieldMap[field]) {

                    showFieldError(
                        fieldMap[field],
                        message
                    );

                }

            }
        );

        return result;

    }

    showFieldSuccess("fullName");
    showFieldSuccess("email");
    showFieldSuccess("phone");
    showFieldSuccess("department");
    showFieldSuccess("year");
    showFieldSuccess("eventSelect");

    return result;

}

/*=========================================================
                REGISTER PARTICIPANT
=========================================================*/

function registerParticipant() {

    const result = validateRegistrationForm();

    if (!result.valid) {

        return false;

    }

    const data = result.data;

    /*---------------------------------------------
                FIND SELECTED EVENT
    ---------------------------------------------*/

    const event = Storage.getEvents().find(

        item => item.id === data.eventId

    );
    selectedEvent = event;

    if (!event) {

        alert("Selected event was not found.");

        return false;

    }

    if (event.availableSeats <= 0) {

        alert("Sorry! No seats are available.");

        return false;

    }

    /*---------------------------------------------
                UPDATE SEATS
    ---------------------------------------------*/

    event.availableSeats--;

    Storage.updateEvent(event);

    /*---------------------------------------------
                SAVE PARTICIPANT
    ---------------------------------------------*/

    const participant = Storage.addParticipant({

        name: data.name,

        email: data.email,

        phone: data.phone,

        department: data.department,

        year: data.year,

        gender: data.gender,

        eventId: data.eventId,

        notes: document
            .getElementById("notes")
            .value
            .trim()

    });

    /*---------------------------------------------
                REFRESH LOCAL DATA
    ---------------------------------------------*/

    registrationEvents = Storage.getEvents();

    participants = Storage.getParticipants();

    loadEvents();

   

    registrationForm.reset();

    updateProgress();

    return participant;

}

/*=========================================================
                PROCESSING OVERLAY
=========================================================*/

function showProcessingOverlay() {

    processingOverlay.classList.add("active");

}

function hideProcessingOverlay() {

    processingOverlay.classList.remove("active");

}



/*=========================================================
                SUCCESS MODAL
=========================================================*/

function showSuccessModal(participant) {

    document.getElementById(

        "modalRegistrationId"

    ).textContent = participant.registrationId;

    document.getElementById(

        "modalStudentName"

    ).textContent = participant.name;

    document.getElementById(

        "modalEventName"

    ).textContent =

        selectedEvent

        ? selectedEvent.title

        : "--";

    document.getElementById(

        "modalRegistrationDate"

    ).textContent =

        new Date(

            participant.registeredAt

        ).toLocaleDateString(

            "en-IN",

            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }

        );

    successModal.classList.add(

        "active"

    );

}

function hideSuccessModal() {

    successModal.classList.remove(

        "active"

    );

}



/*=========================================================
            COMPLETE REGISTRATION
=========================================================*/

function processRegistration() {

    showProcessingOverlay();

    setTimeout(() => {

        const participant =

            registerParticipant();

        hideProcessingOverlay();

        if (participant) {

            showSuccessModal(

                participant

            );

        }

    }, 1200);

}

/*=========================================================
                MODAL BUTTONS
=========================================================*/

/*=========================================================
                PRINT REGISTRATION RECEIPT
=========================================================*/

function printRegistrationReceipt() {

    const participant = Storage.getParticipants().at(-1);

    const event = Storage.getEvents().find(

    item => item.id === participant.eventId

);

if (!participant || !event) {

    alert("No registration data found.");

    return;

}

    const receiptWindow = window.open(

        "",

        "_blank",

        "width=850,height=900"

    );

    receiptWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<title>Registration Receipt</title>

<style>

body{

    font-family:Arial,sans-serif;

    background:#f5f5f5;

    padding:40px;

}

.receipt{

    max-width:700px;

    margin:auto;

    background:white;

    border-radius:12px;

    padding:40px;

    box-shadow:0 5px 20px rgba(0,0,0,.15);

}

h1{

    text-align:center;

    color:#4F46E5;

    margin-bottom:5px;

}

h3{

    text-align:center;

    color:#666;

    margin-top:0;

}

.success{

    text-align:center;

    color:#16A34A;

    font-size:22px;

    font-weight:bold;

    margin:30px 0;

}

table{

    width:100%;

    border-collapse:collapse;

}

td{

    padding:14px;

    border-bottom:1px solid #ddd;

}

td:first-child{

    font-weight:bold;

    width:35%;

}

.footer{

    margin-top:40px;

    text-align:center;

    color:#777;

}

</style>

</head>

<body>

<div class="receipt">

<h1>EventHub</h1>

<h3>College Event Management System</h3>

<div class="success">

✓ Registration Confirmed

</div>

<table>

<tr>

<td>Registration ID</td>

<td>${participant.registrationId}</td>

</tr>

<tr>

<td>Student Name</td>

<td>${participant.name}</td>

</tr>

<tr>

<td>Email</td>

<td>${participant.email}</td>

</tr>

<tr>

<td>Phone</td>

<td>${participant.phone}</td>

</tr>

<tr>

<td>Department</td>

<td>${participant.department}</td>

</tr>

<tr>

<td>Year</td>

<td>${participant.year}</td>

</tr>

<tr>

<td>Gender</td>

<td>${participant.gender}</td>

</tr>

<tr>

<td>Event</td>

<td>${event.title}</td>

</tr>

<tr>

<td>Venue</td>

<td>${event.venue}</td>

</tr>

<tr>

<td>Date</td>

<td>${event.date}</td>

</tr>

<tr>

<td>Time</td>

<td>${event.time}</td>

</tr>

<tr>

<td>Registration Date</td>

<td>${new Date(participant.registeredAt).toLocaleString()}</td>

</tr>

</table>

<div class="footer">

Keep this receipt for future verification.<br><br>

© EventHub 2026

</div>

</div>

</body>

</html>

    `);

    receiptWindow.document.close();

receiptWindow.onload = function () {

    receiptWindow.focus();

    receiptWindow.print();

    receiptWindow.onafterprint = function () {

        receiptWindow.close();

    };

};

}


document

    .getElementById(

        "registerAnother"

    )

    .addEventListener(

        "click",

        function () {

            hideSuccessModal();

        }

    );


    document

    .getElementById(

        "printRegistration"

    )

    .addEventListener(

        "click",

        function () {

            printRegistrationReceipt();

        }

    );



    /*=========================================================
                FORM SUBMIT
=========================================================*/

registrationForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();

        processRegistration();

    }

);



/*=========================================================
                PAGE INITIALIZATION
=========================================================*/

function initializeRegistrationPage() {

    loadEvents();

    preSelectEvent();

    initializeProgressTracking();

    updateProgress();

}



/*=========================================================
                DOM READY
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeRegistrationPage

);