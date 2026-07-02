/*
==========================================================
College Event Management System
File: storage.js

Purpose:
- Initialize Local Storage
- Store default events
- Reusable CRUD functions
==========================================================
*/

// ===============================
// Local Storage Keys
// ===============================

const EVENT_KEY = "college_events";
const PARTICIPANT_KEY = "college_participants";


// ===============================
// Default Events
// ===============================

const defaultEvents = [

{
    id:1,
    title:"Hackathon",
    description:"24-hour coding competition.",
    image:"images/hackathon.jpg",
    category:"Technical",
    date:"2026-07-12",
    time:"10:00 AM",
    venue:"Seminar Hall",
    maxSeats:100,
    availableSeats:100,
    registrationDeadline:"2026-07-10"
},

{
    id:2,
    title:"Coding Contest",
    description:"Competitive programming challenge.",
    image:"images/coding.jpg",
    category:"Technical",
    date:"2026-07-15",
    time:"09:00 AM",
    venue:"Computer Lab",
    maxSeats:80,
    availableSeats:80,
    registrationDeadline:"2026-07-13"
},

{
    id:3,
    title:"AI Workshop",
    description:"Introduction to Artificial Intelligence.",
    image:"images/ai.jpg",
    category:"Workshop",
    date:"2026-07-18",
    time:"11:00 AM",
    venue:"Auditorium",
    maxSeats:120,
    availableSeats:120,
    registrationDeadline:"2026-07-16"
},

{
    id:4,
    title:"Web Development Bootcamp",
    description:"Learn modern web development.",
    image:"images/web.jpg",
    category:"Workshop",
    date:"2026-07-20",
    time:"10:30 AM",
    venue:"Lab 2",
    maxSeats:90,
    availableSeats:90,
    registrationDeadline:"2026-07-18"
},

{
    id:5,
    title:"Robotics Competition",
    description:"Build and demonstrate robots.",
    image:"images/robotics.jpg",
    category:"Technical",
    date:"2026-07-23",
    time:"09:30 AM",
    venue:"Innovation Center",
    maxSeats:60,
    availableSeats:60,
    registrationDeadline:"2026-07-21"
},

{
    id:6,
    title:"Debate Competition",
    description:"Inter-department debate contest.",
    image:"images/debate.jpg",
    category:"Cultural",
    date:"2026-07-25",
    time:"01:00 PM",
    venue:"Conference Hall",
    maxSeats:70,
    availableSeats:70,
    registrationDeadline:"2026-07-23"
},

{
    id:7,
    title:"Dance Competition",
    description:"Solo and group dance performances.",
    image:"images/dance.jpg",
    category:"Cultural",
    date:"2026-07-27",
    time:"04:00 PM",
    venue:"Open Stage",
    maxSeats:150,
    availableSeats:150,
    registrationDeadline:"2026-07-25"
},

{
    id:8,
    title:"Football Tournament",
    description:"Inter-college football championship.",
    image:"images/football.jpg",
    category:"Sports",
    date:"2026-08-02",
    time:"08:00 AM",
    venue:"College Ground",
    maxSeats:200,
    availableSeats:200,
    registrationDeadline:"2026-07-30"
},

{
    id:9,
    title:"Photography Contest",
    description:"Capture your best moments.",
    image:"images/photo.jpg",
    category:"Cultural",
    date:"2026-08-05",
    time:"11:00 AM",
    venue:"Art Gallery",
    maxSeats:50,
    availableSeats:50,
    registrationDeadline:"2026-08-03"
},

{
    id:10,
    title:"Quiz Competition",
    description:"General knowledge and aptitude quiz.",
    image:"images/quiz.jpg",
    category:"Technical",
    date:"2026-08-10",
    time:"02:00 PM",
    venue:"Room 301",
    maxSeats:100,
    availableSeats:100,
    registrationDeadline:"2026-08-08"
}

];


// ===============================
// Initialize Local Storage
// ===============================

function initializeStorage(){

    if(!localStorage.getItem(EVENT_KEY)){

        localStorage.setItem(
            EVENT_KEY,
            JSON.stringify(defaultEvents)
        );

    }

    if(!localStorage.getItem(PARTICIPANT_KEY)){

        localStorage.setItem(
            PARTICIPANT_KEY,
            JSON.stringify([])
        );

    }

}


// ===============================
// Event Functions
// ===============================

function getEvents(){

    return JSON.parse(
        localStorage.getItem(EVENT_KEY)
    ) || [];

}

function saveEvents(events){

    localStorage.setItem(
        EVENT_KEY,
        JSON.stringify(events)
    );

}


// ===============================
// Participant Functions
// ===============================

function getParticipants(){

    return JSON.parse(
        localStorage.getItem(PARTICIPANT_KEY)
    ) || [];

}

function saveParticipants(participants){

    localStorage.setItem(
        PARTICIPANT_KEY,
        JSON.stringify(participants)
    );

}


// ===============================
// Generate Next ID
// ===============================

function generateId(array){

    if(array.length===0){

        return 1;

    }

    return Math.max(...array.map(item=>item.id))+1;

}


// ===============================
// Add New Event
// ===============================

function addEvent(event){

    const events=getEvents();

    event.id=generateId(events);

    events.push(event);

    saveEvents(events);

}


// ===============================
// Update Event
// ===============================

function updateEvent(updatedEvent){

    const events=getEvents().map(event=>{

        return event.id===updatedEvent.id
        ? updatedEvent
        : event;

    });

    saveEvents(events);

}


// ===============================
// Delete Event
// ===============================

function deleteEvent(id){

    const events=getEvents().filter(event=>event.id!==id);

    saveEvents(events);

}


// ===============================
// Add Participant
// ===============================

function addParticipant(participant){

    const participants=getParticipants();

    participant.id=generateId(participants);

    participant.registrationDate=
    new Date().toLocaleDateString();

    participants.push(participant);

    saveParticipants(participants);

}


// ===============================
// Update Participant
// ===============================

function updateParticipant(updatedParticipant){

    const participants=getParticipants().map(item=>{

        return item.id===updatedParticipant.id
        ? updatedParticipant
        : item;

    });

    saveParticipants(participants);

}


// ===============================
// Delete Participant
// ===============================

function deleteParticipant(id){

    const participants=getParticipants().filter(item=>item.id!==id);

    saveParticipants(participants);

}


// ===============================
// Reset Entire Database
// (Useful During Development)
// ===============================

function resetDatabase(){

    localStorage.removeItem(EVENT_KEY);

    localStorage.removeItem(PARTICIPANT_KEY);

    initializeStorage();

}


// ===============================
// Initialize Database
// ===============================

initializeStorage();