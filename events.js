/*=========================================================
        EVENTHUB - EVENTS PAGE
        EVENTS.JS
=========================================================*/

"use strict";

/*=========================================================
                    DOM ELEMENTS
=========================================================*/

const eventsContainer = document.getElementById("eventsContainer");

const categoryFilter = document.getElementById("categoryFilter");

const statusFilter = document.getElementById("statusFilter");

const priceFilter = document.getElementById("priceFilter");

const sortFilter = document.getElementById("sortFilter");

const eventSearch = document.getElementById("eventSearch");

const resetFilters = document.getElementById("resetFilters");

const emptyState = document.getElementById("emptyState");

const loadMoreBtn = document.getElementById("loadMoreBtn");

const featuredEvent = document.querySelector(".featured-event");

const resultCount = document.getElementById("resultCount");



/*=========================================================
                SUMMARY CARDS
=========================================================*/

const totalEvents = document.getElementById("totalEvents");

const technicalCount = document.getElementById("technicalCount");

const workshopCount = document.getElementById("workshopCount");

const culturalCount = document.getElementById("culturalCount");

const sportsCount = document.getElementById("sportsCount");



/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let filteredEvents = [...EVENTS];

let visibleEvents = 6;



/*=========================================================
                    UTILITIES
=========================================================*/

function formatFee(fee){

    return fee === 0 ? "Free" : `₹${fee}`;

}



function seatPercentage(event){

    return Math.round(

        (event.availableSeats / event.totalSeats) * 100

    );

}



/*=========================================================
                CATEGORY DROPDOWN
=========================================================*/

function populateCategories(){

    if(!categoryFilter) return;

    const categories = [

        ...new Set(

            EVENTS.map(event => event.category)

        )

    ].sort();

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}



/*=========================================================
                UPDATE SUMMARY
=========================================================*/

/*=========================================================
            UPDATE SUMMARY
=========================================================*/

function updateSummary(){

    if(!totalEvents) return;

    const counts = {};

    EVENTS.forEach(event=>{

        counts[event.category] =

            (counts[event.category] || 0) + 1;

    });

    totalEvents.textContent = EVENTS.length;

    technicalCount.textContent =

        counts.Technical || 0;

    workshopCount.textContent =

        counts.Workshop || 0;

    culturalCount.textContent =

        counts.Cultural || 0;

    sportsCount.textContent =

        counts.Sports || 0;

}


/*=========================================================
                RESULT COUNTER
=========================================================*/

function updateResultCount(){

    if(!resultCount) return;

    resultCount.textContent =

    `Showing ${filteredEvents.length} Event${

        filteredEvents.length === 1 ? "" : "s"

    }`;

}

/*=========================================================
                CREATE EVENT CARD
=========================================================*/

function createEventCard(event){

    const seatsFilled = seatPercentage(event);

    const priceBadge =
        event.registrationFee === 0
        ? "Free"
        : `₹${event.registrationFee}`;

    return `

    <article class="event-card glass">

        <div class="event-image">

            <img
                src="${event.image}"
                alt="${event.title}">

            <span class="category-badge">

                ${event.category}

            </span>

            <span class="price-badge">

                ${priceBadge}

            </span>

            ${
                event.featured
                ? `<span class="featured-badge">
                        <i class="fa-solid fa-star"></i>
                        Featured
                   </span>`
                : ""
            }

        </div>

        <div class="event-content">

            <h3>

                ${event.title}

            </h3>

            <p>

                ${event.description}

            </p>

            <div class="event-meta">

                <span>

                    <i class="fa-solid fa-calendar"></i>

                    ${event.date}

                </span>

                <span>

                    <i class="fa-solid fa-clock"></i>

                    ${event.time}

                </span>

                <span>

                    <i class="fa-solid fa-location-dot"></i>

                    ${event.venue}

                </span>

            </div>

            <div class="event-level">

                <strong>Level:</strong>

                ${event.difficulty}

            </div>

            <div class="seat-info">

                <div class="seat-text">

                    ${event.availableSeats}

                    /

                    ${event.totalSeats}

                    Seats Available

                </div>

                <div class="seat-progress">

                    <div
                        class="seat-progress-fill"
                        style="width:${seatsFilled}%">

                    </div>

                </div>

            </div>

            <div class="event-actions">
                <button
                    class="favorite-btn"
                    data-id="${event.id}">

                    <i class="${
                        isFavorite(event.id)
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart"></i>

                </button>

                <a
                    href="register.html?event=${event.id}"
                    class="btn">

                    Register Now

                </a>

            </div>

        </div>

    </article>

    `;

}



/*=========================================================
                RENDER EVENTS
=========================================================*/

function renderEvents(){

    if(!eventsContainer) return;

    const visible =

        filteredEvents.slice(0,visibleEvents);

    eventsContainer.innerHTML =

        visible.map(createEventCard).join("");
        initializeFavorites();

    if(emptyState){

        emptyState.style.display =

            filteredEvents.length === 0

            ? "block"

            : "none";

    }

    if(loadMoreBtn){

        loadMoreBtn.style.display =

            filteredEvents.length > visibleEvents

            ? "inline-flex"

            : "none";

    }

    updateResultCount();

}



/*=========================================================
                FEATURED EVENT
=========================================================*/

function renderFeaturedEvent(){

    if(!featuredEvent) return;

    const featured = getFeaturedEvent();

    if(!featured){

        featuredEvent.style.display="none";

        return;

    }

    featuredEvent.innerHTML=`

    <div class="featured-content">

        <span class="section-tag">

            ⭐ Featured Event

        </span>

        <h2>

            ${featured.title}

        </h2>

        <p>

            ${featured.description}

        </p>

        <div class="featured-info">

            <span>

                <i class="fa-solid fa-calendar"></i>

                ${featured.date}

            </span>

            <span>

                <i class="fa-solid fa-clock"></i>

                ${featured.time}

            </span>

            <span>

                <i class="fa-solid fa-location-dot"></i>

                ${featured.venue}

            </span>

        </div>

        <a
            href="register.html?event=${featured.id}"
            class="btn">

            Register Now

        </a>

    </div>

    <div class="featured-image">

        <img
            src="${featured.image}"
            alt="${featured.title}">

    </div>

    `;

}



/*=========================================================
                APPLY FILTERS
=========================================================*/

function applyFilters(){

    filteredEvents = [...EVENTS];



    /*---------------------------------------
                SEARCH
    ---------------------------------------*/

    const keyword = eventSearch.value
        .trim()
        .toLowerCase();

    if(keyword){

        filteredEvents = filteredEvents.filter(event =>

            event.title.toLowerCase().includes(keyword) ||

            event.description.toLowerCase().includes(keyword) ||

            event.category.toLowerCase().includes(keyword) ||

            event.venue.toLowerCase().includes(keyword)

        );

    }



    /*---------------------------------------
                CATEGORY
    ---------------------------------------*/

    if(categoryFilter.value !== "all"){

        filteredEvents = filteredEvents.filter(

            event =>

            event.category === categoryFilter.value

        );

    }



    /*---------------------------------------
                STATUS
    ---------------------------------------*/

    if(statusFilter.value !== "all"){

        filteredEvents = filteredEvents.filter(

            event =>

            event.status === statusFilter.value

        );

    }



    /*---------------------------------------
                PRICE
    ---------------------------------------*/

    if(priceFilter.value === "free"){

        filteredEvents = filteredEvents.filter(

            event =>

            event.registrationFee === 0

        );

    }

    if(priceFilter.value === "paid"){

        filteredEvents = filteredEvents.filter(

            event =>

            event.registrationFee > 0

        );

    }



    /*---------------------------------------
                SORTING
    ---------------------------------------*/

    switch(sortFilter.value){

        case "latest":

            filteredEvents.sort(

                (a,b)=>

                new Date(b.date)-new Date(a.date)

            );

            break;

        case "oldest":

            filteredEvents.sort(

                (a,b)=>

                new Date(a.date)-new Date(b.date)

            );

            break;

        case "name":

            filteredEvents.sort(

                (a,b)=>

                a.title.localeCompare(b.title)

            );

            break;

        case "popular":

            filteredEvents.sort(

                (a,b)=>

                b.popularity-a.popularity

            );

            break;

        case "seats":

            filteredEvents.sort(

                (a,b)=>

                b.availableSeats-a.availableSeats

            );

            break;

    }



    visibleEvents = 6;

    renderEvents();

}

/*=========================================================
                EVENT LISTENERS
=========================================================*/

on(eventSearch,"input",applyFilters);

on(categoryFilter,"change",applyFilters);

on(statusFilter,"change",applyFilters);

on(priceFilter,"change",applyFilters);

on(sortFilter,"change",applyFilters);

/*=========================================================
                RESET FILTERS
=========================================================*/

function resetAllFilters(){

    eventSearch.value="";

    categoryFilter.value="all";

    statusFilter.value="all";

    priceFilter.value="all";

    sortFilter.value="latest";

    applyFilters();

}

on(resetFilters,"click",resetAllFilters);

on(

    document.getElementById("emptyResetBtn"),

    "click",

    resetAllFilters

);


/*=========================================================
                LOAD MORE
=========================================================*/

function loadMoreEvents(){

    visibleEvents += 6;

    renderEvents();

}

on(loadMoreBtn,"click",loadMoreEvents);

/*=========================================================
                FAVORITES
=========================================================*/

const FAVORITES_KEY = "eventhub-favorites";



function getFavorites(){

    const favorites = localStorage.getItem(FAVORITES_KEY);

    return favorites ? JSON.parse(favorites) : [];

}



function saveFavorites(favorites){

    localStorage.setItem(

        FAVORITES_KEY,

        JSON.stringify(favorites)

    );

}



function isFavorite(eventId){

    return getFavorites().includes(eventId);

}



function toggleFavorite(eventId){

    let favorites = getFavorites();

    if(favorites.includes(eventId)){

        favorites = favorites.filter(

            id => id !== eventId

        );

    }else{

        favorites.push(eventId);

    }

    saveFavorites(favorites);

    renderEvents();

}

/*=========================================================
            FAVORITE BUTTON EVENTS
=========================================================*/

function initializeFavorites(){

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button=>{

            button.addEventListener("click",()=>{

                const id = Number(

                    button.dataset.id

                );

                toggleFavorite(id);

            });

        });

}

/*=========================================================
            DYNAMIC FEATURED EVENT
=========================================================*/

function getFeaturedEvent(){

    const featuredEvents = EVENTS.filter(

        event => event.featured

    );

    if(featuredEvents.length){

        featuredEvents.sort(

            (a,b)=>b.popularity-a.popularity

        );

        return featuredEvents[0];

    }

    return [...EVENTS].sort(

        (a,b)=>b.popularity-a.popularity

    )[0];

}



/*=========================================================
                EVENT STATUS
=========================================================*/

function getEventStatus(event){

    if(!event.registrationOpen){

        return{

            text:"Closed",

            className:"status-closed"

        };

    }

    const seatsLeft =

        event.availableSeats /

        event.totalSeats;

    if(seatsLeft<=0.20){

        return{

            text:"Almost Full",

            className:"status-warning"

        };

    }

    return{

        text:"Open",

        className:"status-open"

    };

}

/*=========================================================
                INITIALIZE
=========================================================*/

function initializeEvents(){

    populateCategories();

    updateSummary();

    renderFeaturedEvent();

    updateResultCount();

    renderEvents();

}

document.addEventListener(
    "DOMContentLoaded",
    initializeEvents
);