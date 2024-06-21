// Check if SpeechRecognition is available and use appropriate prefix
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

// Add event listener for mic button click to start listening animation
document.getElementById("mic-button").addEventListener("click", function() {
    var micModal = document.getElementById("micModal");
    if (micModal) {
        micModal.style.display = "block";
        recognition.start();
    }
});

// Add event listener for X button click to stop listening animation
document.getElementById("closeButton").addEventListener("click", function() {
    var micModal = document.getElementById("micModal");
    if (micModal) {
        micModal.style.display = "none";
        if (e.results[0].isFinal) {
            recognition.stop();
        }
    }
});

// Event listener to handle recognition results
recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    console.log(text); // Log what is recognized to the console

    // Reset recognition on final result
    if (e.results[0].isFinal) {
        recognition.stop();
    }
});

// // Event listener to restart recognition when it ends
// recognition.addEventListener('end', () => {
//     recognition.start();
// });

// Event listener for window load
document.addEventListener("DOMContentLoaded", function () {
    // Responsive Search Bar and Button Display
    var searchBar = document.getElementById("searchBar");
    var searchButton = document.getElementById("search-button");

    searchButton.style.display = "none";

    function adjustDisplay() {
        if (window.innerWidth <= 768) {
            searchBar.style.display = "none";
            searchButton.style.display = "block";
        } else {
            searchBar.style.display = "flex";
            searchButton.style.display = "none";
        }
    }

    adjustDisplay();
    window.addEventListener("resize", adjustDisplay);

    document.getElementById("search-button").addEventListener("click", function (event) {
        event.stopPropagation();
        searchBar.style.display = "flex";
        searchButton.style.display = "none";
    });

    document.body.addEventListener("click", function (event) {
        if (window.innerWidth <= 768 && event.target !== searchBar && !searchBar.contains(event.target)) {
            searchBar.style.display = "none";
            searchButton.style.display = "block";
        }
    });

    // Dropdown menu
    var profileIcon = document.getElementById("profile-icon");
    var dropdownMenu = document.querySelector(".profile_dropDownMenu");

    profileIcon.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Close dropdown menu when clicked anywhere outside of it
    document.addEventListener("click", function (event) {
        if (!dropdownMenu.contains(event.target) && event.target !== profileIcon) {
            dropdownMenu.style.display = "none";
        }
    });

    // Sidebar toggle for minimizing
    var sidebar = document.querySelector(".sidebar");
    var sidebarToggle = document.getElementById("custom-sidebar-toggle");
    var logoImg = document.getElementById("trial-img");

    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-minimized");
        var plan = document.querySelector(".Plan");
        var container = document.querySelector(".container")
        var containers = document.querySelector(".containers");
        if (container) {
            container.style.marginLeft = sidebar.classList.contains("sidebar-minimized") ? "130px" : "250px";  // Adjust for signupContainer specifically
        }
        else if (plan){
            plan.style.marginLeft = sidebar.classList.contains("sidebar-minimized") ? "-130px" : "0px";
        }
        else if (containers){
            containers.style.marginLeft = sidebar.classList.contains("sidebar-minimized") ? "-130px" : "0px";
        }
        
        toggleLogo();
    });

    function adjustMainContent() {
        const container = document.querySelector(".container");
        container.style.marginLeft = sidebar.classList.contains("sidebar-minimized") ? "120px" : "250px";
    }

    // Function to show profile editing window
    function showProfileEditWindow() {
        document.getElementById("edit-window").style.display = "block";
    }

    // Function to hide profile editing window
    function hideProfileEditWindow() {
        document.getElementById("edit-window").style.display = "none";
    }

    // Event listener for Profile menu item click
    var profileMenuItem = document.querySelector(".menu-item a[href='#']");
    profileMenuItem.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of anchor tag
        showProfileEditWindow(); // Show profile editing window when Profile menu item is clicked
    });

    // Event listener to close profile editing window when clicked outside of it
    document.addEventListener("click", function (event) {
        var modal = document.getElementById("edit-window");
        if (!modal.contains(event.target) && event.target !== profileMenuItem) {
            hideProfileEditWindow(); // Hide profile editing window if clicked outside
        }
    });

    // Event listener for "Cancel" button click
    var cancelButton = document.getElementById("cancel-edit");
    cancelButton.addEventListener("click", function () {
        hideProfileEditWindow(); // Hide profile editing window when "Cancel" button is clicked
    });

    var saveButton = document.querySelector("#edit-window button[type='submit']");
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        saveProfile(); // Call the saveProfile function when the "Save" button is clicked
    });

    // Function to save profile data
    function saveProfile() {
        var newUsername = document.getElementById("newUsername").value;
        var newProfilePic = document.getElementById("newProfilePic").files[0];
        var accountStatus = document.querySelector('input[name="account-status"]:checked').value;
        var contactAdmin = document.querySelector('input[type="email"]').value;

        // Here, you would send this data to the server for processing
        // For demonstration purposes, let's just log the data to console
        console.log("New Username:", newUsername);
        console.log("New Profile Picture:", newProfilePic);
        console.log("Account Status:", accountStatus);
        console.log("Contact Admin:", contactAdmin);

        // Update profile picture if a new picture is uploaded
        if (newProfilePic) {
            // Create a FileReader to read the uploaded file
            var reader = new FileReader();
            reader.onload = function (event) {
                // Update the profile picture in the UI
                var profilePicElement = document.getElementById("profile-icon");
                profilePicElement.src = event.target.result;
            };
            // Read the uploaded file as a data URL
            reader.readAsDataURL(newProfilePic);
        }

        // After saving, you may want to update the UI with the new data
        // For now, let's just close the edit window
        hideProfileEditWindow();
    }

    // Get the newProfilePic input element
    var newProfilePicInput = document.getElementById("newProfilePic");

    // Add an event listener to the input element
    newProfilePicInput.addEventListener("change", function() {
        // Check if a file has been selected
        if (newProfilePicInput.files.length > 0) {
            // Get the selected file
            var file = newProfilePicInput.files[0];

            // Check if the selected file is an image
            if (file.type.startsWith("image/")) {
                // It's an image, allow the selection and disable the input to prevent further changes
                newProfilePicInput.disabled = true;
            } else {
                // It's not an image, reset the input
                newProfilePicInput.value = "";
                alert("Please select an image file.");
            }
        }
    });

    // Dark and light mode

    function applyMode(mode) {
        const body = document.body;
        const navbar = document.querySelector(".navbar");
        const sidebar = document.querySelector(".sidebar");
        const toggleButton = document.getElementById("toggle-light-mode");

        const footer = document.querySelector("footer");
        const rows = document.querySelectorAll(".row");
        const headers = document.querySelectorAll("h2");
        const container = document.querySelector(".container");

        const searchBarInput = document.querySelector(".search-bar input[type='text']");
        const sidebarImagesLight = document.querySelectorAll(".light-mode-img");
        const sidebarImagesDark = document.querySelectorAll(".dark-mode-img");
        const profileIcon = document.getElementById("profile-icon");
        const dropdownMenu = document.querySelector(".profile_dropDownMenu");
        const dropdownMenuIconsLight = dropdownMenu.querySelectorAll(".light-mode-img");
        const dropdownMenuIconsDark = dropdownMenu.querySelectorAll(".dark-mode-img");
        const contact = document.querySelector(".contact-form");

        if (mode === "dark") {
            body.classList.add("dark-mode");
            navbar.classList.add("dark-mode");
            sidebar.classList.add("dark-mode");
            toggleButton.textContent = "Light Mode";

            sidebarImagesLight.forEach(img => img.style.display = "none");
            sidebarImagesDark.forEach(img => img.style.display = "block");

            if (profileIcon) {
                profileIcon.src = "/static/img/light_mode_images/darkProfile.png";
            }

            dropdownMenuIconsLight.forEach(img => img.style.display = "none");
            dropdownMenuIconsDark.forEach(img => img.style.display = "block");

            if (contact) {
                contact.classList.add("dark-mode");
            }

            if (footer) {
                footer.classList.add("dark-mode");
            }

            rows.forEach(row => row.classList.add("dark-mode"));
            headers.forEach(header => header.classList.add("dark-mode"));
            if (container) {
                container.classList.add("dark-mode");
            }

            if (searchBarInput) {
                searchBarInput.classList.add("dark-mode");
            }

            document.querySelectorAll(".light-mode-img").forEach(img => img.style.display = "none");
            document.querySelectorAll(".dark-mode-img").forEach(img => img.style.display = "block");

            localStorage.setItem("mode", "dark");
        } else {
            body.classList.remove("dark-mode");
            navbar.classList.remove("dark-mode");
            sidebar.classList.remove("dark-mode");
            toggleButton.textContent = "Dark Mode";

            sidebarImagesLight.forEach(img => img.style.display = "block");
            sidebarImagesDark.forEach(img => img.style.display = "none");

            if (profileIcon) {
                profileIcon.src = "/static/img/light_mode_images/profile.png";
            }

            dropdownMenuIconsLight.forEach(img => img.style.display = "block");
            dropdownMenuIconsDark.forEach(img => img.style.display = "none");

            if (contact) {
                contact.classList.remove("dark-mode");
            }

            if (footer) {
                footer.classList.remove("dark-mode");
            }

            rows.forEach(row => row.classList.remove("dark-mode"));
            headers.forEach(header => header.classList.remove("dark-mode"));
            if (container) {
                container.classList.remove("dark-mode");
            }

            if (searchBarInput) {
                searchBarInput.classList.remove("dark-mode");
            }

            document.querySelectorAll(".light-mode-img").forEach(img => img.style.display = "block");
            document.querySelectorAll(".dark-mode-img").forEach(img => img.style.display = "none");

            localStorage.setItem("mode", "light");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const savedMode = localStorage.getItem("mode") || "light";
        applyMode(savedMode);

        const modeToggleButton = document.getElementById("toggle-light-mode");
        modeToggleButton.addEventListener("click", function () {
            const currentMode = localStorage.getItem("mode") || "light";
            const newMode = currentMode === "light" ? "dark" : "light";
            applyMode(newMode);
        });
    });
});
