

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
    const alertContainer = document.getElementById('alert-container');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
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

    // Add event listener to the album checkbox for toggling artist input visibility
    const isAlbum = document.getElementById('is-album');
    isAlbum.addEventListener('change', toggleArtistInput);
});

