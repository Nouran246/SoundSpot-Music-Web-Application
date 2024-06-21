// Function to toggle the lyrics section visibility based on checkbox state
function toggleLyricsSection() {
    var lyricsSection = document.getElementById('lyrics-section');
    var lyricsCheckbox = document.getElementById('lyrics-checkbox');
    if (lyricsSection && lyricsCheckbox) {
        lyricsSection.style.display = lyricsCheckbox.checked ? 'block' : 'none';
    } else {
        console.error("Input or error message element not found: lyrics-section or lyrics-checkbox");
    }
}

// Function to validate input fields
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
        errorDiv.style.display = 'block'; // Display the error message
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none'; // Hide the error message
    }
}


// Function to handle genre selection
function checkOtherGenre(value) {
    var otherGenreInput = document.getElementById('other-genre-input');
    if (otherGenreInput) {
        otherGenreInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherGenreInput.value = "";
            validateInput('other-genre-input'); // Validate on change
        }
    } else {
        console.error("Input or error message element not found: other-genre-input");
    }
}

// Function to handle artist selection
function checkOtherArtist(value) {
    var otherArtistInput = document.getElementById('other-artist-input');
    if (otherArtistInput) {
        otherArtistInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherArtistInput.value = "";
            validateInput('other-artist-input'); // Validate on change
        }
    } else {
        console.error("Input or error message element not found: other-artist-input");
    }
}

// Function to validate the entire form
function validateForm() {
    var isValid = true;
    var fields = ['song-name', 'artist-name', 'genre', 'album-name', 'release-date', 'keywords', 'duration',
        'songwriters', 'producers', 'composer', 'release-type', 'collaborations', 'featured-artists'];
    var otherFields = ['other-genre-input', 'other-artist-input'];

    fields.forEach(function (field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    // Validate "Other" text fields
    otherFields.forEach(function (field) {
        var otherInput = document.getElementById(field);
        if (otherInput && otherInput.style.display !== 'none') {
            validateInput(field);
            if (otherInput.classList.contains('error')) {
                isValid = false;
            }
        }
    });

    if (!isValid) {
        return;
    }

    // Proceed with form submission
    document.getElementById('add-song-form').submit();
}

// Attach the validateForm function to the click event of the save button
document.getElementById('save-button').addEventListener('click', validateForm);

// Function to handle genre selection (generic function)
function checkOther(value) {
    var otherGenreInput = document.getElementById('other-genre-input');
    if (otherGenreInput) {
        otherGenreInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherGenreInput.value = "";
            validateInput('other-genre-input'); // Validate on change
        }
    } else {
        console.error("Input or error message element not found: other-genre-input");
    }
}

// Function to handle artist selection (generic function)
function checkOtherArtist(value) {
    var otherArtistInput = document.getElementById('other-artist-input');
    if (otherArtistInput) {
        otherArtistInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherArtistInput.value = "";
            validateInput('other-artist-input'); // Validate on change
        }
    } else {
        console.error("Input or error message element not found: other-artist-input");
    }
}
