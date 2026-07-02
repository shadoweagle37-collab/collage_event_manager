/*
==========================================================
College Event Management System
File: participants.js

Purpose
- Display participants
- Search
- Filter
- Sort
- Edit/Delete (Part 2)
- CSV Export (Part 2)
==========================================================
*/

// ======================================
// DOM ELEMENTS
// ======================================

const participantTable =
document.getElementById("participantTable");

const searchName =
document.getElementById("searchName");

const searchDepartment =
document.getElementById("searchDepartment");

const searchEvent =
document.getElementById("searchEvent");

const sortParticipant =
document.getElementById("sortParticipant");

const confirmModal =
document.getElementById("confirmModal");

const confirmDelete =
document.getElementById("confirmDelete");

const cancelDelete =
document.getElementById("cancelDelete");

const downloadCSV =
document.getElementById("downloadCSV");

// ======================================
// DATA
// ======================================

let participants = getParticipants();

let events = getEvents();

let deleteId = null;

// ======================================
// EVENT NAME
// ======================================

function getEventName(id){

    const event = events.find(

        e => e.id == id

    );

    return event
        ? event.title
        : "Unknown";

}

// ======================================
// CREATE TABLE ROW
// ======================================

function createRow(participant){

    return `

<tr>

<td>${participant.id}</td>

<td>${participant.name}</td>

<td>${participant.email}</td>

<td>${participant.phone}</td>

<td>${participant.department}</td>

<td>${participant.year}</td>

<td>${participant.gender}</td>

<td>${getEventName(participant.eventId)}</td>

<td>${participant.registrationDate}</td>

<td>

<button
class="btn primary-btn edit-btn"
data-id="${participant.id}">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="btn secondary-btn delete-btn"
data-id="${participant.id}">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

}

// ======================================
// RENDER TABLE
// ======================================

function renderTable(list){

    participantTable.innerHTML = "";

    if(list.length===0){

        participantTable.innerHTML = `

<tr>

<td colspan="10"
style="text-align:center;">

No Participants Found

</td>

</tr>

`;

        return;

    }

    list.forEach(participant=>{

        participantTable.innerHTML +=

        createRow(participant);

    });

    attachActionEvents();

}

// ======================================
// FILTER
// ======================================

function filterParticipants(){

    let filtered = [...participants];

    const name =

    searchName.value

    .trim()

    .toLowerCase();

    const department =

    searchDepartment.value

    .trim()

    .toLowerCase();

    const event =

    searchEvent.value

    .trim()

    .toLowerCase();

    if(name){

        filtered = filtered.filter(item=>

            item.name

            .toLowerCase()

            .includes(name)

        );

    }

    if(department){

        filtered = filtered.filter(item=>

            item.department

            .toLowerCase()

            .includes(department)

        );

    }

    if(event){

        filtered = filtered.filter(item=>

            getEventName(item.eventId)

            .toLowerCase()

            .includes(event)

        );

    }

    // --------------------
    // SORTING
    // --------------------

    switch(sortParticipant.value){

        case "name":

            filtered.sort((a,b)=>

            a.name.localeCompare(b.name)

            );

            break;

        case "department":

            filtered.sort((a,b)=>

            a.department.localeCompare(

            b.department

            ));

            break;

        case "event":

            filtered.sort((a,b)=>

            getEventName(a.eventId)

            .localeCompare(

            getEventName(b.eventId)

            ));

            break;

        case "date":

            filtered.sort((a,b)=>

            new Date(b.registrationDate)

            -

            new Date(a.registrationDate)

            );

            break;

    }

    renderTable(filtered);

}

// ======================================
// SEARCH EVENTS
// ======================================

searchName.addEventListener(

"input",

filterParticipants

);

searchDepartment.addEventListener(

"input",

filterParticipants

);

searchEvent.addEventListener(

"input",

filterParticipants

);

sortParticipant.addEventListener(

"change",

filterParticipants

);

// ======================================
// ACTION BUTTONS
// (Functions added in Part 2)
// ======================================

function attachActionEvents(){

    document

    .querySelectorAll(".edit-btn")

    .forEach(button=>{

        button.addEventListener(

        "click",

        ()=>{

            editParticipant(

            Number(

            button.dataset.id

            ));

        });

    });

    document

    .querySelectorAll(".delete-btn")

    .forEach(button=>{

        button.addEventListener(

        "click",

        ()=>{

            openDeleteModal(

            Number(

            button.dataset.id

            ));

        });

    });

}

// ======================================
// INITIAL LOAD
// ======================================

document.addEventListener(

"DOMContentLoaded",

()=>{

    participants = getParticipants();

    events = getEvents();

    renderTable(participants);

});