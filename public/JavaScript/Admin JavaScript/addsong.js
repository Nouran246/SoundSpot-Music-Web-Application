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

function validateSongFile() {
    var input = document.getElementById('song-file');
    var errorDiv = document.getElementById('song-file-error');

    if (!input || !errorDiv) {
        console.error("Input or error message element not found: song-file");
        return;
    }

    if (input.files.length === 0) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.display = 'block'; // Display the error message
    } else {
        var validExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.m4a'];
        var isValidFile = false;
        for (var i = 0; i < input.files.length; i++) {
            var fileName = input.files[i].name.toLowerCase();
            if (validExtensions.some(ext => fileName.endsWith(ext))) {
                isValidFile = true;
                break;
            }
        }
        if (!isValidFile) {
            input.classList.add('error');
            errorDiv.textContent = 'Please upload a valid audio file (MP3, WAV, OGG, AAC, M4A)';
            errorDiv.style.display = 'block'; // Display the error message
        } else {
            input.classList.remove('error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none'; // Hide the error message
        }
    }
}



function validateImageFile() {
    var input = document.getElementById('image-file');
    var errorDiv = document.getElementById('image-file-error');

    if (!input || !errorDiv) {
        console.error("Input or error message element not found: image-file");
        return;
    }

    if (input.files.length === 0) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.display = 'block'; // Display the error message
    } else {
        var validImageTypes = ['image/jpeg', 'image/png'];
        var isValidImage = true;
        for (var j = 0; j < input.files.length; j++) {
            if (!validImageTypes.includes(input.files[j].type)) {
                isValidImage = false;
                break;
            }
        }
        if (!isValidImage) {
            input.classList.add('error');
            errorDiv.textContent = 'Please upload a valid image file (JPEG, PNG)';
            errorDiv.style.display = 'block'; // Display the error message
        } else {
            input.classList.remove('error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none'; // Hide the error message
        }
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
// Function to validate the entire form
function validateForm() {
    var isValid = true;
    var fields = ['song-name', 'artist-name', 'genre', 'album-name',
         'release-date', 'keywords', 'duration', 'songwriters', 'producers', 
         'composer', 'release-type', 'collaborations', 'featured-artists','lyrics','record-label', 'song-file', 'image-file'];
    var otherFields = ['other-genre-input', 'other-artist-input'];

    fields.forEach(function(field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });
    validateSongFile();
    validateImageFile();


    // Validate "Other" text fields
    otherFields.forEach(function(field) {
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

// Add event listener to save button
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

