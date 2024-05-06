document.addEventListener("DOMContentLoaded", function() {
    var saveButton = document.getElementById("save-button");
    var cancelButton = document.getElementById("cancel-button");
    var settingsButton = document.getElementById("settings-button");
    var settingsPopupContainer = document.querySelector('.settings-popup-container');

    saveButton.addEventListener("click", function() {
        // Show alert to confirm language change
        var confirmChange = confirm("Are you sure you want to change the language?");
        if (confirmChange) {
            // Your code to change the language
            alert("Language changed successfully!");
        }
    });

    cancelButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'none'; // Hide the settings popup
    });

    settingsButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'block'; // Show the settings popup
    });
});


function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}