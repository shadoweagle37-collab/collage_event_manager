/*
==========================================================
College Event Management System
File: app.js

Purpose:
- Home page functionality
- Display statistics
- Featured events
- Dark mode
- Back to top
==========================================================
*/

// =========================================
// Select Elements
// =========================================

const totalEventsElement = document.getElementById("totalEvents");
const totalParticipantsElement = document.getElementById("totalParticipants");
const availableSeatsElement = document.getElementById("availableSeats");

const featuredEventsContainer =
document.getElementById("featuredEvents");

const darkModeBtn =
document.getElementById("darkModeBtn");

const backToTop =
document.getElementById("backToTop");


// =========================================
// Counter Animation
// =========================================

function animateCounter(element, target){

    let count = 0;

    const speed = Math.max(1, Math.floor(target / 60));

    const timer = setInterval(()=>{

        count += speed;

        if(count >= target){

            count = target;

            clearInterval(timer);

        }

        element.textContent = count;

    },20);

}


// =========================================
// Load Statistics
// =========================================

function loadStatistics(){

    const events = getEvents();

    const participants = getParticipants();

    const totalSeats = events.reduce((sum,event)=>{

        return sum + event.availableSeats;

    },0);

    animateCounter(totalEventsElement,events.length);

    animateCounter(
        totalParticipantsElement,
        participants.length
    );

    animateCounter(
        availableSeatsElement,
        totalSeats
    );

}


// =========================================
// Create Event Card
// =========================================

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

                    Seats :
                    ${event.availableSeats}

                </li>

            </ul>

            <a
            href="register.html"
            class="btn primary-btn">

                Register

            </a>

        </div>

    </div>

    `;

}


// =========================================
// Featured Events
// =========================================

function loadFeaturedEvents(){

    const events = getEvents();

    featuredEventsContainer.innerHTML="";

    events

    .slice(0,3)

    .forEach(event=>{

        featuredEventsContainer.innerHTML +=

        createEventCard(event);

    });

}


// =========================================
// Dark Mode
// =========================================

function loadTheme(){

    const theme =

    localStorage.getItem("theme");

    if(theme==="dark"){

        document.body.classList.add("dark");

        darkModeBtn.innerHTML=

        '<i class="fa-solid fa-sun"></i>';

    }

}

darkModeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        darkModeBtn.innerHTML=

        '<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        darkModeBtn.innerHTML=

        '<i class="fa-solid fa-moon"></i>';

    }

});


// =========================================
// Back To Top
// =========================================

window.addEventListener("scroll",()=>{

    if(window.scrollY>350){

        backToTop.style.display="block";

    }

    else{

        backToTop.style.display="none";

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// =========================================
// Navbar Shadow
// =========================================

window.addEventListener("scroll",()=>{

    const navbar =

    document.querySelector(".navbar");

    if(window.scrollY>40){

        navbar.style.boxShadow=

        "0 8px 20px rgba(0,0,0,.15)";

    }

    else{

        navbar.style.boxShadow=

        "none";

    }

});


// =========================================
// Toast Notification
// =========================================

function showToast(message,color="#22C55E"){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.textContent=message;

    toast.style.background=color;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.remove();

    },3000);

}


// =========================================
// Scroll Animation
// =========================================

const observer =

new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade-up");

        }

    });

});

document

.querySelectorAll("section")

.forEach(section=>{

    observer.observe(section);

});


// =========================================
// Initialize
// =========================================

document.addEventListener(

"DOMContentLoaded",

()=>{

    loadTheme();

    loadStatistics();

    loadFeaturedEvents();

}

);