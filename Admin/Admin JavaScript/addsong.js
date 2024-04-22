function toggleLyricsSection() {
    var lyricsSection = document.getElementById('lyrics-section');
    var lyricsCheckbox = document.getElementById('lyrics-checkbox');
    lyricsSection.style.display = lyricsCheckbox.checked ? 'block' : 'none';
}

function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorDiv = document.getElementById(inputId + '-error');
    if (!input.value.trim()) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
    }
}

function validateForm() {
    var isValid = true;
    var fields = ['song-name', 'artist-name', 'genre', 'album-name', 'release-date', 'keywords'];

    fields.forEach(function(field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    if (isValid) {
        // Proceed with form submission
        document.getElementById('add-song-form').submit();
    }
}

function toggleLyricsSection() {
    var lyricsSection = document.getElementById('lyrics-section');
    var lyricsCheckbox = document.getElementById('lyrics-checkbox');
    lyricsSection.style.display = lyricsCheckbox.checked ? 'block' : 'none';
}

function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorDiv = document.getElementById(inputId + '-error');
    if (!input.value.trim()) {
        input.classList.add('error');
        errorDiv.textContent = 'This field is required';
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
    }
}

document.getElementById('save-button').addEventListener('click', function() {
    var isValid = true;
    var fields = ['song-name', 'artist-name', 'genre', 'album-name', 'release-date', 'keywords'];

    fields.forEach(function(field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    if (isValid) {
        // Proceed with form submission
        document.getElementById('add-song-form').submit();
    }
});
