/*=========================================================
                    EVENTHUB V2
            COLLEGE EVENT MANAGEMENT SYSTEM
                    APP.JS
=========================================================*/

"use strict";

/*=========================================================
                    DOM ELEMENTS
=========================================================*/

const body = document.body;

const loader = document.getElementById("loader");

const navbar = document.querySelector(".navbar");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const darkModeBtn = document.getElementById("darkModeBtn");

const backToTop = document.getElementById("backToTop");

const counters = document.querySelectorAll(".counter");

const eventSearch = document.getElementById("eventSearch");

const featuredEvents = document.getElementById("featuredEvents");



/*=========================================================
                    LOADER
=========================================================*/

function hideLoader(){

    if(!loader) return;

    loader.classList.add("hidden");

    setTimeout(()=>{

        loader.style.display="none";

    },600);

}

window.addEventListener("load",hideLoader);



/*=========================================================
                    UTILITIES
=========================================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);



/*=========================================================
                SAFE EVENT LISTENER
=========================================================*/

function on(element,event,callback){

    if(element){

        element.addEventListener(event,callback);

    }

}



/*=========================================================
                APP INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    console.log("%cEventHub Loaded Successfully",
        "color:#6C63FF;font-size:16px;font-weight:bold;");

});

/*=========================================================
                STICKY NAVBAR
=========================================================*/

function handleNavbar(){

    if(!navbar) return;

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

}





/*=========================================================
                MOBILE MENU
=========================================================*/

function toggleMenu(){

    if(!navMenu || !menuToggle) return;

    navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    document.body.classList.toggle("menu-open");

}

on(menuToggle,"click",toggleMenu);



/*=========================================================
                CLOSE MENU
=========================================================*/

function closeMenu(){

    if(!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

}



/*=========================================================
        CLOSE MENU WHEN LINK IS CLICKED
=========================================================*/

$$(".nav-links a").forEach(link=>{

    on(link,"click",closeMenu);

});



/*=========================================================
        CLICK OUTSIDE TO CLOSE MENU
=========================================================*/

document.addEventListener("click",(event)=>{

    if(!navMenu || !menuToggle) return;

    if(
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ){

        closeMenu();

    }

});



/*=========================================================
            ESC KEY CLOSE MENU
=========================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeMenu();

    }

});



/*=========================================================
                DARK MODE
=========================================================*/

const THEME_KEY="eventhub-theme";



function applyTheme(theme){

    if(theme==="dark"){

        body.classList.add("dark");

        if(darkModeBtn){

            darkModeBtn.innerHTML=
            '<i class="fa-solid fa-sun"></i>';

        }

    }else{

        body.classList.remove("dark");

        if(darkModeBtn){

            darkModeBtn.innerHTML=
            '<i class="fa-solid fa-moon"></i>';

        }

    }

}



function loadTheme(){

    const savedTheme=

        localStorage.getItem(THEME_KEY) || "light";

    applyTheme(savedTheme);

}



function toggleTheme(){

    const isDark=

        body.classList.contains("dark");

    const newTheme=

        isDark ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem(THEME_KEY,newTheme);

}



on(darkModeBtn,"click",toggleTheme);

loadTheme();



/*=========================================================
            ACTIVE NAVIGATION LINK
=========================================================*/

const currentPage=

window.location.pathname.split("/").pop() || "index.html";



$$(".nav-links a").forEach(link=>{

    const href=link.getAttribute("href");

    if(href===currentPage){

        link.classList.add("active");

    }else{

        link.classList.remove("active");

    }

});

/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

function animateCounter(counter){

    const target = Number(counter.dataset.target);

    const duration = 1800;

    const start = 0;

    let startTime = null;

    function update(timestamp){

        if(!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);

        const value = Math.floor(progress * (target - start) + start);

        counter.textContent = value.toLocaleString();

        if(progress < 1){

            requestAnimationFrame(update);

        }else{

            counter.textContent = target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}



function initCounters(){

    if(!counters.length) return;

    const observer = new IntersectionObserver((entries, obs)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateCounter(entry.target);

                obs.unobserve(entry.target);

            }

        });

    },{

        threshold:.6

    });

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

initCounters();



/*=========================================================
                BACK TO TOP
=========================================================*/

function handleBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }



}

on(backToTop,"click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



/*=========================================================
            SCROLL REVEAL ANIMATION
=========================================================*/

const revealItems=document.querySelectorAll(

`

.section-header,

.feature-card,

.event-card,

.why-card,

.step-card,

.testimonial-card,

.cta-card,

.footer-column,

.hero-stat

`

);



function revealOnScroll(){

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:.15

        }

    );



    revealItems.forEach(item=>{

        observer.observe(item);

    });

}

revealOnScroll();



/*=========================================================
                PROGRESS BAR
=========================================================*/

const progressFill=document.querySelector(".progress-fill");



function animateProgress(){

    if(!progressFill) return;



    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    progressFill.style.width="82%";

                    observer.unobserve(progressFill);

                }

            });

        },

        {

            threshold:.5

        }

    );



    observer.observe(progressFill);

}

animateProgress();



/*=========================================================
            HERO FLOATING EFFECT
=========================================================*/

const floatingCards=document.querySelectorAll(".floating-card");



window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*12;

    const y=(e.clientY/window.innerHeight-.5)*12;



    floatingCards.forEach((card,index)=>{

        const speed=(index+1)*0.6;

        card.style.transform=

        `translate(${x*speed}px,${y*speed}px)`;

    });

});

/*=========================================================
                FEATURED EVENTS DATA
=========================================================*/

const featuredEventList = Storage.getEvents();


/*=========================================================
                CREATE EVENT CARD
=========================================================*/

function createEventCard(event){

    return `

    <article class="event-card">

        <div class="event-image">

            <img
                src="${event.image}"
                alt="${event.title}">

            <span class="event-badge">

                ${event.category}

            </span>

        </div>

        <div class="event-content">

            <h3>${event.title}</h3>

            <p>

                Join this exciting event and
                showcase your talent.

            </p>

            <div class="event-meta">

                <span>

                    <i class="fa-solid fa-calendar"></i>

                    ${event.date}

                </span>

                <span>

                    <i class="fa-solid fa-location-dot"></i>

                    ${event.location}

                </span>

            </div>

            <div class="event-footer">

                <span class="event-price">

                    ${event.price}

                </span>

                <a
                    href="register.html"
                    class="event-btn">

                    Register

                </a>

            </div>

        </div>

    </article>

    `;

}



/*=========================================================
                RENDER EVENTS
=========================================================*/

function renderEvents(list){

    if(!featuredEvents) return;

    if(list.length===0){

        featuredEvents.innerHTML=`

        <div class="no-events">

            <i class="fa-solid fa-face-frown"></i>

            <h3>No Events Found</h3>

            <p>

                Try another search keyword.

            </p>

        </div>

        `;

        return;

    }

    featuredEvents.innerHTML=

        list.map(createEventCard).join("");

}



/*=========================================================
                SEARCH EVENTS
=========================================================*/

on(eventSearch,"input",(e)=>{

    const keyword=

        e.target.value.toLowerCase().trim();

    const filtered =

    featuredEventList.filter(event =>

            event.title.toLowerCase().includes(keyword) ||

            event.category.toLowerCase().includes(keyword)

        );

    renderEvents(filtered);

});

/*=========================================================
                SMOOTH SCROLL
=========================================================*/

$$('.nav-links a[href^="#"]').forEach(link=>{

    on(link,"click",e=>{

        e.preventDefault();

        const target=document.querySelector(

            link.getAttribute("href")

        );

        if(!target) return;

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

        closeMenu();

    });

});



/*=========================================================
                ACTIVE SECTION
=========================================================*/

const sections=document.querySelectorAll("section[id]");

function updateActiveSection(){

    const scrollPos=window.scrollY+140;

    sections.forEach(section=>{

        const top=section.offsetTop;

        const height=section.offsetHeight;

        const id=section.getAttribute("id");

        const navLink=document.querySelector(

            `.nav-links a[href="#${id}"]`

        );

        if(!navLink) return;

        if(scrollPos>=top && scrollPos<top+height){

            navLink.classList.add("active");

        }else{

            navLink.classList.remove("active");

        }

    });

}



/*=========================================================
                LAZY IMAGE LOADING
=========================================================*/

const lazyImages=document.querySelectorAll("img[data-src]");

function initLazyImages(){

    if(!lazyImages.length) return;

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        },

        {

            rootMargin:"100px"

        }

    );

    lazyImages.forEach(img=>{

        observer.observe(img);

    });

}



/*=========================================================
                SCROLL HANDLER
=========================================================*/

function handleScroll(){

    handleNavbar();

    handleBackToTop();

    updateActiveSection();

}

window.addEventListener("scroll",handleScroll);



/*=========================================================
                INITIALIZATION
=========================================================*/

function initializeApp() {

    loadTheme();

    initCounters();

    revealOnScroll();

    animateProgress();

    initLazyImages();

    renderEvents(featuredEventList);

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    on(menuToggle, "click", toggleMenu);

    on(darkModeBtn, "click", toggleTheme);

}
/*=========================================================
                START APPLICATION
=========================================================*/

initializeApp();