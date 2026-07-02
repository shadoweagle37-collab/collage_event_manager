/*
==========================================================
College Event Management System
File: events.js

Purpose:
- Display all events
- Live search
- Category filter
- Status filter
- Sorting
==========================================================
*/

// ======================================
// DOM Elements
// ======================================

const eventsContainer =
document.getElementById("eventsContainer");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const statusFilter =
document.getElementById("statusFilter");

const sortBy =
document.getElementById("sortBy");

const emptyState =
document.getElementById("emptyState");


// ======================================
// Get Events
// ======================================

let events = getEvents();


// ======================================
// Event Card
// ======================================

function createEventCard(event){

    return `

    <div class="event-card fade-up">

        <img
            src="${event.image}"
            alt="${event.title}"
            class="event-image">

        <div class="event-content">

            <span class="event-category">

                ${event.category}

            </span>

            <h3>

                ${event.title}

            </h3>

            <p>

                ${event.description}

            </p>

            <ul>

                <li>

                    <i class="fa-solid fa-calendar"></i>

                    ${event.date}

                </li>

                <li>

                    <i class="fa-solid fa-clock"></i>

                    ${event.time}

                </li>

                <li>

                    <i class="fa-solid fa-location-dot"></i>

                    ${event.venue}

                </li>

                <li>

                    <i class="fa-solid fa-chair"></i>

                    ${event.availableSeats}
                    /
                    ${event.maxSeats}

                    Seats

                </li>

            </ul>

            <a
                href="register.html?event=${event.id}"
                class="btn primary-btn">

                Register

            </a>

        </div>

    </div>

    `;

}


// ======================================
// Render Events
// ======================================

function renderEvents(list){

    eventsContainer.innerHTML="";

    if(list.length===0){

        emptyState.style.display="block";

        return;

    }

    emptyState.style.display="none";

    list.forEach(event=>{

        eventsContainer.innerHTML +=

        createEventCard(event);

    });

}


// ======================================
// Apply Filters
// ======================================

function applyFilters(){

    let filtered=[...events];

    // -------------------
    // Search
    // -------------------

    const keyword=

    searchInput.value

    .trim()

    .toLowerCase();

    if(keyword){

        filtered=filtered.filter(event=>

            event.title

            .toLowerCase()

            .includes(keyword)

        );

    }

    // -------------------
    // Category
    // -------------------

    if(categoryFilter.value!=="all"){

        filtered=

        filtered.filter(event=>

            event.category===

            categoryFilter.value

        );

    }

    // -------------------
    // Status
    // -------------------

    if(statusFilter.value!=="all"){

        const today=

        new Date();

        filtered=

        filtered.filter(event=>{

            const eventDate=

            new Date(event.date);

            return statusFilter.value==="upcoming"

            ? eventDate>=today

            : eventDate<today;

        });

    }

    // -------------------
    // Sorting
    // -------------------

    switch(sortBy.value){

        case "name":

            filtered.sort((a,b)=>

            a.title.localeCompare(b.title)

            );

            break;

        case "date":

            filtered.sort((a,b)=>

            new Date(a.date)-

            new Date(b.date)

            );

            break;

        case "seats":

            filtered.sort((a,b)=>

            b.availableSeats-

            a.availableSeats

            );

            break;

    }

    renderEvents(filtered);

}


// ======================================
// Event Listeners
// ======================================

searchInput.addEventListener(

"input",

applyFilters

);

categoryFilter.addEventListener(

"change",

applyFilters

);

statusFilter.addEventListener(

"change",

applyFilters

);

sortBy.addEventListener(

"change",

applyFilters

);


// ======================================
// Reload Events
// ======================================

window.addEventListener(

"storage",

()=>{

    events=getEvents();

    applyFilters();

}

);


// ======================================
// Initialize
// ======================================

document.addEventListener(

"DOMContentLoaded",

()=>{

    events=getEvents();

    renderEvents(events);

}

);