/*
==========================================================
College Event Management System
File: dashboard.js

Purpose:
- Dashboard Statistics
- Progress Bar
- Canvas Chart
- Recent Events
- Recent Registrations
==========================================================
*/

// ==========================================
// DOM Elements
// ==========================================

const totalEventsCard =
document.getElementById("totalEventsCard");

const totalParticipantsCard =
document.getElementById("totalParticipantsCard");

const todayEventsCard =
document.getElementById("todayEventsCard");

const upcomingEventsCard =
document.getElementById("upcomingEventsCard");

const availableSeatsCard =
document.getElementById("availableSeatsCard");

const filledSeatsCard =
document.getElementById("filledSeatsCard");

const seatProgress =
document.getElementById("seatProgress");

const seatPercentage =
document.getElementById("seatPercentage");

const recentEvents =
document.getElementById("recentEvents");

const recentParticipants =
document.getElementById("recentParticipants");

// ==========================================
// Animated Counter
// ==========================================

function animateCounter(element, target){

    let current = 0;

    const step = Math.max(1, Math.ceil(target / 50));

    const timer = setInterval(()=>{

        current += step;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    },20);

}

// ==========================================
// Dashboard Statistics
// ==========================================

function loadDashboardStats(){

    const events = getEvents();

    const participants = getParticipants();

    const today = new Date().toISOString().split("T")[0];

    let availableSeats = 0;

    let maxSeats = 0;

    let todayEvents = 0;

    let upcomingEvents = 0;

    events.forEach(event=>{

        availableSeats += event.availableSeats;

        maxSeats += event.maxSeats;

        if(event.date === today){

            todayEvents++;

        }

        if(new Date(event.date) >= new Date(today)){

            upcomingEvents++;

        }

    });

    const filledSeats = maxSeats - availableSeats;

    animateCounter(totalEventsCard, events.length);

    animateCounter(totalParticipantsCard, participants.length);

    animateCounter(todayEventsCard, todayEvents);

    animateCounter(upcomingEventsCard, upcomingEvents);

    animateCounter(availableSeatsCard, availableSeats);

    animateCounter(filledSeatsCard, filledSeats);

    const percentage =

    maxSeats === 0

    ? 0

    : Math.round((filledSeats / maxSeats) * 100);

    seatProgress.style.width = percentage + "%";

    seatPercentage.textContent = percentage + "%";

}

// ==========================================
// Recent Events
// ==========================================

function loadRecentEvents(){

    const events = getEvents();

    recentEvents.innerHTML = "";

    events

    .slice(-5)

    .reverse()

    .forEach(event=>{

        recentEvents.innerHTML += `

        <div class="list-card">

            <div class="list-info">

                <h4>${event.title}</h4>

                <p>

                    ${event.date}
                    •
                    ${event.venue}

                </p>

            </div>

            <span class="badge">

                ${event.category}

            </span>

        </div>

        `;

    });

}

// ==========================================
// Recent Participants
// ==========================================

function loadRecentParticipants(){

    const participants = getParticipants();

    recentParticipants.innerHTML = "";

    participants

    .slice(-5)

    .reverse()

    .forEach(participant=>{

        const event =

        getEvents().find(

        e=>e.id===participant.eventId

        );

        recentParticipants.innerHTML += `

        <div class="list-card">

            <div class="list-info">

                <h4>${participant.name}</h4>

                <p>

                    ${event ? event.title : "Unknown Event"}

                </p>

            </div>

            <span class="badge">

                ${participant.department}

            </span>

        </div>

        `;

    });

}

// ==========================================
// Canvas Chart
// ==========================================

function drawChart(){

    const canvas =

    document.getElementById("participantsChart");

    if(!canvas){

        return;

    }

    const ctx = canvas.getContext("2d");

    const events = getEvents();

    const participants = getParticipants();

    const data = events.map(event=>{

        return participants.filter(

            p=>p.eventId===event.id

        ).length;

    });

    const labels = events.map(

        e=>e.title

    );

    const maxValue =

    Math.max(...data,1);

    const width = canvas.width;

    const height = canvas.height;

    const padding = 50;

    const barWidth =

    (width-padding*2)/labels.length-20;

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

    ctx.font="12px Poppins";

    data.forEach((value,index)=>{

        const x =

        padding +

        index*

        (barWidth+20);

        const barHeight =

        (value/maxValue)

        *220;

        const y =

        height-padding-barHeight;

        ctx.fillStyle="#4F46E5";

        ctx.fillRect(

            x,

            y,

            barWidth,

            barHeight

        );

        ctx.fillStyle="#111";

const title =
labels[index].length > 10
?
labels[index].substring(0,10)+"..."
:
labels[index];

ctx.fillText(
    title,
    x,
    height-25
);

        ctx.fillText(

            value,

            x+10,

            y-8

        );

    });

}

// ==========================================
// Refresh Dashboard
// ==========================================

window.addEventListener(

"storage",

()=>{

    initializeDashboard();

}

);

// ==========================================
// Initialize
// ==========================================

function initializeDashboard(){

    loadDashboardStats();

    loadRecentEvents();

    loadRecentParticipants();

    drawChart();

}

document.addEventListener(

"DOMContentLoaded",

initializeDashboard

);