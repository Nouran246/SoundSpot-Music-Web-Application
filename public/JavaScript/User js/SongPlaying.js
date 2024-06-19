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

  songCards.forEach(card => {
      card.addEventListener('click', () => {
          const songFile = card.getAttribute('data-song');
          const artistName = card.getAttribute('data-artist');
          const songName = card.getAttribute('data-title');
          const imageSrc = card.getAttribute('data-image');

          // Update the audio source
          audioPlayer.src = songFile;

          // Update the song details
          document.getElementById('songname').innerText = songName;
          document.getElementById('artistname').innerText = artistName;
          document.getElementById('songpic').src = imageSrc;

          // Ensure the container is visible
          minimizedContainer.style.display = 'flex';

          // Play the song
          audioPlayer.play();
          playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
      });
  });

  // Toggle Play/Pause functionality
  window.toggleAudio = () => {
      if (audioPlayer.paused) {
          audioPlayer.play();
          playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
          audioPlayer.pause();
          playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
  };

  // Skip backward functionality
  window.backwardAudio = () => {
      audioPlayer.currentTime -= 10; // Skip backward by 10 seconds
  };

  // Skip forward functionality
  window.forwardAudio = () => {
      audioPlayer.currentTime += 10; // Skip forward by 10 seconds
  };

  // Seek to a specific time
  window.seekTo = (value) => {
      audioPlayer.currentTime = value * audioPlayer.duration;
  };

  // Update time displays during playback
  audioPlayer.addEventListener('timeupdate', () => {
      currentTimeDisplay.innerText = formatTime(audioPlayer.currentTime);
      durationDisplay.innerText = formatTime(audioPlayer.duration);
      volumeControl.value = audioPlayer.currentTime / audioPlayer.duration;
  });

  // Format time helper function
  const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
});
