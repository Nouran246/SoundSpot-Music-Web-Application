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
  const likeButton = document.getElementById('likes'); // Select the like button

  let currentSongIndex = 0;
  let shuffledIndexes = [];

  // Function to play the song based on card index
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

      // Update currentSongIndex
      currentSongIndex = index;
  };

  // Play the song when a card is clicked
  songCards.forEach((card, index) => {
      card.addEventListener('click', () => {
          playSongByIndex(index);
      });
  });

  // Like button click event
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('liked'); // Toggle the 'liked' class
  });

  // Function to play the next song
  const playNextSong = () => {
      currentSongIndex++;
      if (currentSongIndex >= songCards.length) {
          currentSongIndex = songCards.length - 1;
      }
      playSongByIndex(currentSongIndex);
  };

  // Function to play the previous song
  const playPreviousSong = () => {
      currentSongIndex--;
      if (currentSongIndex < 0) {
          currentSongIndex = 0;
      }
      playSongByIndex(currentSongIndex);
  };

  // Event listener for forward button
  forwardButton.addEventListener('click', () => {
      playNextSong();
  });

  // Event listener for backward button
  backwardButton.addEventListener('click', () => {
      playPreviousSong();
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

  // Initial play of the first song (optional, depending on your UI/UX flow)
  // playSongByIndex(0);
});
