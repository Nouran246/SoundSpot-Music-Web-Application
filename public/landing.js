document.addEventListener("DOMContentLoaded", () => {
    let tl = gsap.timeline({ delay: 0 });

    // Initial fade-out of the loader
    tl.to(".loader-bg", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
            document.querySelector('.loader-bg').style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        }
    });

    // Animation for elements
    tl.to(".col", {
        top: 0,
        opacity: 1,
        duration: 3,
        ease: "power4.inOut"
    });

    tl.to(".c-1 .item", {
        top: 0,
        opacity: 1,
        stagger: 0.25, // Starts each item animation 0.25 sec after the previous one
        duration: 3,
        ease: "power4.inOut"
    }, "-=2"); // Starts 2 seconds before the previous animation ends

    tl.to(".c-2 .item", {
        top: 0,
        opacity: 1,
        stagger: -0.25, // Starts at the same time as the first item
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-3 .item", {
        top: 0,
        opacity: 1,
        stagger: 0.25, // Starts after the second item
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-4 .item", {
        top: 0,
        opacity: 1,
        stagger: -0.25, // Starts at the same time as the third item
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-5 .item", {
        top: 0,
        opacity: 1,
        stagger: 0.25, // Starts after the fourth item
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".containers", {
        scale: 6, // Enlarge 6 times
        duration: 4, // Animation lasts 4 seconds
        ease: "power4.inOut"
    }, "-=2");

    tl.to(".nav-item a, .title p, .slide-num p, .preview img", {
        top: 0,
        opacity: 1,
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

    const elementsToHide = document.querySelectorAll('.containers');

    setTimeout(() => {
        gsap.to(elementsToHide, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                elementsToHide.forEach(element => {
                    element.style.display = 'none';
                });
            }
        });
    }, 7000);

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
    }, 7000);

    document.body.style.background = "#141414";

    // After 6000ms it reverts the background color back to its original color
    setTimeout(function() {
        document.body.style.background = ""; 
    }, 7000);



document.body.style.background = "#141414";

// After 6000ms it reverts the background color back to its original color
setTimeout(function() {
    document.body.style.background = ""; 
}, 7000);

});

//Matter library allows us to use physics and physical body (3lshan 3yzeen ne3amel el pictures dih 3la 2naha bodies ytaba2 3leha kawa3ed el physics)
//engine --> simluation managments and updates

//world-->container for all objects

//bodies -->various shapes with physical bodies

//modify the properties of the existing bodies
const Engine = Matter.Engine; //for adding a type of physics called physics engine
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body=Matter.Body;
let engine;
let items = []; //7atena feha el objects w el bodies
let lastMouseX=-1;
 let lastMouseY=1;
 let sectionX, sectionY, sectionWidth, sectionHeight;

 function setup() { 
     createCanvas(window.innerWidth, window.innerHeight); // han3mel canvas be mesa7et el window
     engine = Engine.create(); //3malna matter engine
     engine.world.gravity.y = 0;
 
     addBoundaries(); //boundries 3lshan el movements of the object
 
     let x = random(100, width - 100);
     let y = random(100, height - 100);
     const imagePaths = [
         './photo/Screenshot 2024-05-03 194748.png',
         './photo/Screenshot 2024-05-03 202345.png',
         './photo/Screenshot 2024-05-03 202547.png',
         './photo/Screenshot 2024-05-03 202832.png',
         './photo/Screenshot 2024-05-03 202939.png',
         './photo/Screenshot 2024-05-03 203018.png',
         './photo/Screenshot 2024-05-03 204223.png',
         './photo/Screenshot 2024-05-03 204836.png',
         './photo/Screenshot 2024-05-03 205231.png',
         './photo/Screenshot 2024-05-03 205301.png',
         './photo/perfect_sitemap.jpg',
         './photo/360_F_457834846_d2HzFZisEIH1CDqIkP4RxW6EwCV2o1kT.jpg'
        
     ];
 
     // 7ateet el images fe array
     for (let i = 0; i < imagePaths.length; i++) {
         items.push(new Item(x, y, imagePaths[i]));
     }
 
     // nadet 3la el second section el han7otaha feha
     let secondSection = document.getElementById("second");
     
     // 7esbet el length w el width bta3 elsecond section
     sectionX = secondSection.offsetLeft;
     sectionY = secondSection.offsetTop;
     sectionWidth = secondSection.offsetWidth;
     sectionHeight = secondSection.offsetHeight;
 
     // put the items fel second section through append 3lshan 3yzahom kolohom fel section w mayteroosh lma 2da5alhom
     items.forEach((iteming) => {
         secondSection.appendChild(iteming.div);
     });
 }
 
//3malt add le boundries movements of the object
function addBoundaries() {
    const thickness = 50;
    World.add(engine.world, [
        Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
            isStatic: true,
        }),
        Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
            isStatic: true,
        }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
            isStatic: true,
        }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
            isStatic: true,
        }),
    ]);
}

function draw() {
  //2sta5demna p5.js 3lshan y3mel sketch to update
    Engine.update(engine);
    items.forEach((iteming) => iteming.update());
}

class Item {
    constructor(x, y, imagePath) {
        let options = {
            frictionAir: 0.075,
            restitution: 0.25,
            density: 0.002,
            angle: Math.random() * Math.PI * 2,
     
        };
     
        this.body = Bodies.rectangle(x, y, 100, 200, options);
        World.add(engine.world, this.body);
        this.div = document.createElement("div");
        this.div.className = "iteming";
        this.div.style.left = `${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 100}px`;
        
        const img = document.createElement("img");
        img.src = imagePath;
        this.div.appendChild(img);
        document.body.appendChild(this.div);
        this.originalAngle = options.angle;
        this.initialPosition = { x: x, y: y };
        this.centerPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let rotateClicked = false; // Flag to 3lshan yfdal metabe3 el rotation
        this.div.addEventListener('mousemove', (event) => {
            let rect = this.div.getBoundingClientRect();
            let itemX = rect.left + rect.width / 2;
            let itemY = rect.top + rect.height / 2;
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            if (
                mouseX > rect.left &&
                mouseX < rect.left + rect.width &&
                mouseY > rect.top &&
                mouseY < rect.top + rect.height
            ) {
                console.log("Mouse over item:", this);
                // Calculate force direction away from the mouse position
                let forceX = (itemX - mouseX) / 50;
                let forceY = (itemY - mouseY) / 50;
                // Apply force to the item
                Body.applyForce(this.body, {
                    x: this.body.position.x,
                    y: this.body.position.y,
                }, {
                    x: forceX,
                    y: forceY,
                });
                
            }
        });
        document.getElementById('background').addEventListener('mousemove', (event) => {
            let rect = this.div.getBoundingClientRect();
            let itemX = rect.left + rect.width / 2;
            let itemY = rect.top + rect.height / 2;
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            if (
                mouseX > rect.left &&
                mouseX < rect.left + rect.width &&
                mouseY > rect.top &&
                mouseY < rect.top + rect.height
            ) {
                console.log("Mouse over item:", this);
                // Calculate force direction away from the mouse position
                let forceX = (itemX - mouseX) / 50;
                let forceY = (itemY - mouseY) / 50;
                // Apply force to the item
                Body.applyForce(this.body, {
                    x: this.body.position.x,
                    y: this.body.position.y,
                }, {
                    x: forceX,
                    y: forceY,
                });
                
            }
        });
    
    
this.div.addEventListener('click', () => {
    if (!rotateClicked) {
        this.rotateToOriginalAngle();
    } else {
        this.restoreOriginalAngle();
    }
    rotateClicked = !rotateClicked; 
});
this.isZoomed = false;
this.div.iteming = this;

this.div.addEventListener('click', () => { this.toggleZoom(); });
}


toggleZoom() {
        this.isZoomed = !this.isZoomed; 

        if (this.isZoomed) {
       
            this.zoomIn();
        } else {
           
            this.zoomOut();
        }
    }

    zoomIn() {
   
    if (this.body.position.x === this.centerPosition.x && this.body.position.y === this.centerPosition.y) {
        return; 
    }

    gsap.to(this.div, {
        duration: 0.5,
        width: "500px",
        height: "400px",
        left: `${this.centerPosition.x - 250}px`, //interpolation bet5aly el data ta5od el value el hatet7at
        top: `${this.centerPosition.y - 200}px`,
        x: 0,
        y: 0,
        rotation: this.body.angle,
        ease: "power2.inOut",
        zIndex: 1 
    });

    
    Body.setPosition(this.body, this.centerPosition);
}

zoomOut() {
    
    gsap.to(this.div, {
        duration: 0.5,
        width: "200px",
        height: "250px",
        left: `${this.initialPosition.x - 50}px`,
        top: `${this.initialPosition.y - 100}px`,
        rotation: this.body.angle,
        ease: "power2.inOut",
        zIndex: 0 
    });
}










    rotateToOriginalAngle() {
        Body.setAngle(this.body, 0); 
    }

    restoreOriginalAngle() {
        Body.setAngle(this.body, this.originalAngle); 
    }

    update() {
        this.div.style.left = `${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 100}px`;
        this.div.style.transform = `rotate(${this.body.angle}rad)`;
    }
    
}

gsap.registerPlugin(ScrollTrigger); //wasalna el gsap be scroll 3lshan section last
window.addEventListener("load", function () { //el page to be fully load 3lshan t3mel el
    const slides = gsap.utils.toArray(".slide"); //25adna el sowar 7atenaha fe array 3lshan ne2dar net7akem feha w nezherha  
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    // Function to get the initial translateZ value
    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide); //acces el calculations  w el 2rkam el 27na 3mlenha fe el css files w ygebha hena
        const matrix = style.transform.match(/matrix3d\((.+)\)/);  // lw ne5aly el transformation y apply 3la el 7aga el 3d
        if (matrix) {
            const values = matrix[1].split(", "); // hanefsel el array w ne7ot  kol wa7da lwa7daha w n3melaha split be comma
            return parseFloat(values[14] || 0); //hatala3 el value of el index
        }
        return 0; // lw mafeesh matrix mawgoda hayreturn zero
    }

    // Function to map range of values () benzabat range of values bta3 el 3d
    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
       // it's used to map the range of currentZ (the current Z-axis position) to the range of opacity values. It ensures that as the slides move along the Z-axis (in 3D space), their opacity changes smoothly.

    }

    // Loop through slides to set up ScrollTrigger
    slides.forEach((slide, index) => {
        const initialZ = getInitialTranslateZ(slide);
        ScrollTrigger.create({ //zabatna el range bta3 el scroll trigger
            trigger: ".container", //element that triggers the animation
            start: "top top",
            end: "bottom bottom",
            scrub: true, //bet5aly el animation yb2a smooth tool ma 27na mashyeen
            onUpdate: (self) => { //kol mara b3mel scroll el function beteshta8al
                const progress = self.progress; // progress el animation tool ma 27na mashyeen bel scroll l7d ma nwsal lel  nehaya
                const zIncrement = progress * 22500;  //bta5od el w2ef feen 
                const currentZ = initialZ + zIncrement;  //bn7seb el z-axis w2ef feen  + makan el z el adeem 3lshan netala3 el current z
                let opacity;
                if (currentZ > -2500) {
                    opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                    //If currentZ is greater than -2500, it means the slide is closer to the viewer, so we map its opacity smoothly from 0.5 to 1 as it moves closer.
                } else {
                  //  If currentZ is less than or equal to -2500, it means the slide is farther from the viewer, so we map its opacity smoothly from 0 to 0.5 as it moves farther away.
                    opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                }
                slide.style.opacity = opacity;
                slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
                if (currentZ < 100) {
                    gsap.to(activeSlideImages[index], 1.5, {
                        opacity: 1,
                        ease: "power3.out", //visiual effect for the opacity
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


// Initially hide the big text
document.querySelector('.big-text').style.display = 'none';

// Function to check if the user has scrolled to the bottom of the page
function isScrolledToBottom() {
    return window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
}

// makes the big-text appear when it reaches the end
function handleScroll() {
    if (isScrolledToBottom()) {
        document.querySelector('.big-text').style.display = 'block';
    } else {
        document.querySelector('.big-text').style.display = 'none';
    }
}

window.addEventListener('scroll', handleScroll);







// Global variables 3lshan te7seb el l3ba CHANGES IN SECTIONN 2 TO MAKE IT A GAME
let timerInterval;
let score = 0;

function startGame() {
  document.getElementById('startAudio').play();
  
    document.getElementById('background').style.display = 'none';
    document.getElementById('popup').style.display = 'block';

    document.getElementById('okButton').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';

        countdown();
    });
}




function closePopup() {

    document.getElementById('popup').style.display = 'none';
    startTimer();
    updateScore();
}

function startTimer() {
    let timeLeft = 10;
    timerInterval = setInterval(() => {
        document.getElementById('timer').textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}


function updateScore() {
    
    items.forEach((iteming) => {
        iteming.div.removeEventListener('click', handleClick);
        iteming.div.addEventListener('click', handleClick);
    });
}


function handleClick() {
    if (this.iteming.isZoomed) {
        score++;
        document.getElementById('score').textContent = score;

    
        document.getElementById('pointsAudio').play();
    }
}

const winAudio = new Audio('Audio/320672__rhodesmas__win-01.wav');
const loseAudio = new Audio('Audio/157218__adamweeden__video-game-die-or-lose-life.flac');


function endGame() {
    if (score < 6) {
      loseAudio.play();
      showGameOverAlert(score); 
        
        
        document.getElementById('background').style.display = 'flex';
        document.getElementById('background').style.alignItems = 'center';
        document.getElementById('playGameButton').textContent = 'Play Again';
        document.getElementById('playGameButton').onclick = playAgain;
        document.getElementById('exploreAppButtons').style.display = 'inline-block'; 
    } else {
      winAudio.play();
      showWinAlert(score);
        document.getElementById('background').style.display = 'flex';
        document.getElementById('background').style.alignItems = 'center';
        document.getElementById('playGameButton').textContent = 'Play Again';
        document.getElementById('playGameButton').onclick = playAgain;
        document.getElementById('exploreAppButtons').style.display = 'inline-block';
      
    }
}


function playAgain() {
    
    document.getElementById('startAudio').play();
    document.getElementById('background').style.display = 'none';

    
    resetGame();

    
    startGame();
}

function countdown() {
   
    timer--;

    
    updateTimerAndScore();

    
    if (timer === 0) {
        endGame();
       
        return; 
    }

    
    setTimeout(countdown, 1000);
}




function resetGame() {
    
    items.forEach(iteming => {
        iteming.isZoomed = false;
        iteming.zoomOut();
    });

    
    items.forEach(iteming=> {
        let x = random(100, window.innerWidth - 100);
        let y = random(100, window.innerHeight - 100);
        Body.setPosition(iteming.body, { x: x, y: y });
    });

   
    timer = 10;
    score = 0;
    updateTimerAndScore();
}


function updateTimerAndScore() {
    document.getElementById('timer').textContent = timer;
    document.getElementById('score').textContent = score;
}



function handleOkButtonClick() {
  
    document.getElementById('popup').style.display = 'none';

    countdown();

    document.getElementById('background').style.display = 'none';
    document.getElementById('exploreAppButton').style.display = 'none';
}


document.getElementById('okButton').addEventListener('click', handleOkButtonClick);



function showEndGameElements() {
       
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('score').style.display = 'none';

       
        document.getElementById('background').style.display = 'block';
        showEndGameElements();
    }

   
    function playAgain() {
       
        document.getElementById('background').style.display = 'none';

  
        resetGame();

        
        startGame();
    }



function showAlert(title, message, className) {
    
    const alert = document.createElement('div');
    alert.classList.add('alert', className);

    alert.innerHTML = `<div class="alert-title">${title}</div>
                       <div class="alert-message">${message}</div>`;

    
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.appendChild(alert);

   
    alert.style.display = 'block';

    
    setTimeout(() => {
        alert.style.display = 'none';
        
        alertContainer.removeChild(alert);
    }, 3000);
}

function showGameOverAlert(score) {
    showAlert('Game Over', `You lose! Your score: ${score}`, 'game-over-alert');
}


function showWinAlert(score) {
    showAlert('Congratulations!', `You win! Your score: ${score}`, 'win-alert');
}


