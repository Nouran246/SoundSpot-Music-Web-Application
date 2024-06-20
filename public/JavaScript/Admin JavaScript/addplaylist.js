/* 

function toggleArtistInput() {
    var checkbox = document.getElementById("is-album");
    var artistInput = document.getElementById("artist-name-section");

    if (checkbox.checked) {
        artistInput.style.display = "block";
    } else {
        artistInput.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-playlist-form');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const alertContainer = document.getElementById('alert-container'); */

    // Add event listener for form submission
  /*   form.addEventListener('submit', function(event) {
        let isChecked = false;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                isChecked = true;
            }
        });
        if (!isChecked) {
            event.preventDefault(); // Prevent form submission
            const alertMessage = document.createElement('div');
            alertMessage.textContent = 'Please select at least one song.';
            alertMessage.classList.add('alert-message');
            alertContainer.innerHTML = ''; // Clear previous messages
            alertContainer.appendChild(alertMessage); // Append alert message
        }
    });
 */
    // Add event listener to the album checkbox for toggling artist input visibility
   /*  const isAlbum = document.getElementById('is-album');
    isAlbum.addEventListener('change', toggleArtistInput);
});

function toggleLyricsSections() {
    var lyricsSection = document.getElementById('new-lyrics-section');
    var lyricsCheckbox = document.getElementById('new-lyrics-checkbox');
    if (lyricsSection && lyricsCheckbox) {
        lyricsSection.style.display = lyricsCheckbox.checked ? 'block' : 'none';
    } else {
        console.error("Input or error message element not found: new-lyrics-section or new-lyrics-checkbox");
    }
}
 */


document.addEventListener('DOMContentLoaded', function() {
    function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorDiv = document.getElementById(inputId + '-error');

    // Check if input and errorDiv exist
    if (!input || !errorDiv) {
        console.error("Input or error message element not found:", inputId);
        return;
    }

    if (!input.value.trim()) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.color = 'red'; // Set error message color to red
        errorDiv.style.display = 'block'; // Display the error message
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none'; // Hide the error message
    }
}
});
