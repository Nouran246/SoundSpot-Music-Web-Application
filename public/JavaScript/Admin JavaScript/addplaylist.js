/* // Function to validate input fields

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
            errorDiv.style.color = 'red'; // Make the error text red
            errorDiv.style.display = 'block'; // Display the error message
        } else {
            input.classList.remove('error');
            errorDiv.textContent = '';
            errorDiv.style.display = 'none'; // Hide the error message
        }
    }
    function validateSelected(selectId) {
        var select = document.getElementById(selectId);
        var errorDiv = document.getElementById(selectId + '-error');

        if (!select || !errorDiv) {
            console.error("Select or error message element not found:", selectId);
            return;
        }

        if (!select.value.trim()) {
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
    // Function to validate the entire form
    function validateForm() {
        var isValid = true;
        var fields = ['playlist-name', 'genre', 'image-file'];
        var selectFields = ['privacy-settings'];

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

        // Validate that at least two songs are selected
        var selectedSongs = document.querySelectorAll('input[name="songIds"]:checked');
        var songIdsErrorDiv = document.getElementById('songIds-error');
        if (selectedSongs.length < 2) {
            songIdsErrorDiv.textContent = 'Please select at least two songs';
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

        // Proceed with form submission
        document.getElementById('add-playlist-form').submit();
    }

    // Attach the validateForm function to the click event of the save button
    document.getElementById('save-button').addEventListener('click', validateForm);
 */


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
        errorDiv.style.color = 'red'; // Make the error text red
        errorDiv.style.display = 'block'; // Display the error message
    } else {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none'; // Hide the error message
    }
}

function validateSelected(selectId) {
    var select = document.getElementById(selectId);
    var errorDiv = document.getElementById(selectId + '-error');

    if (!select || !errorDiv) {
        console.error("Select or error message element not found:", selectId);
        return;
    }

    // Check if select.value exists and is not an empty string before trimming
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

// Function to validate the entire form
function validateForm() {
    var isValid = true;
    var fields = ['playlist-name', 'genre', 'image-file'];
    var selectFields = ['privacy-settings'];

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

    // Validate that at least two songs are selected
    var selectedSongs = document.querySelectorAll('input[name="songIds"]:checked');
    var songIdsErrorDiv = document.getElementById('songIds-error');
    if (selectedSongs.length < 2) {
        songIdsErrorDiv.textContent = 'Please select at least two songs';
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

    // Proceed with form submission
    document.getElementById('add-playlist-form').submit();
}

// Attach the validateForm function to the click event of the save button
document.getElementById('save-button').addEventListener('click', validateForm);
