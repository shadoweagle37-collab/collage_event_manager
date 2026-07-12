/*=========================================================
                    EVENT DATA
        EVENTHUB - COLLEGE EVENT MANAGEMENT
=========================================================*/

"use strict";

const EVENTS = [

    {

        id: 1,

        title: "Coding Challenge 2026",

        description:
            "Test your programming skills by solving real-world coding problems individually.",

        category: "Technical",

        featured: true,

        status: "upcoming",

        difficulty: "Intermediate",

        image: "assets/images/events/coding.jpg",

        date: "2026-08-15",

        time: "10:00 AM",

        venue: "Computer Science Lab",

        organizer: "Department of Computer Science",

        coordinator: "Prof. A. Sharma",

        contact: "coding@eventhub.edu",

        registrationFee: 0,

        totalSeats: 120,

        availableSeats: 86,

        popularity: 96,

        registrationOpen: true,

        tags: [

            "Coding",

            "Programming",

            "Competition"

        ],

        rules: [

            "Individual Participation",

            "Laptop Mandatory",

            "Internet Not Allowed"

        ],

        prizes: [

            "₹10,000",

            "₹5,000",

            "₹2,500"

        ]

    },



    {

        id: 2,

        title: "AI & Machine Learning Workshop",

        description:
            "Hands-on workshop covering AI fundamentals and practical machine learning projects.",

        category: "Workshop",

        featured: true,

        status: "upcoming",

        difficulty: "Beginner",

        image: "assets/images/events/ai.jpg",

        date: "2026-08-18",

        time: "09:30 AM",

        venue: "Seminar Hall",

        organizer: "AI Club",

        coordinator: "Dr. Neha Patel",

        contact: "ai@eventhub.edu",

        registrationFee: 200,

        totalSeats: 80,

        availableSeats: 31,

        popularity: 98,

        registrationOpen: true,

        tags: [

            "AI",

            "Machine Learning",

            "Python"

        ],

        rules: [

            "Bring Laptop",

            "Basic Python Knowledge"

        ],

        prizes: [

            "Participation Certificate"

        ]

    },



    {

        id: 3,

        title: "Inter College Football Tournament",

        description:
            "Represent your college in the annual football championship.",

        category: "Sports",

        featured: false,

        status: "upcoming",

        difficulty: "Advanced",

        image: "assets/images/events/football.jpg",

        date: "2026-08-22",

        time: "04:00 PM",

        venue: "University Stadium",

        organizer: "Sports Committee",

        coordinator: "Mr. Raj Verma",

        contact: "sports@eventhub.edu",

        registrationFee: 500,

        totalSeats: 160,

        availableSeats: 110,

        popularity: 89,

        registrationOpen: true,

        tags: [

            "Football",

            "Sports",

            "Team"

        ],

        rules: [

            "College ID Required",

            "Team Registration"

        ],

        prizes: [

            "Winner Trophy",

            "Medals"

        ]

    },

        {

        id: 4,

        title: "National Hackathon 2026",

        description:
            "A 24-hour team hackathon to build innovative software solutions.",

        category: "Technical",

        featured: true,

        status: "upcoming",

        difficulty: "Advanced",

        image: "assets/images/events/hackathon.jpg",

        date: "2026-09-12",

        time: "09:00 AM",

        venue: "Innovation Lab",

        organizer: "Computer Science Department",

        coordinator: "Dr. Vivek Sharma",

        contact: "hackathon@eventhub.edu",

        registrationFee: 300,

        totalSeats: 150,

        availableSeats: 82,

        popularity: 100,

        registrationOpen: true,

        tags:["Hackathon","Coding","Innovation"],

        rules:["Team of 2-4","Laptop Required"],

        prizes:["₹50,000","₹25,000","₹10,000"]

    },



    {

        id: 5,

        title: "Photography Contest",

        description:
            "Capture the beauty of campus life through your camera lens.",

        category: "Competition",

        featured: false,

        status: "upcoming",

        difficulty: "Beginner",

        image: "assets/images/events/photography.jpg",

        date: "2026-09-18",

        time: "11:00 AM",

        venue: "Campus Garden",

        organizer: "Photography Club",

        coordinator: "Mr. Aman Gupta",

        contact: "photo@eventhub.edu",

        registrationFee: 100,

        totalSeats: 100,

        availableSeats: 67,

        popularity: 86,

        registrationOpen: true,

        tags:["Photography","Camera"],

        rules:["Original Photos Only"],

        prizes:["DSLR Camera","Certificates"]

    },



    {

        id: 6,

        title: "Robotics Workshop",

        description:
            "Build and program autonomous robots using Arduino.",

        category: "Workshop",

        featured: true,

        status: "upcoming",

        difficulty: "Intermediate",

        image: "assets/images/events/robotics.jpg",

        date: "2026-09-22",

        time: "10:30 AM",

        venue: "Electronics Lab",

        organizer: "Robotics Club",

        coordinator: "Prof. K. Rao",

        contact: "robotics@eventhub.edu",

        registrationFee: 250,

        totalSeats: 60,

        availableSeats: 18,

        popularity: 95,

        registrationOpen: true,

        tags:["Robotics","Arduino"],

        rules:["Laptop Required"],

        prizes:["Participation Certificate"]

    },



    {

        id: 7,

        title: "Cultural Night",

        description:
            "Music, dance, drama and cultural performances from students.",

        category: "Cultural",

        featured: true,

        status: "upcoming",

        difficulty: "Beginner",

        image: "assets/images/events/cultural.jpg",

        date: "2026-10-01",

        time: "06:00 PM",

        venue: "Main Auditorium",

        organizer: "Cultural Committee",

        coordinator: "Mrs. Ritu Singh",

        contact: "culture@eventhub.edu",

        registrationFee: 0,

        totalSeats: 500,

        availableSeats: 420,

        popularity: 93,

        registrationOpen: true,

        tags:["Dance","Music"],

        rules:["College Dress Code"],

        prizes:["Certificates"]

    },



    {

        id: 8,

        title: "Cricket Tournament",

        description:
            "Inter-department cricket championship.",

        category: "Sports",

        featured: false,

        status: "upcoming",

        difficulty: "Intermediate",

        image: "assets/images/events/cricket.jpg",

        date: "2026-10-05",

        time: "08:00 AM",

        venue: "Cricket Ground",

        organizer: "Sports Council",

        coordinator: "Mr. Deepak Mishra",

        contact: "cricket@eventhub.edu",

        registrationFee: 500,

        totalSeats: 180,

        availableSeats: 90,

        popularity: 91,

        registrationOpen: true,

        tags:["Cricket","Sports"],

        rules:["Team Registration"],

        prizes:["Trophy","Medals"]

    },



    {

        id: 9,

        title: "Cyber Security Seminar",

        description:
            "Industry experts discuss ethical hacking and cyber defense.",

        category: "Seminar",

        featured: false,

        status: "upcoming",

        difficulty: "Intermediate",

        image: "assets/images/events/cyber.jpg",

        date: "2026-10-12",

        time: "02:00 PM",

        venue: "Conference Hall",

        organizer: "IT Cell",

        coordinator: "Dr. Ashish Kumar",

        contact: "cyber@eventhub.edu",

        registrationFee: 0,

        totalSeats: 250,

        availableSeats: 175,

        popularity: 88,

        registrationOpen: true,

        tags:["Cyber Security"],

        rules:["College ID Mandatory"],

        prizes:["Certificate"]

    },



    {

        id: 10,

        title: "Gaming Championship",

        description:
            "Competitive Valorant and BGMI tournament.",

        category: "Competition",

        featured: true,

        status: "upcoming",

        difficulty: "Advanced",

        image: "assets/images/events/gaming.jpg",

        date: "2026-10-20",

        time: "09:00 AM",

        venue: "Gaming Arena",

        organizer: "Gaming Club",

        coordinator: "Mr. Arjun Das",

        contact: "gaming@eventhub.edu",

        registrationFee: 150,

        totalSeats: 120,

        availableSeats: 48,

        popularity: 99,

        registrationOpen: true,

        tags:["Gaming","Esports"],

        rules:["Own ID Required"],

        prizes:["Gaming Gear","Cash Prize"]

    }

];