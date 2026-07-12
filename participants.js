/*=========================================================
                EVENTHUB PARTICIPANTS PAGE
=========================================================*/

/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let participants = [];
let filteredParticipants = [];
let selectedParticipant = null;


/*=========================================================
                DOM ELEMENTS
=========================================================*/

const tableBody = document.getElementById("participantsTableBody");

const emptyState = document.getElementById("emptyState");

const participantCount = document.getElementById("participantCount");

const searchInput = document.getElementById("participantSearch");

const eventFilter = document.getElementById("eventFilter");

const departmentFilter = document.getElementById("departmentFilter");

const yearFilter = document.getElementById("yearFilter");

const genderFilter = document.getElementById("genderFilter");


/* Statistics */

const totalParticipants = document.getElementById("totalParticipants");

const activeEvents = document.getElementById("activeEvents");

const filledSeats = document.getElementById("filledSeats");

const totalEvents = document.getElementById("totalEvents");


/* Insights */

const popularEvent = document.getElementById("popularEvent");

const popularCount = document.getElementById("popularCount");

const activeDepartment = document.getElementById("activeDepartment");

const departmentCount = document.getElementById("departmentCount");

const lastDate = document.getElementById("lastDate");

const lastTime = document.getElementById("lastTime");

const averageParticipants = document.getElementById("averageParticipants");


/*=========================================================
                PARTICIPANT MODAL
=========================================================*/

const participantModal = document.getElementById("participantModal");

const closeParticipantModal = document.getElementById("closeParticipantModal");

const closeModalBtn = document.getElementById("closeModalBtn");

const viewRegistrationId = document.getElementById("viewRegistrationId");

const viewStudentName = document.getElementById("viewStudentName");

const viewEmail = document.getElementById("viewEmail");

const viewPhone = document.getElementById("viewPhone");

const viewDepartment = document.getElementById("viewDepartment");

const viewYear = document.getElementById("viewYear");

const viewGender = document.getElementById("viewGender");

const viewEvent = document.getElementById("viewEvent");

const viewVenue = document.getElementById("viewVenue");

const viewEventDate = document.getElementById("viewEventDate");

const viewEventTime = document.getElementById("viewEventTime");

const viewRegistrationDate = document.getElementById("viewRegistrationDate");


/*=========================================================
                DELETE MODAL
=========================================================*/

const deleteParticipantModal =
    document.getElementById("deleteParticipantModal");

const deleteParticipantName =
    document.getElementById("deleteParticipantName");

const deleteParticipantEvent =
    document.getElementById("deleteParticipantEvent");

const cancelDeleteParticipant =
    document.getElementById("cancelDeleteParticipant");

const confirmDeleteParticipant =
    document.getElementById("confirmDeleteParticipant");

const printParticipantsBtn =
    document.getElementById("printParticipants");  
    
    

    /*=========================================================
                TOAST NOTIFICATION
=========================================================*/

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const toastIcon = document.getElementById("toastIcon");

let toastTimer;

function showToast(message, type = "success") {

    clearTimeout(toastTimer);

    toast.className = "toast";

    toast.classList.add(type);

    if(type === "success"){

        toastIcon.className = "fa-solid fa-circle-check";

    }

    else if(type === "error"){

        toastIcon.className = "fa-solid fa-circle-xmark";

    }

    else{

        toastIcon.className = "fa-solid fa-circle-exclamation";

    }

    toastMessage.textContent = message;

    void toast.offsetWidth;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}

/*=========================================================
                LOAD PARTICIPANTS
=========================================================*/

function loadParticipants() {

    participants = Storage.getParticipants();

    filteredParticipants = [...participants];

    populateEventFilter();

    renderParticipantsTable();

    updateStatistics();

    updateInsights();

}

/*=========================================================
                RENDER PARTICIPANTS TABLE
=========================================================*/

function renderParticipantsTable() {

    tableBody.innerHTML = "";

    if (filteredParticipants.length === 0) {

        emptyState.style.display = "block";

        participantCount.textContent = "0 Participants";

        return;

    }

    emptyState.style.display = "none";

    participantCount.textContent =
        `${filteredParticipants.length} Participants`;

    filteredParticipants.forEach((participant, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

<td>${index + 1}</td>

<td>

    <div class="student-cell">

        <div class="student-name">

            ${participant.name}

        </div>

        <div class="student-id">

            ${participant.registrationId}

        </div>

        <div class="student-email">

            ${participant.email}

        </div>

    </div>

</td>

<td>

    ${getEventName(participant.eventId)}

</td>

<td>

    ${participant.department}

</td>

<td>

    ${participant.year}

</td>

<td>

    <span class="status-badge registered">

        Registered

    </span>

</td>

<td>

    <div class="action-buttons">

        <button class="action-btn view-btn"
                data-id="${participant.id}"
                title="View">

            <i class="fa-solid fa-eye"></i>

        </button>

        <button class="action-btn print-btn"
                data-id="${participant.id}"
                title="Print">

            <i class="fa-solid fa-print"></i>

        </button>

        <button class="action-btn delete-btn"
                data-id="${participant.id}"
                title="Delete">

            <i class="fa-solid fa-trash"></i>

        </button>

    </div>

</td>

`;
        tableBody.appendChild(row);

    });

}

/*=========================================================
                SEARCH PARTICIPANTS
=========================================================*/

function searchParticipants() {

    applyFilters();

}

/*=========================================================
                APPLY FILTERS
=========================================================*/

function applyFilters() {

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    const selectedEvent = eventFilter.value;

    const selectedDepartment = departmentFilter.value;

    const selectedYear = yearFilter.value;

    const selectedGender = genderFilter.value;


    filteredParticipants = participants.filter(participant => {

        const eventName = getEventName(
            participant.eventId
        ).toLowerCase();

        const matchesSearch =

            keyword === ""

            ||

            participant.registrationId
                .toLowerCase()
                .includes(keyword)

            ||

            participant.name
                .toLowerCase()
                .includes(keyword)

            ||

            participant.email
                .toLowerCase()
                .includes(keyword)

            ||

            participant.phone
                .toLowerCase()
                .includes(keyword)

            ||

            participant.department
                .toLowerCase()
                .includes(keyword)

            ||

            eventName.includes(keyword);


        const matchesEvent =

            selectedEvent === ""

            ||

            String(participant.eventId) === selectedEvent;


        const matchesDepartment =

            selectedDepartment === ""

            ||

            participant.department === selectedDepartment;


        const matchesYear =

            selectedYear === ""

            ||

            participant.year === selectedYear;


        const matchesGender =

            selectedGender === ""

            ||

            participant.gender === selectedGender;


        return (

            matchesSearch

            &&

            matchesEvent

            &&

            matchesDepartment

            &&

            matchesYear

            &&

            matchesGender

        );

    });

    renderParticipantsTable();

}

/*=========================================================
                RESET FILTERS
=========================================================*/

function resetFilters() {

    searchInput.value = "";

    eventFilter.value = "";

    departmentFilter.value = "";

    yearFilter.value = "";

    genderFilter.value = "";

    applyFilters();

}


/*=========================================================
                GET EVENT NAME
=========================================================*/

function getEventName(eventId) {

    const event = Storage
        .getEvents()
        .find(event => Number(event.id) === Number(eventId));

    return event ? event.title : "Deleted Event";

}


/*=========================================================
                POPULATE EVENT FILTER
=========================================================*/

function populateEventFilter() {

    const events = Storage.getEvents();

    eventFilter.innerHTML = `
        <option value="">All Events</option>
    `;

    events.forEach(event => {

        eventFilter.innerHTML += `
            <option value="${event.id}">
                ${event.title}
            </option>
        `;

    });

}

/*=========================================================
                FORMAT DATE
=========================================================*/

function formatDate(date) {

    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    });

}


/*=========================================================
                GET PARTICIPANT BY ID
=========================================================*/

function getParticipantById(id) {

    return participants.find(

        participant =>

            String(participant.id) === String(id)

    );

}


/*=========================================================
                UPDATE STATISTICS
=========================================================*/

function updateStatistics() {

    const events = Storage.getEvents();

    const participants = Storage.getParticipants();


    /*==========================================
                TOTAL PARTICIPANTS
    ==========================================*/

    totalParticipants.textContent =
        participants.length;


    /*==========================================
                ACTIVE EVENTS
    ==========================================*/

    const activeEventCount = events.filter(

        event => event.availableSeats > 0

    ).length;

    activeEvents.textContent =
        activeEventCount;


    /*==========================================
                REGISTERED EVENTS
    ==========================================*/

    const registeredEvents = new Set(

        participants.map(

            participant => participant.eventId

        )

    );

    totalEvents.textContent =
        registeredEvents.size;


    /*==========================================
                SEATS FILLED
    ==========================================*/

    const totalSeats = events.reduce(

        (sum, event) =>

            sum + Number(event.totalSeats),

        0

    );

    const availableSeats = events.reduce(

        (sum, event) =>

            sum + Number(event.availableSeats),

        0

    );

    const occupiedSeats =
        totalSeats - availableSeats;

    filledSeats.textContent =
        `${occupiedSeats} / ${totalSeats}`;

}

/*=========================================================
                UPDATE PARTICIPANTS INSIGHTS
=========================================================*/

function updateInsights() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    /*==========================================
            NO PARTICIPANTS
    ==========================================*/

    if (participants.length === 0) {

        popularEvent.textContent = "--";
        popularCount.textContent = "No registrations";

        activeDepartment.textContent = "--";
        departmentCount.textContent = "No students";

        lastDate.textContent = "--";
        lastTime.textContent = "--";

        averageParticipants.textContent = "0";

        return;

    }

    /*==========================================
            MOST POPULAR EVENT
    ==========================================*/

    const eventCounter = {};

    participants.forEach(participant => {

        eventCounter[participant.eventId] =
            (eventCounter[participant.eventId] || 0) + 1;

    });

    const mostPopularEventId = Object.keys(eventCounter).reduce(

        (a, b) =>

            eventCounter[a] > eventCounter[b]

                ? a

                : b

    );

    const event = events.find(

        item => Number(item.id) === Number(mostPopularEventId)

    );

    popularEvent.textContent =
        event ? event.title : "Unknown Event";

    popularCount.textContent =
        `${eventCounter[mostPopularEventId]} Participants`;



    /*==========================================
            MOST ACTIVE DEPARTMENT
    ==========================================*/

    const departmentCounter = {};

    participants.forEach(participant => {

        departmentCounter[participant.department] =

            (departmentCounter[participant.department] || 0) + 1;

    });

    const topDepartment = Object.keys(departmentCounter).reduce(

        (a, b) =>

            departmentCounter[a] > departmentCounter[b]

                ? a

                : b

    );

    activeDepartment.textContent = topDepartment;

    departmentCount.textContent =
        `${departmentCounter[topDepartment]} Students`;



    /*==========================================
            LAST REGISTRATION DATE
    ==========================================*/

    const latestParticipant = [...participants].sort(

        (a, b) =>

            new Date(b.registeredAt) -

            new Date(a.registeredAt)

    )[0];

    const latestDate = new Date(latestParticipant.registeredAt);

    lastDate.textContent =
        latestDate.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "long",

            year: "numeric"

        });

    lastTime.textContent =
        latestDate.toLocaleTimeString("en-IN", {

            hour: "2-digit",

            minute: "2-digit"

        });



    /*==========================================
        AVERAGE PARTICIPANTS / EVENT
    ==========================================*/

    const average =

        participants.length /

        Math.max(events.length, 1);

    averageParticipants.textContent =
        `${average.toFixed(1)} Students`;

}


/*=========================================================
                TABLE ACTIONS
=========================================================*/

tableBody.addEventListener("click", handleTableActions);

function handleTableActions(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const participantId = button.dataset.id;

    if (button.classList.contains("view-btn")) {

        openParticipantModal(participantId);

    }

    else if (button.classList.contains("print-btn")) {

        printParticipant(participantId);

    }

    else if (button.classList.contains("delete-btn")) {

        deleteParticipant(participantId);

    }

}

/*=========================================================
                OPEN PARTICIPANT MODAL
=========================================================*/

function openParticipantModal(id) {

    const participant = getParticipantById(id);

    if (!participant) return;

    const event = Storage
        .getEvents()
        .find(e => Number(e.id) === Number(participant.eventId));

    viewRegistrationId.textContent = participant.registrationId;

    viewStudentName.textContent = participant.name;

    viewEmail.textContent = participant.email;

    viewPhone.textContent = participant.phone;

    viewDepartment.textContent = participant.department;

    viewYear.textContent = participant.year;

    viewGender.textContent = participant.gender;

    viewEvent.textContent = event ? event.title : "Deleted Event";

    viewVenue.textContent = event ? event.venue : "--";

    viewEventDate.textContent = event
        ? formatDate(event.date)
        : "--";

    viewEventTime.textContent = event
        ? event.time
        : "--";

    viewRegistrationDate.textContent =
        formatDate(participant.registeredAt);

    participantModal.classList.add("active");

}


/*=========================================================
                PRINT PARTICIPANT
=========================================================*/

function printParticipant(id) {

    console.log("Print clicked:", id);

    const participant = getParticipantById(id);

    console.log("Participant:", participant);

}

/*=========================================================
                DELETE PARTICIPANT
=========================================================*/

function deleteParticipant(id) {

    selectedParticipant = getParticipantById(id);

    if (!selectedParticipant) return;

    deleteParticipantName.textContent =
        selectedParticipant.name;

    deleteParticipantEvent.textContent =
        getEventName(selectedParticipant.eventId);

    deleteParticipantModal.classList.add("active");

}

/*=========================================================
            CLOSE PARTICIPANT MODAL
=========================================================*/

function closeParticipantDetails() {

    participantModal.classList.remove("active");

}


document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (participantModal.classList.contains("active")) {

        closeParticipantDetails();

    }

    if (deleteParticipantModal.classList.contains("active")) {

        closeDeleteModal();

    }

});


/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/

function closeDeleteModal() {

    deleteParticipantModal.classList.remove("active");

    selectedParticipant = null;

}

/*=========================================================
                CONFIRM DELETE PARTICIPANT
=========================================================*/

function confirmDelete() {

    if (!selectedParticipant) return;

    Storage.deleteParticipant(selectedParticipant.id);

    closeDeleteModal();

    loadParticipants();

    showToast("Participant deleted successfully.");

}


/*=========================================================
                PRINT PARTICIPANT
=========================================================*/

function printParticipant(id) {

    const participant = getParticipantById(id);

    if (!participant) return;

    const eventName = getEventName(
    participant.eventId
);

const printWindow = window.open(
    "",
    "_blank",
    "width=900,height=700"
);

const registrationDate = formatDate(
    participant.registeredAt || participant.registeredOn || participant.registrationDate
);

const printDate = new Date().toLocaleString();

printWindow.document.write(`

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<title>EventHub Registration Slip</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:Arial,Helvetica,sans-serif;

    background:#F8FAFC;

    padding:40px;

    color:#1E293B;

}

.container{

    max-width:800px;

    margin:auto;

    background:#FFFFFF;

    border:2px solid #4F46E5;

    border-radius:18px;

    overflow:hidden;

    box-shadow:0 20px 40px rgba(0,0,0,.12);

}

.header{

    background:#4F46E5;

    color:#FFFFFF;

    padding:30px;

    text-align:center;

}

.header h1{

    font-size:34px;

    margin-bottom:8px;

}

.header p{

    font-size:16px;

}

.content{

    padding:35px;

}

.row{

    display:flex;

    justify-content:space-between;

    padding:14px 0;

    border-bottom:1px solid #E2E8F0;

}

.label{

    font-weight:bold;

}

.footer{

    padding:25px;

    text-align:center;

    font-size:14px;

    color:#64748B;

}

@media print{

    body{

        background:white;

        padding:0;

    }

    .container{

        border:none;

        box-shadow:none;

    }

}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1 style="letter-spacing:1px;">

🎓 EVENTHUB

</h1>

<p>

College Event Management System

</p>

<p style="
margin-top:10px;
font-size:15px;
opacity:.9;
">

Participant Registration Slip

</p>

</div>

<div class="content">

<div class="row">

<span class="label">Registration ID</span>

<span>${participant.registrationId}</span>

</div>

<div class="row">

<span class="label">Student Name</span>

<span>${participant.name}</span>

</div>

<div class="row">

<span class="label">Email</span>

<span>${participant.email}</span>

</div>

<div class="row">

<span class="label">Phone</span>

<span>${participant.phone}</span>

</div>

<div class="row">

<span class="label">Department</span>

<span>${participant.department}</span>

</div>

<div class="row">

<span class="label">Year</span>

<span>${participant.year}</span>

</div>

<div class="row">

<span class="label">Gender</span>

<span>${participant.gender}</span>

</div>

<div class="row">

<span class="label">Event</span>

<span>${eventName}</span>

</div>

<div class="row">

<span class="label">Registration Date</span>

<span>${registrationDate}</span>

</div>

<div class="row">

<span class="label">Status</span>

<span style="
background:#DCFCE7;
color:#15803D;
padding:6px 16px;
border-radius:30px;
font-weight:600;
">

Registered

</span>

</div>

</div>

<hr style="
margin:30px 35px;
border:none;
border-top:1px dashed #CBD5E1;
">

<div style="
display:flex;
justify-content:space-between;
padding:0 35px 30px;
margin-top:30px;
">

    <div style="text-align:center;">

        <div style="
        width:180px;
        border-top:1px solid #1E293B;
        margin-bottom:8px;
        "></div>

        <strong>Participant Signature</strong>

    </div>

    <div style="text-align:center;">

        <div style="
        width:180px;
        border-top:1px solid #1E293B;
        margin-bottom:8px;
        "></div>

        <strong>Event Coordinator</strong>

    </div>

</div>

<div class="footer">

<p>

Generated by <strong>EventHub</strong>

</p>

<p>

College Event Management System

</p>

<p>

Guru Ghasidas Vishwavidyalaya

</p>

<br>

<p>

Printed on:

<strong>${printDate}</strong>

</p>

</div>

</div>

</body>

</html>

`);

printWindow.document.close();

printWindow.focus();

printWindow.print();

printWindow.close();

showToast("Registration slip sent to printer.");

}


/*=========================================================
                EXPORT PARTICIPANTS CSV
=========================================================*/

function exportParticipantsCSV() {

    if (filteredParticipants.length === 0) {

        showToast("No participants available to export.","warning");

        return;

    }

    const headers = [

    "Registration ID",

    "Name",

    "Email",

    "Phone",

    "Department",

    "Year",

    "Gender",

    "Event",

    "Registration Date"

];

const rows = filteredParticipants.map(participant => [

    participant.registrationId,

    participant.name,

    participant.email,

    participant.phone,

    participant.department,

    participant.year,

    participant.gender,

    getEventName(participant.eventId),

    formatDate(
        participant.registeredAt ||
        participant.registeredOn
    )


    
]);


const csvContent = [

    headers,

    ...rows

]

.map(row =>

    row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")

)

.join("\n");

const blob = new Blob(

    [csvContent],

    {

        type: "text/csv;charset=utf-8;"

    }

);

const link = document.createElement("a");

const url = URL.createObjectURL(blob);

link.href = url;

link.download =
`participants-${new Date().toISOString().slice(0,10)}.csv`;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

showToast("CSV exported successfully.");


}


/*=========================================================
                PRINT PARTICIPANTS LIST
=========================================================*/

function printParticipantsList() {

    if (filteredParticipants.length === 0) {

        showToast("No participants available to print.","warning");

        return;

    }

    const rows = filteredParticipants.map((participant, index) => `

<tr>

<td>${index + 1}</td>

<td>${participant.registrationId}</td>

<td>${participant.name}</td>

<td>${getEventName(participant.eventId)}</td>

<td>${participant.department}</td>

<td>${participant.year}</td>

<td>${participant.gender}</td>

</tr>

`).join("");

const printWindow = window.open(
    "",
    "_blank",
    "width=1200,height=800"
);

printWindow.document.write(`
<!DOCTYPE html>

<html>

<head>

<title>Participants List</title>

<style>

body{

    font-family:Arial,sans-serif;

    padding:40px;

    color:#1E293B;

}

h1{

    text-align:center;

    margin-bottom:10px;

}

h2{

    text-align:center;

    color:#64748B;

    margin-bottom:30px;

}

table{

    width:100%;

    border-collapse:collapse;

}

th{

    background:#4F46E5;

    color:white;

}

th,
td{

    border:1px solid #CBD5E1;

    padding:12px;

    text-align:left;

}

tr:nth-child(even){

    background:#F8FAFC;

}

</style>

</head>

<body>

<h1>EVENTHUB</h1>

<h2>Participants List</h2>

<table>

<thead>

<tr>

<th>#</th>

<th>Registration ID</th>

<th>Name</th>

<th>Event</th>

<th>Department</th>

<th>Year</th>

<th>Gender</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</body>

</html>
`);

printWindow.document.close();

printWindow.focus();

printWindow.print();

printWindow.close();


showToast("Participants list sent to printer.");


}



/*=========================================================
                INITIALIZATION
=========================================================*/

const resetButton = document.getElementById("resetFilters");

const exportCSVBtn = document.getElementById("exportCSV");

document.addEventListener("DOMContentLoaded", () => {

    loadParticipants();


    searchInput.addEventListener(

        "input",

        applyFilters

    );


    eventFilter.addEventListener(

        "change",

        applyFilters

    );


    departmentFilter.addEventListener(

        "change",

        applyFilters

    );


    yearFilter.addEventListener(

        "change",

        applyFilters

    );


    genderFilter.addEventListener(

        "change",

        applyFilters

    );

    resetButton.addEventListener(

    "click",

    resetFilters

    );

   closeParticipantModal.addEventListener(
    "click",
    closeParticipantDetails
);

closeModalBtn.addEventListener(
    "click",
    closeParticipantDetails
);

participantModal.addEventListener("click", (event) => {

    if (event.target === participantModal) {

        closeParticipantDetails();

    }

});

/* Cancel Button */

cancelDeleteParticipant.addEventListener(

    "click",

    closeDeleteModal

);


/* Click Outside */

deleteParticipantModal.addEventListener(

    "click",

    (event) => {

        if (event.target === deleteParticipantModal) {

            closeDeleteModal();

        }

    }

);

confirmDeleteParticipant.addEventListener(

    "click",

    confirmDelete

);

exportCSVBtn.addEventListener(

    "click",

    exportParticipantsCSV

);

exportCSVBtn.addEventListener(

    "click",

    exportParticipantsCSV

);

printParticipantsBtn.addEventListener(

    "click",

    printParticipantsList

);

});
