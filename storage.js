/*=========================================================
        EVENTHUB - STORAGE MODULE
        Version 2.0
=========================================================*/

"use strict";

/*=========================================================
                    STORAGE KEYS
=========================================================*/

const STORAGE_KEYS = Object.freeze({

    EVENTS: "eventhub-events",

    PARTICIPANTS: "eventhub-participants",

    SETTINGS: "eventhub-settings"

});



/*=========================================================
                STORAGE OBJECT
=========================================================*/

const Storage = {

    /*=====================================================
                    INITIALIZE DATABASE
    =====================================================*/

    initialize(){

        this.initializeEvents();

        this.initializeParticipants();

        this.initializeSettings();

    },



    /*=====================================================
                    INITIALIZE EVENTS
    =====================================================*/

    initializeEvents(){

        if(

            !localStorage.getItem(

                STORAGE_KEYS.EVENTS

            )

        ){

            localStorage.setItem(

                STORAGE_KEYS.EVENTS,

                JSON.stringify(EVENTS)

            );

        }

    },



    /*=====================================================
                INITIALIZE PARTICIPANTS
    =====================================================*/

    initializeParticipants(){

        if(

            !localStorage.getItem(

                STORAGE_KEYS.PARTICIPANTS

            )

        ){

            localStorage.setItem(

                STORAGE_KEYS.PARTICIPANTS,

                JSON.stringify([])

            );

        }

    },



    /*=====================================================
                    INITIALIZE SETTINGS
    =====================================================*/

    initializeSettings(){

        if(

            !localStorage.getItem(

                STORAGE_KEYS.SETTINGS

            )

        ){

            localStorage.setItem(

                STORAGE_KEYS.SETTINGS,

                JSON.stringify({

                    theme:"light",

                    version:"2.0"

                })

            );

        }

    },



    /*=====================================================
                    EVENTS
    =====================================================*/

    getEvents(){

        return JSON.parse(

            localStorage.getItem(

                STORAGE_KEYS.EVENTS

            )

        ) || [];

    },



    saveEvents(events){

        localStorage.setItem(

            STORAGE_KEYS.EVENTS,

            JSON.stringify(events)

        );

    },



    /*=====================================================
                PARTICIPANTS
    =====================================================*/

    getParticipants(){

        return JSON.parse(

            localStorage.getItem(

                STORAGE_KEYS.PARTICIPANTS

            )

        ) || [];

    },



    saveParticipants(participants){

        localStorage.setItem(

            STORAGE_KEYS.PARTICIPANTS,

            JSON.stringify(participants)

        );

    },

    /*=====================================================
                    GENERATE ID
    =====================================================*/

    generateId(collection){

        if(collection.length === 0){

            return 1;

        }

        return Math.max(

            ...collection.map(item => item.id)

        ) + 1;

    },



    /*=====================================================
            GENERATE REGISTRATION ID
    =====================================================*/

    generateRegistrationId(){

        const participants = this.getParticipants();

        const nextNumber = participants.length + 1;

        return `EVT-2026-${String(nextNumber).padStart(4,"0")}`;

    },



    /*=====================================================
            DUPLICATE REGISTRATION
    =====================================================*/

    isDuplicateRegistration(email,eventId){

        const participants = this.getParticipants();

        return participants.some(participant =>

            participant.email.toLowerCase() === email.toLowerCase()

            &&

            Number(participant.eventId) === Number(eventId)

        );

    },



    /*=====================================================
                ADD PARTICIPANT
    =====================================================*/

    addParticipant(participant){

        const participants = this.getParticipants();

        participant.id = this.generateId(participants);

        participant.registrationId =

            this.generateRegistrationId();

        participant.registeredAt =

            new Date().toISOString();

        participant.status = "Registered";

        participants.push(participant);

        this.saveParticipants(participants);

        return participant;

    },



    /*=====================================================
            FIND PARTICIPANT
    =====================================================*/

    findParticipant(id){

        return this.getParticipants().find(

            participant =>

            participant.id === Number(id)

        );

    },



    /*=====================================================
            UPDATE PARTICIPANT
    =====================================================*/

    updateParticipant(updatedParticipant){

        const participants =

            this.getParticipants().map(

                participant =>

                participant.id === updatedParticipant.id

                ? updatedParticipant

                : participant

            );

        this.saveParticipants(participants);

    },



    /*=====================================================
            DELETE PARTICIPANT
    =====================================================*/

    deleteParticipant(id){

        const participants =

            this.getParticipants().filter(

                participant =>

                participant.id !== Number(id)

            );

        this.saveParticipants(participants);

    },

        /*=====================================================
                    ADD EVENT
    =====================================================*/

    addEvent(event){

        const events = this.getEvents();

        event.id = this.generateId(events);

        events.push(event);

        this.saveEvents(events);

        return event;

    },



    /*=====================================================
                    UPDATE EVENT
    =====================================================*/

    updateEvent(updatedEvent){

        const events = this.getEvents().map(event =>

            event.id === updatedEvent.id

            ? updatedEvent

            : event

        );

        this.saveEvents(events);

    },



    /*=====================================================
                    DELETE EVENT
    =====================================================*/

    deleteEvent(id){

        const events = this.getEvents().filter(

            event => event.id !== Number(id)

        );

        this.saveEvents(events);

    },



    /*=====================================================
                    STATISTICS
    =====================================================*/

    getStatistics(){

        const events = this.getEvents();

        const participants = this.getParticipants();

        const totalSeats = events.reduce(

            (sum,event)=>sum+event.totalSeats,

            0

        );

        const availableSeats = events.reduce(

            (sum,event)=>sum+event.availableSeats,

            0

        );

        return{

            totalEvents: events.length,

            totalParticipants: participants.length,

            totalSeats,

            availableSeats,

            seatsFilled: totalSeats-availableSeats

        };

    },



    /*=====================================================
                EXPORT PARTICIPANTS CSV
    =====================================================*/

    exportParticipantsCSV(){

        const participants = this.getParticipants();

        if(participants.length===0){

            alert("No participants found.");

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

            "Event ID",

            "Status"

        ];

        const rows = participants.map(item=>[

            item.registrationId,

            item.name,

            item.email,

            item.phone,

            item.department,

            item.year,

            item.gender,

            item.eventId,

            item.status

        ]);

        const csv = [

            headers,

            ...rows

        ]

        .map(row=>row.join(","))

        .join("\n");

        const blob = new Blob(

            [csv],

            {type:"text/csv"}

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "participants.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    },



    /*=====================================================
                RESET DATABASE
    =====================================================*/

    resetDatabase(){

        localStorage.removeItem(

            STORAGE_KEYS.EVENTS

        );

        localStorage.removeItem(

            STORAGE_KEYS.PARTICIPANTS

        );

        localStorage.removeItem(

            STORAGE_KEYS.SETTINGS

        );

        this.initialize();

    }
}

/*=========================================================
                INITIALIZE STORAGE
=========================================================*/

Storage.initialize();