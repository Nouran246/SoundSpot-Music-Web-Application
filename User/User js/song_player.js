const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');

function playAudio() {
    audioPlayer.play();
    updatePlayPauseButton();
}

function pauseAudio() {
    audioPlayer.pause();
    updatePlayPauseButton();
}

function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    updatePlayPauseButton();
}

function nextSong() {
    // Placeholder for function to go to the next song
    console.log("Next song");
}

function prevSong() {
    // Placeholder for function to go to the previous song
    console.log("Previous song");
}

function addToFavorites() {
    // Placeholder for adding to favorites
    console.log("Added to Favorites");
}

function setVolume(volume) {
    audioPlayer.volume = volume;
}

function updatePlayPauseButton() {
    let playButton = document.querySelector('button[onclick="playAudio()"]');
    let pauseButton = document.querySelector('button[onclick="pauseAudio()"]');
    if (audioPlayer.paused) {
        playButton.style.display = "inline";
        pauseButton.style.display = "none";
    } else {
        playButton.style.display = "none";
        pauseButton.style.display = "inline";
    }
}

audioPlayer.addEventListener('timeupdate', function() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

audioPlayer.addEventListener('ended', function() {
    progressBar.value = 0;
    audioPlayer.currentTime = 0;
    updatePlayPauseButton();
});

// Initialize button visibility correctly
updatePlayPauseButton();
