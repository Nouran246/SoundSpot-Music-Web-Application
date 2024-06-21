// Open the modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Close the modal when clicked outside the modal content
  window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  // Add a new playlist
  function addPlaylist() {
    var playlistName = document.getElementById('playlistNameInput').value;
    var playlistImage = document.getElementById('playlistImageInput').files[0];
  
    if (playlistName) {
      // If the user entered a name, create a new list item for the playlist
      var playlistItem = document.createElement('li');
      var playlistLink = document.createElement('a');
      playlistLink.setAttribute('href', '../../../view/playlistPage.html?playlist=' + encodeURIComponent(playlistName));
      var playlistDiv = document.createElement('div');
      playlistDiv.classList.add('playlist');
      var playlistImg = document.createElement('img');
      playlistImg.setAttribute('alt', 'Playlist image');
      
      // If user selected an image, set it as the playlist image
      if (playlistImage) {
        var reader = new FileReader();
        reader.onload = function(e) {
          playlistImg.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(playlistImage);
      } else {
        // If no image selected, set a default image
        playlistImg.setAttribute('src', '../photo/placeholder_image.jfif');
      }
  
      var playlistTitle = document.createElement('div');
      playlistTitle.classList.add('playlist-title');
      playlistTitle.textContent = playlistName;
      
      // Append the elements to construct the new playlist item
      playlistDiv.appendChild(playlistImg);
      playlistDiv.appendChild(playlistTitle);
      playlistLink.appendChild(playlistDiv);
      playlistItem.appendChild(playlistLink);
      
      // Append the new playlist item to the existing playlist list
      document.querySelector('.container ul').appendChild(playlistItem);
      
      // Close the modal
      closeModal();
    }
  }
  
  // Close the modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  // When the plus icon is clicked, open the modal
  document.getElementById('addPlaylistButton').addEventListener('click', openModal);
  