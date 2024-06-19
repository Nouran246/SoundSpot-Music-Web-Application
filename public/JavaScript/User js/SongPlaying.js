document.addEventListener('DOMContentLoaded', () => {
    // Get all song cards
    const songCards = document.querySelectorAll('.card');

    // Add click event listener to each song card
    songCards.forEach(card => {
      card.addEventListener('click', () => {
        // Get song details from data attributes
        const songFile = card.getAttribute('data-song');
        const artistName = card.getAttribute('data-artist');
        const songName = card.getAttribute('data-title');
        const imageSrc = card.getAttribute('data-image');

        // Update the player with the clicked song details
        document.getElementById('audioPlayer').src = songFile;
        document.getElementById('songh1').innerText = songName;
        document.getElementById('songh3').innerText = artistName;
        document.getElementById('pic').src = imageSrc;
        document.getElementById('songname').innerText = songName;
        document.getElementById('artistname').innerText = artistName;
        document.getElementById('songpic').src = imageSrc;

        // Show the player
        document.querySelector('.maximizedsongcontainer').style.display = 'none'; // Start in minimized view
        document.querySelector('.minimizedsongcontainer').style.display = 'block';

        // Play the song
        document.getElementById('audioPlayer').play();
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
      });
    });
  });

  function toggleAudio() {
    var audio = document.getElementById("audioPlayer");
    var singIcon = document.getElementById("sing");
    var volumeControl = document.getElementById("volumeControl");
    var timeDisplay = document.getElementById("current-time");
    var songTitle = document.getElementById("songname"); // Update song title element ID

    if (audio.paused) {
        audio.play();
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
        singIcon.classList.add("playing"); // Start the animation
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
        singIcon.classList.remove("playing"); // Stop the animation
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

    // Ensure the progress bar element exists
    var progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        progressBar.style.width = progress + "%"; // Set the width of the progress bar
    }
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

    maximizedContainer.classList.add("show"); // Start fading in
    maximizedContainer.style.display = "block";
    minimizedContainer.style.display = "none";
  }

  function minimizePage() {
    var minimizedContainer = document.querySelector(".minimizedsongcontainer");
    var maximizedContainer = document.querySelector(".maximizedsongcontainer");

    maximizedContainer.style.display = "none";
    minimizedContainer.style.display = "block";
  }
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

