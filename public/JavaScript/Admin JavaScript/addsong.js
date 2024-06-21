function toggleLyricsSection() {
    var lyricsSection = document.getElementById('lyrics-section');
    var lyricsCheckbox = document.getElementById('lyrics-checkbox');
    if (lyricsSection && lyricsCheckbox) {
        lyricsSection.style.display = lyricsCheckbox.checked ? 'block' : 'none';
    } else {
        console.error("Input or error message element not found: lyrics-section or lyrics-checkbox");
    }
}

function validateFileInput(fileId, validTypes, errorMessage) {
    var fileInput = document.getElementById(fileId);
    var errorDiv = document.getElementById(fileId + '-error');

    if (!fileInput || !errorDiv) {
        console.error("File input or error message element not found:", fileId);
        return;
    }

    if (!fileInput.files.length) {
        fileInput.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.color = 'red';
        errorDiv.style.display = 'block';
    } else {
        var file = fileInput.files[0];
        var fileType = file.type;

        if (validTypes.includes(fileType)) {
            fileInput.classList.remove('error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        } else {
            fileInput.classList.add('error');
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = 'red';
            errorDiv.style.display = 'block';
        }
    }
}
function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorDiv = document.getElementById(inputId + '-error');

    if (!input || !errorDiv) {
        console.error("Input or error message element not found:", inputId);
        return;
    }

    if (!input.value.trim()) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.display = 'block';
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function checkOtherGenre(value) {
    var otherGenreInput = document.getElementById('other-genre-input');
    if (otherGenreInput) {
        otherGenreInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherGenreInput.value = "";
            validateInput('other-genre-input');
        }
    } else {
        console.error("Input or error message element not found: other-genre-input");
    }
}

function checkOtherArtist(value) {
    var otherArtistInput = document.getElementById('other-artist-input');
    if (otherArtistInput) {
        otherArtistInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherArtistInput.value = "";
            validateInput('other-artist-input');
        }
    } else {
        console.error("Input or error message element not found: other-artist-input");
    }
}

function validateForm() {
    var isValid = true;
    var fields = ['song-name', 'artist-name', 'genre', 'album-name', 'release-date', 'keywords', 'duration',
        'songwriters', 'producers', 'composer', 'release-type', 'collaborations', 'featured-artists'];
    var otherFields = ['other-genre-input', 'other-artist-input'];
    var fileFields = [
        { id: 'image-file', types: ['image/jpeg', 'image/png'], error: 'Invalid file type. Only JPEG and PNG are allowed.' },
        { id: 'song-file', types: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/mp4'], error: 'Invalid file type. Only MP3, WAV, OGG, AAC, and M4A are allowed.' }
    ];
    var selectFields = ['record-label'];

    fileFields.forEach(function (field) {
        validateFileInput(field.id, field.types, field.error);
        if (document.getElementById(field.id).classList.contains('error')) {
            isValid = false;
        }
    });

    fields.forEach(function (field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    otherFields.forEach(function (field) {
        var otherInput = document.getElementById(field);
        if (otherInput && otherInput.style.display !== 'none') {
            validateInput(field);
            if (otherInput.classList.contains('error')) {
                isValid = false;
            }
        }
    });

    selectFields.forEach(function (field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    var lyricsCheckbox = document.getElementById('lyrics-checkbox');
    if (lyricsCheckbox.checked) {
        var lyricsTextarea = document.getElementById('lyrics');
        if (!lyricsTextarea.value.trim()) {
            isValid = false;
            lyricsTextarea.classList.add('error');
            document.getElementById('lyrics-error').textContent = 'This field is required';
            document.getElementById('lyrics-error').style.display = 'block';
        } else {
            lyricsTextarea.classList.remove('error');
            document.getElementById('lyrics-error').textContent = '';
            document.getElementById('lyrics-error').style.display = 'none';
        }
    }

    if (!isValid) {
        return;
    }

    document.getElementById('add-song-form').submit();
}

document.getElementById('save-button').addEventListener('click', validateForm);

function checkOther(value) {
    var otherGenreInput = document.getElementById('other-genre-input');
    if (otherGenreInput) {
        otherGenreInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherGenreInput.value = "";
            validateInput('other-genre-input');
        }
    } else {
        console.error("Input or error message element not found: other-genre-input");
    }
}

function checkOtherArtist(value) {
    var otherArtistInput = document.getElementById('other-artist-input');
    if (otherArtistInput) {
        otherArtistInput.style.display = value === "Other" ? "block" : "none";
        if (value !== "Other") {
            otherArtistInput.value = "";
            validateInput('other-artist-input');
        }
    } else {
        console.error("Input or error message element not found: other-artist-input");
    }
}
