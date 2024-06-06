function toggleAudio() {
    var audio = document.getElementById("audioPlayer");
    var singIcon = document.getElementById("sing");
    var volumeControl = document.getElementById("volumeControl");
    var timeDisplay = document.getElementById("current-time");
    var songTitle = document.getElementById("sing1"); // Get the song title element

    if (audio.paused) {
        audio.play();
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
        singIcon.parentElement.classList.add("playing"); // Start the animation
        songTitle.style.color = "darkmagenta"; // Change the color of the song title

        // Start updating the volume control and progress bar
        audio.addEventListener('timeupdate', function() {
            var value = audio.currentTime / audio.duration;
            volumeControl.value = value;
            updateProgress(); // Update the time display
        });

    } else {
        audio.pause();
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
        singIcon.parentElement.classList.remove("playing"); // Stop the animation
        songTitle.style.color = "white"; // Change the color of the song title back to white

        // Stop updating the volume control and progress bar
        audio.removeEventListener('timeupdate', function() {
            var value = audio.currentTime / audio.duration;
            volumeControl.value = value;
        });
    }
}





function seekTo(value) {
    var audio = document.getElementById("audioPlayer");
    audio.currentTime = value * audio.duration;
    updateProgress(value);
}

function updateProgress() {
    var audio = document.getElementById("audioPlayer");
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var timeDisplay = document.getElementById("current-time");
    var durationDisplay = document.getElementById("duration");

    var progress = currentTime / duration * 100; // Calculate progress percentage
    timeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration - currentTime); // Calculate remaining time

    var progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%"; // Set the width of the progress bar
}


function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}


function backwardAudio() {
    var audio = document.getElementById("audioPlayer");
    audio.currentTime = 0;
    audio.play();
    document.getElementById("backward").innerHTML = '<i class="fa-solid fa-backward"></i>';
}

function maximizePage() {
    var minimizedContainer = document.querySelector(".minimizedsongcontainer");
    var maximizedContainer = document.querySelector(".maximizedsongcontainer");
    var body = document.querySelector("body");
    var pic = document.getElementById("pic");
    var songpic = document.getElementById("songpic");
    var songname = document.getElementById("songname");
    var artistname = document.getElementById("artistname");
    var maxpage = document.getElementById("maxpage");
    var cont = document.querySelector(".container");
    
    maximizedContainer.classList.add("show"); // start fading in
    body.style.backgroundColor = "black";
    maxpage.style.display="none";
    songname.style.display="none";
    artistname.style.display="none";
    songpic.style.display = "none";
    pic.style.display = "block"; // show the pic
    cont.style.display = "none";
}

function minimizePage() {
    var minimizedContainer = document.querySelector(".minimizedsongcontainer");
    var maximizedContainer = document.querySelector(".maximizedsongcontainer");
    var body = document.querySelector("body");
    var songpic = document.getElementById("songpic");
    var songname = document.getElementById("songname");
    var artistname = document.getElementById("artistname");
    maxpage = document.getElementById("maxpage");
    var cont = document.querySelector(".container");


    minimizedContainer.style.opacity = "1"; // start fading in
    maximizedContainer.classList.remove("show"); // start fading out
    maximizedContainer.style.transition = "none"; // remove transition
    body.style.backgroundColor = "#222";
    songname.style.display="block";
    artistname.style.display="block";
    songpic.style.display = "block";
    maxpage.style.display="inline";
    cont.style.display = "block";

}

