//25adna el sowar 7atenaha fe array 3lshan ne2dar net7akem feha w nezherha
gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", function () {
    const slides = gsap.utils.toArray(".slide");
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    // Function to get the initial translateZ value
    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(", ");
            return parseFloat(values[14] || 0);
        }
        return 0;
    }

    // Function to map range of values
    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    // Loop through slides to set up ScrollTrigger
    slides.forEach((slide, index) => {
        const initialZ = getInitialTranslateZ(slide);
        ScrollTrigger.create({
            trigger: ".container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const zIncrement = progress * 22500;
                const currentZ = initialZ + zIncrement;
                let opacity;
                if (currentZ > -2500) {
                    opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                } else {
                    opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                }
                slide.style.opacity = opacity;
                slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
                if (currentZ < 100) {
                    gsap.to(activeSlideImages[index], 1.5, {
                        opacity: 1,
                        ease: "power3.out",
                    });
                } else {
                    gsap.to(activeSlideImages[index], 1.5, {
                        opacity: 0,
                        ease: "power3.out",
                    });
                }
            },
        });
    });
});
ScrollTrigger.create({
        trigger: "body",
        start: "bottom bottom",
        end: "+=300",
        onEnter: () => {
            document.querySelector('.big-text').style.display = 'block';
        },
        onLeaveBack: () => {
            document.querySelector('.big-text').style.display = 'none';
        },
    });

    // Initially hide the big text
    document.querySelector('.big-text').style.display = 'none';


//entrance
let tl=gsap.timeline({delay:0});
tl.to(".col",{
    top:0,
    
    duration:3,
    ease:"power4.inOut"
})

tl.to(".c-1 .item",{
    top:0,
    stagger:0.25,
    duration:3,
    ease:"power4.inOut"
},"-=2");
tl.to(".c-2 .item",{
    top:0,
    stagger:-0.25,
    duration:3,
    ease:"power4.inOut"
},"-=4");
tl.to(".c-3 .item",{
    top:0,
    stagger:0.25,
    duration:3,
    ease:"power4.inOut"
},"-=4");
tl.to(".c-4 .item",{
    top:0,
    stagger:-0.25,
    duration:3,
    ease:"power4.inOut"
},"-=4");
tl.to(".c-5 .item",{
    top:0,
    stagger:0.25,
    duration:3,
    ease:"power4.inOut"
},"-=4");

tl.to(".containers",{
    scale:6,
    duration:4,
    ease:"power4.inOut"
},"-=2");


tl.to(".nav-item a, .title p, .slide-num p, .preview img", {
    top: 0,
    stagger: 0.075,
    duration: 1,
    ease: "power3.out"
}, "-=1.5");

tl.to(".section", {
    opacity: 0,
    stagger: 0.075,
    duration: 1,
    ease: "power3.out"
}, "-=1.5");





// Scroll to the last section immediately when the page loads
window.addEventListener('DOMContentLoaded', function() {
    const lastSection = document.getElementById('last');
    lastSection.style.display = 'block'; // Show the last section if it's hidden initially

    // Scroll to the last section
    lastSection.scrollIntoView({ behavior: 'smooth' });
});


const elementsToHide = document.querySelectorAll('.containers');

setTimeout(() => {
    gsap.to(elementsToHide, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            // After the animation is complete, hide the elements by setting their display to 'none'
            elementsToHide.forEach(element => {
                element.style.display = 'none';
            });
        }
    });
}, 6000);



// Select all elements inside article except .containers
const elementsToHides = document.querySelectorAll('article > *:not(.containers)');

// Hide all elements except .containers
gsap.to(elementsToHides, {
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Show all elements after 6000ms
setTimeout(function() {
    gsap.to(elementsToHides, {
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
  
}, 6000);

const firstSection = document.querySelector('#first');
const lastSection = document.querySelector('#last');
const secSection = document.querySelector('#second');
firstSection.style.opacity = "0";
lastSection.style.opacity = "0";
secSection.style.opacity = "0";

// Show the first and last sections after 6000ms
setTimeout(function() {
    firstSection.style.opacity = "1";
    lastSection.style.opacity = "1";
    secSection.style.opacity = "1";

}, 6000);

document.body.style.background = "#141414";

// After 6000ms, revert the background color back to its original color
setTimeout(function() {
    document.body.style.background = ""; // Revert to default background color
}, 6000);



