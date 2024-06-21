// public/JavaScript/Admin JavaScript/addplaylist.js

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
        errorDiv.style.color = 'red';
        errorDiv.style.display = 'block';
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function validateSelected(selectId) {
    var select = document.getElementById(selectId);
    var errorDiv = document.getElementById(selectId + '-error');

    if (!select || !errorDiv) {
        console.error("Select or error message element not found:", selectId);
        return;
    }

    if (!select.value || !select.value.trim()) {
        select.classList.add('error');
        errorDiv.textContent = 'This field is required';
        errorDiv.style.color = 'red';
        errorDiv.style.display = 'block';
    } else {
        select.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function validateFileInput(fileId) {
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
        var validFileTypes = ["image/jpeg", "image/png"];

        if (!validFileTypes.includes(fileType)) {
            fileInput.classList.add('error');
            errorDiv.textContent = 'Invalid file type. Only JPEG and PNG are allowed.';
            errorDiv.style.color = 'red';
            errorDiv.style.display = 'block';
        } else {
            fileInput.classList.remove('error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
}

function validateForm() {
    var isValid = true;
    var fields = ['playlist-name', 'genre'];
    var selectFields = ['privacy-settings'];
    var fileFields = ['image-file'];

    fields.forEach(function (field) {
        validateInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    selectFields.forEach(function (field) {
        validateSelected(field);
        if (document.getElementById(field) && document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });
    fileFields.forEach(function (field) {
        validateFileInput(field);
        if (document.getElementById(field).classList.contains('error')) {
            isValid = false;
        }
    });

    var selectedSongs = document.querySelectorAll('input[name="songIds"]:checked');
    var songIdsErrorDiv = document.getElementById('songIds-error');
    if (selectedSongs.length < 3) {
        songIdsErrorDiv.textContent = 'Please select at least three songs';
        songIdsErrorDiv.style.color = 'red';
        songIdsErrorDiv.style.display = 'block';
        isValid = false;
    } else {
        songIdsErrorDiv.textContent = '';
        songIdsErrorDiv.style.display = 'none';
    }

    if (!isValid) {
        return;
    }
    document.getElementById('add-playlist-form').submit();
}
document.getElementById('save-button').addEventListener('click', validateForm);
