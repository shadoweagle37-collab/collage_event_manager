/*=========================================================
        EVENTHUB - VALIDATION MODULE
        Version 2.0
=========================================================*/

"use strict";

/*=========================================================
                VALIDATION OBJECT
=========================================================*/

const Validation = {

    /*=====================================================
                    CONSTANTS
    =====================================================*/

    NAME_MIN_LENGTH: 3,

    NAME_MAX_LENGTH: 50,

    PHONE_LENGTH: 10,



    /*=====================================================
                SANITIZE TEXT
    =====================================================*/

    sanitizeText(text){

        return String(text)

            .trim()

            .replace(/\s+/g," ");

    },



    /*=====================================================
                IS EMPTY
    =====================================================*/

    isEmpty(value){

        return this.sanitizeText(value)==="";

    },



    /*=====================================================
                SET ERROR
    =====================================================*/

    setError(errors,field,message){

        errors[field]=message;

    },



    /*=====================================================
                EMAIL FORMAT
    =====================================================*/

    isValidEmail(email){

        const pattern=

        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        return pattern.test(

            this.sanitizeText(email)

        );

    },



    /*=====================================================
                PHONE FORMAT
    =====================================================*/

    isValidPhone(phone){

        const cleaned=

            phone.replace(/\D/g,"");

        return /^[6-9]\d{9}$/.test(cleaned);

    },

        /*=====================================================
                    NAME
    =====================================================*/

    validateName(name){

        name = this.sanitizeText(name);

        if(this.isEmpty(name)){

            return "Full name is required.";

        }

        if(name.length < this.NAME_MIN_LENGTH){

            return `Name must contain at least ${this.NAME_MIN_LENGTH} characters.`;

        }

        if(name.length > this.NAME_MAX_LENGTH){

            return `Name cannot exceed ${this.NAME_MAX_LENGTH} characters.`;

        }

        if(!/^[A-Za-z\s]+$/.test(name)){

            return "Name can contain only letters and spaces.";

        }

        return "";

    },



    /*=====================================================
                    EMAIL
    =====================================================*/

    validateEmail(email){

        email = this.sanitizeText(email);

        if(this.isEmpty(email)){

            return "Email address is required.";

        }

        if(!this.isValidEmail(email)){

            return "Enter a valid email address.";

        }

        return "";

    },



    /*=====================================================
                    PHONE
    =====================================================*/

    validatePhone(phone){

        phone = phone.replace(/\D/g,"");

        if(phone.length===0){

            return "Phone number is required.";

        }

        if(!this.isValidPhone(phone)){

            return "Enter a valid 10-digit Indian mobile number.";

        }

        return "";

    },



    /*=====================================================
                DEPARTMENT
    =====================================================*/

    validateDepartment(department){

        department = this.sanitizeText(department);

        if(

            department==="" ||

            department==="Select Department"

        ){

            return "Please select your department.";

        }

        return "";

    },



    /*=====================================================
                    YEAR
    =====================================================*/

    validateYear(year){

        const validYears=[

            "First Year",

            "Second Year",

            "Third Year",

            "Fourth Year"

        ];

        if(!validYears.includes(year)){

            return "Please select your academic year.";

        }

        return "";

    },



    /*=====================================================
                    GENDER
    =====================================================*/

    validateGender(gender){

        const validGender=[

            "Male",

            "Female",

            "Other"

        ];

        if(!validGender.includes(gender)){

            return "Please select your gender.";

        }

        return "";

    },



    /*=====================================================
                    EVENT
    =====================================================*/

    validateEvent(eventId){

        if(

            eventId===null ||

            eventId==="" ||

            Number(eventId)<=0

        ){

            return "Please select an event.";

        }

        const event = Storage.getEvents().find(

            item => item.id === Number(eventId)

        );

        if(!event){

            return "Selected event does not exist.";

        }

        if(

            event.registrationOpen===false

        ){

            return "Registration for this event is closed.";

        }

        if(

            event.availableSeats<=0

        ){

            return "No seats are available for this event.";

        }

        return "";

    },



    /*=====================================================
                TERMS
    =====================================================*/

    validateTerms(accepted){

        if(!accepted){

            return "You must accept the Terms & Conditions.";

        }

        return "";

    },

        /*=====================================================
                REGISTRATION FORM
    =====================================================*/

    validateRegistration(formData){

        const errors = {};

        const cleanData = {

            name: this.sanitizeText(formData.name),

            email: this.sanitizeText(formData.email).toLowerCase(),

            phone: formData.phone.replace(/\D/g,""),

            department: this.sanitizeText(formData.department),

            year: this.sanitizeText(formData.year),

            gender: this.sanitizeText(formData.gender),

            eventId: Number(formData.eventId),

            terms: formData.terms

        };



        let error;



        error = this.validateName(cleanData.name);

        if(error){

            this.setError(errors,"name",error);

        }



        error = this.validateEmail(cleanData.email);

        if(error){

            this.setError(errors,"email",error);

        }



        error = this.validatePhone(cleanData.phone);

        if(error){

            this.setError(errors,"phone",error);

        }



        error = this.validateDepartment(cleanData.department);

        if(error){

            this.setError(errors,"department",error);

        }



        error = this.validateYear(cleanData.year);

        if(error){

            this.setError(errors,"year",error);

        }



        error = this.validateGender(cleanData.gender);

        if(error){

            this.setError(errors,"gender",error);

        }



        error = this.validateEvent(cleanData.eventId);

        if(error){

            this.setError(errors,"eventId",error);

        }



        error = this.validateTerms(cleanData.terms);

        if(error){

            this.setError(errors,"terms",error);

        }



        if(

            !errors.email &&

            !errors.eventId &&

            Storage.isDuplicateRegistration(

                cleanData.email,

                cleanData.eventId

            )

        ){

            this.setError(

                errors,

                "duplicate",

                "You have already registered for this event using this email."

            );

        }



        return{

            valid:Object.keys(errors).length===0,

            errors,

            data:cleanData

        };

    }

};