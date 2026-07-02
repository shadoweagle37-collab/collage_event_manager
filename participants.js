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
/* ==========================================================
   PARTICIPANT EDIT
========================================================== */

function editParticipant(id){

    participants = getParticipants();

    const participant = participants.find(p => p.id === id);

    if(!participant){

        showToast("Participant not found.","#EF4444");

        return;

    }

    const newName = prompt(
        "Edit Name",
        participant.name
    );

    if(newName === null) return;

    const newPhone = prompt(
        "Edit Phone",
        participant.phone
    );

    if(newPhone === null) return;

    participant.name = newName.trim();

    participant.phone = newPhone.trim();

    saveParticipants(participants);

    showToast("Participant Updated");

    filterParticipants();

}

/* ==========================================================
   DELETE MODAL
========================================================== */

function openDeleteModal(id){

    deleteId = id;

    confirmModal.style.display = "flex";

}

cancelDelete.addEventListener(

"click",

()=>{

    confirmModal.style.display="none";

    deleteId = null;

});

window.addEventListener(

"click",

(e)=>{

    if(e.target===confirmModal){

        confirmModal.style.display="none";

        deleteId=null;

    }

});

/* ==========================================================
   DELETE PARTICIPANT
========================================================== */

confirmDelete.addEventListener(

"click",

()=>{

    if(deleteId===null) return;

const participant = participants.find(
    p => p.id === deleteId
);

if(participant){

    const events = getEvents();

    const event = events.find(
        e => e.id === participant.eventId
    );

    if(event){

        if(event.availableSeats < event.maxSeats){

            event.availableSeats++;

            updateEvent(event);

        }

    }

}

participants = participants.filter(
    p => p.id !== deleteId
);

saveParticipants(participants);

    showToast(

        "Participant Deleted",

        "#EF4444"

    );

    confirmModal.style.display="none";

    deleteId=null;

    filterParticipants();

});

/* ==========================================================
   CSV EXPORT
========================================================== */

downloadCSV.addEventListener(

"click",

()=>{

    participants = getParticipants();

    if(participants.length===0){

        showToast(

            "No Participants Found",

            "#EF4444"

        );

        return;

    }

    let csv =

`ID,Name,Email,Phone,Department,Year,Gender,Event,Registration Date\n`;

    participants.forEach(item=>{

        csv +=

`${item.id},"${item.name}","${item.email}","${item.phone}","${item.department}","${item.year}","${item.gender}","${getEventName(item.eventId)}","${item.registrationDate}"\n`;

    });

    const blob =

    new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href = url;

    link.download =

    "participants.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(

        "CSV Downloaded"

    );

});

/* ==========================================================
   STORAGE REFRESH
========================================================== */

window.addEventListener(

"storage",

()=>{

    participants=getParticipants();

    events=getEvents();

    filterParticipants();

});

/* ==========================================================
   OPTIONAL REFRESH
========================================================== */

function refreshParticipants(){

    participants=getParticipants();

    events=getEvents();

    filterParticipants();

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

    refreshParticipants();

});

/* ==========================================================
   KEYBOARD SHORTCUT
========================================================== */

document.addEventListener(

"keydown",

e=>{

    if(

        e.key==="Escape"

        &&

        confirmModal.style.display==="flex"

    ){

        confirmModal.style.display="none";

        deleteId=null;

    }

});

/* ==========================================================
   END OF FILE
========================================================== */