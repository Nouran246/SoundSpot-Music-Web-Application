document.addEventListener('DOMContentLoaded', () => {
    const songCards = document.querySelectorAll('.card');
    const audioPlayer = document.getElementById('audioPlayer');
    const minimizedContainer = document.querySelector('.minimizedsongcontainer');
    const playButton = document.getElementById('play');
    const backwardButton = document.getElementById('backward');
    const forwardButton = document.getElementById('forward');
    const volumeControl = document.getElementById('volumeControl');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const progressBar = document.getElementById('progress-bar'); // Progress bar element
    const likeButton = document.getElementById('likes');
    const volumeIcon = document.getElementById('volumeIcon');
    const lyricsButton = document.getElementById('lyricsButton'); // Changed from lyricsButtons to lyricsButton
const lyricsModal = document.getElementById('lyricsModal'); // Changed from lyricsModals to lyricsModal
const lyricsContent = document.getElementById('lyricsContent'); // Changed from lyricsContents to lyricsContent

    let currentSongIndex = 0;
    let currentVolume = 1;

    const playSongByIndex = (index) => {
        const card = songCards[index];
        const songFile = card.getAttribute('data-song');
        const artistName = card.getAttribute('data-artist');
        const songName = card.getAttribute('data-title');
        const imageSrc = card.getAttribute('data-image');

        audioPlayer.src = songFile;
        document.getElementById('songname').innerText = songName;
        document.getElementById('artistname').innerText = artistName;
        document.getElementById('songpic').src = imageSrc;
        minimizedContainer.style.display = 'flex';
        audioPlayer.play();
        playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';

        currentSongIndex = index;
    };

    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            playSongByIndex(index);
        });
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('liked');
    });

    const toggleVolume = () => {
        if (audioPlayer.volume === 0) {
            audioPlayer.volume = 0.5;
            volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-low', 'fa-volume-medium');
            volumeIcon.classList.add('fa-volume-half');
            currentVolume = 0.5;
        } else if (audioPlayer.volume === 0.5) {
            audioPlayer.volume = 1;
            volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-half', 'fa-volume-medium');
            volumeIcon.classList.add('fa-volume-high');
            currentVolume = 1;
        } else if (audioPlayer.volume === 1) {
            audioPlayer.volume = 0;
            volumeIcon.classList.remove('fa-volume-high', 'fa-volume-half', 'fa-volume-medium');
            volumeIcon.classList.add('fa-volume-mute');
            currentVolume = 0;
        }
    };

    volumeIcon.addEventListener('click', toggleVolume);

    const playNextSong = () => {
        currentSongIndex++;
        if (currentSongIndex >= songCards.length) {
            currentSongIndex = songCards.length - 1;
        }
        playSongByIndex(currentSongIndex);
    };

    const playPreviousSong = () => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = 0;
        }
        playSongByIndex(currentSongIndex);
    };

    forwardButton.addEventListener('click', playNextSong);
    backwardButton.addEventListener('click', playPreviousSong);

    window.toggleAudio = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    };

    const seekTo = (value) => {
        const seekTime = (value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    };

    // Update this function to seek audio based on click position
    const seekAudio = (event) => {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const seekTime = (offsetX / rect.width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    };

    progressBar.addEventListener('click', seekAudio);

    audioPlayer.addEventListener('timeupdate', () => {
        currentTimeDisplay.innerText = formatTime(audioPlayer.currentTime);
        durationDisplay.innerText = formatTime(audioPlayer.duration);
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100; // Update progress bar
    });

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    lyricsButton.addEventListener('click', () => {
        lyricsModal.style.display = 'block';
        const lyricsData = songCards[currentSongIndex].getAttribute('data-lyrics');
        lyricsContent.innerHTML = `<pre>${lyricsData}</pre>`;
    });
    

    // Function to close the lyrics modal
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        lyricsModal.style.display = 'none';
    });
    

    // Close the lyrics modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === lyricsModal) {
            lyricsModal.style.display = 'none';
        }
    });
    

    // Optional: Close modal when ESC key is pressed
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            lyricsModal.style.display = 'none';
        }
    });
    
});