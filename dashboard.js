console.log("Dashboard JS Loaded");

/*
==========================================================
                EVENTHUB DASHBOARD
==========================================================

Purpose:
• Dashboard Statistics
• Hero Insights
• Registration Analytics
• Quick Insights
• Recent Registrations
• Popular Events
• Activity Timeline
• Date & Time

==========================================================
*/

/*=========================================================
                DASHBOARD VARIABLES
=========================================================*/

const participants = Storage.getParticipants();

const events = Storage.getEvents();

const totalParticipants =
    document.getElementById("totalParticipants");

const totalEvents =
    document.getElementById("totalEvents");

const mostPopularEvent =
    document.getElementById("mostPopularEvent");

const upcomingEvents =
    document.getElementById("upcomingEvents");

const todayRegistrations =
    document.getElementById("todayRegistrations");

const activeParticipants =
    document.getElementById("activeParticipants");

const liveEvents =
    document.getElementById("liveEvents");

const latestStudent =
    document.getElementById("latestStudent");

const topDepartment =
    document.getElementById("topDepartment");

const mostActiveYear =
    document.getElementById("mostActiveYear");

const lastRegistration =
    document.getElementById("lastRegistration");

/*=========================================================
                DASHBOARD STATISTICS
=========================================================*/

function loadDashboardStats() {

    totalParticipants.textContent =
        participants.length;

    totalEvents.textContent =
        events.length;

    /*-----------------------------------
        Upcoming Events
    -----------------------------------*/

    const today = new Date();

    const upcoming = events.filter(event => {

        return new Date(event.date) >= today;

    });

    upcomingEvents.textContent =
        upcoming.length;

    /*-----------------------------------
        Most Popular Event
    -----------------------------------*/

    const eventCount = {};

    participants.forEach(participant => {

        eventCount[participant.eventId] =
            (eventCount[participant.eventId] || 0) + 1;

    });

    let popular = "--";

    let highest = 0;

    events.forEach(event => {

        const total =
            eventCount[event.id] || 0;

        if (total > highest) {

            highest = total;

            popular = event.title;

        }

    });

    mostPopularEvent.textContent =
        popular;

}

/*=========================================================
                HERO INSIGHTS
=========================================================*/

function loadHeroInsights() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    const today =
        new Date().toDateString();

    /* Today's Registrations */

    const todayCount = participants.filter(participant => {

        if (!participant.registeredAt) {

            return false;

        }

        return new Date(participant.registeredAt).toDateString() === today;

    });

    todayRegistrations.textContent =
        todayCount.length;

    /* Active Participants */

    activeParticipants.textContent =
        participants.length;

    /* Live Events */

    const live = events.filter(event => {

        return new Date(event.date).toDateString() === today;

    });

    liveEvents.textContent =
        live.length;

}


/*=========================================================
                QUICK INSIGHTS
=========================================================*/

function loadQuickInsights() {

    const participants = Storage.getParticipants();

    if (participants.length === 0) {

        latestStudent.textContent = "--";
        topDepartment.textContent = "--";
        mostActiveYear.textContent = "--";
        lastRegistration.textContent = "--";

        return;

    }

    /* Latest Student */

    const latest = participants[participants.length - 1];

    latestStudent.textContent = latest.name;

    /* Top Department */

    const departmentCount = {};

    participants.forEach(participant => {

        departmentCount[participant.department] =
            (departmentCount[participant.department] || 0) + 1;

    });

    let topDept = "--";
    let maxDept = 0;

    for (const department in departmentCount) {

        if (departmentCount[department] > maxDept) {

            maxDept = departmentCount[department];
            topDept = department;

        }

    }

    topDepartment.textContent = topDept;

    /* Most Active Year */

    const yearCount = {};

    participants.forEach(participant => {

        yearCount[participant.year] =
            (yearCount[participant.year] || 0) + 1;

    });

    let activeYear = "--";
    let maxYear = 0;

    for (const year in yearCount) {

        if (yearCount[year] > maxYear) {

            maxYear = yearCount[year];
            activeYear = year;

        }

    }

    mostActiveYear.textContent = activeYear;

    /* Last Registration */

    lastRegistration.textContent =
        latest.registrationId || "--";

}

/*=========================================================
                REGISTRATION ANALYTICS
=========================================================*/

let registrationChart;

function loadRegistrationChart() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    const canvas =
        document.getElementById("registrationChart");

    if (!canvas) {

        return;

    }

    const labels = [];

    const data = [];

    const activeEvents = events.filter(event => {

        return participants.some(

            participant => participant.eventId === event.id

        );

    });

    activeEvents.forEach(event => {

        labels.push(event.title);

        const total = participants.filter(

            participant => participant.eventId === event.id

        ).length;

        data.push(total);

    });


    if (registrationChart) {

        registrationChart.destroy();

    }

    const ctx = canvas.getContext("2d");

    registrationChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Participants",

                data: data,

                borderWidth: 2,

                borderRadius: 10,

                backgroundColor: "#5B6CFF",

                hoverBackgroundColor: "#4F46E5",

                barThickness: 35,


            }]

        },

        options: {


            responsive: true,

            maintainAspectRatio: false,


            animation: {

                duration: 1200,

                easing: "easeOutQuart"

            },

            plugins: {

                tooltip: {

                    callbacks: {

                        label: function (context) {

                            return "Participants : " + context.raw;

                        }

                    }

                },

                legend: {
                    display: false
                }



            },

            layout: {

                padding: {

                    top: 20,

                    left: 10,

                    right: 10,

                    bottom: 10

                }

            },


            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0,

                        stepSize: 1

                    }

                },

                x: {

                    ticks: {

                        maxRotation: 45,

                        minRotation: 45,

                        autoSkip: false,

                        font: {

                            size: 11

                        }

                    }

                },



            }



        }

    });



}

/*=========================================================
                RECENT REGISTRATIONS
=========================================================*/

function loadRecentRegistrations() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    const container =
        document.getElementById("recentRegistrations");

    if (!container) {

        return;

    }

    container.innerHTML = "";

    const latest =
        [...participants].reverse().slice(0, 5);

    latest.forEach(participant => {

        const event = events.find(

            event => event.id === participant.eventId

        );

        container.innerHTML += `

<div class="recent-item">

    <div class="recent-left">

        <div class="recent-avatar">

            <i class="fa-solid fa-user"></i>

        </div>

        <div class="recent-details">

            <h4>${participant.name}</h4>

            <p>${event ? event.title : "Unknown Event"}</p>

        </div>

    </div>

    <span class="registration-badge">

        ${participant.registrationId}

    </span>

</div>

`;

    });

}


/*=========================================================
                POPULAR EVENTS
=========================================================*/

function loadPopularEvents() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    const container =
        document.getElementById("popularEvents");

    if (!container) {

        return;

    }

    container.innerHTML = "";

    const eventStats = events.map(event => {

        const total = participants.filter(

            participant => participant.eventId === event.id

        ).length;

        return {

            title: event.title,

            total: total

        };

    });

    eventStats.sort((a, b) => b.total - a.total);

    const max = Math.max(

        ...eventStats.map(

            event => event.total

        ),

        1

    );

    eventStats
        .slice(0, 5)
        .forEach(event => {

            const percentage =

                (event.total / max) * 100;

            container.innerHTML += `

<div class="event-progress">

    <div class="event-header">

        <div class="event-name">

            <i class="fa-solid fa-trophy"></i>

            <span>${event.title}</span>

        </div>

        <span class="event-count">

            ${event.total}

        </span>

    </div>

    <div class="event-bar">

        <div
        class="event-fill"
        style="width:${percentage}%">

        </div>

    </div>

</div>

`;

        });

}


/*=========================================================
                RECENT ACTIVITY
=========================================================*/

function loadActivityTimeline() {

    const participants = Storage.getParticipants();

    const events = Storage.getEvents();

    const container =
        document.getElementById("activityTimeline");

    if (!container) {

        return;

    }

    container.innerHTML = "";

    const activities = [];

    participants.forEach(participant => {

        const event = events.find(

            event => event.id === participant.eventId

        );

        activities.push({

            type: "registration",

            name: participant.name,

            event: event ? event.title : "Unknown Event",

            date: participant.registrationDate || ""

        });

    });

    activities.reverse();

    activities.slice(0, 4).forEach(activity => {

        container.innerHTML += `

<div class="activity-item">

    <div class="activity-icon">

        <i class="fa-solid fa-circle-check"></i>

    </div>

    <div class="activity-content">

        <div class="activity-title">

            <strong>${activity.name}</strong>

            <span>

                registered for

                <b>${activity.event}</b>

            </span>

        </div>

        <small>

            ${activity.date || "Recently"}

        </small>

    </div>

</div>

`;

    });

}


/*=========================================================
                INITIALIZATION
=========================================================*/

function initializeDashboard() {

    loadDashboardStats();

    loadHeroInsights();

    loadQuickInsights();

    loadRegistrationChart();

    loadRecentRegistrations();

    loadPopularEvents();

    loadActivityTimeline();

}

document.addEventListener(

    "DOMContentLoaded",

    initializeDashboard

);