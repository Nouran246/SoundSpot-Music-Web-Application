window.addEventListener("DOMContentLoaded", function () {
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

    window.addEventListener("resize", function () {

        adjustDisplay();
    });

    // if we clicked on the search button while the screen is minimized it hides the button and shows the search bar only
    document.getElementById("search-button").addEventListener("click", function (event) {
        event.stopPropagation();
        searchBar.style.display = "flex";
        searchButton.style.display = "none";
    });

    //if we clicked anywhere it returns everything to its initial shape
    document.body.addEventListener("click", function (event) {
        if (window.innerWidth <= 768 && event.target !== searchBar && !searchBar.contains(event.target)) {
            searchBar.style.display = "none";
            searchButton.style.display = "block";
        }
    });
});

//dropdown menu
document.addEventListener("DOMContentLoaded", function () {
    var profileIcon = document.getElementById("profile-icon");
    var dropdownMenu = document.querySelector(".profile_dropDownMenu");

    profileIcon.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var profileIcon = document.getElementById("profile-icon");
    var dropdownMenu = document.querySelector(".profile_dropDownMenu");

    profileIcon.addEventListener("click", function () {

        dropdownMenu.classList.toggle(".show");
    });
});

//dark and light mode

document.addEventListener("DOMContentLoaded", function () {
    // Function to set the selected mode (light/dark) in local storage
    function setModePreference(mode) {
        localStorage.setItem('mode', mode);
    }

    // Function to get the selected mode from local storage
    function getModePreference() {
        return localStorage.getItem('mode');
    }

    // Function to apply the selected mode to the page
    function applyMode(mode) {
        const body = document.body;
        const navbar = document.querySelector(".navbar");
        const sidebar = document.querySelector(".sidebar");
        const footer = document.querySelector("footer");
        const rows = document.querySelectorAll(".row"); // Select all row elements
        const headers = document.querySelectorAll("h2"); // Select all h2 elements
        const container = document.querySelector(".container");
        const searchBarInput = document.querySelector(".search-bar input[type='text']");
        const sidebarImagesLight = document.querySelectorAll(".light-mode-img");
        const sidebarImagesDark = document.querySelectorAll(".dark-mode-img");
        const profileIcon = document.getElementById("profile-icon");
        const dropdownMenu = document.querySelector(".profile_dropDownMenu");
        const dropdownMenuIconsLight = dropdownMenu.querySelectorAll(".light-mode-img");
        const dropdownMenuIconsDark = dropdownMenu.querySelectorAll(".dark-mode-img");
    
        [body, navbar, sidebar, footer, searchBarInput, container].forEach(el => {
            el.classList.toggle("light-mode", mode === 'light');
        });
        // Toggle light-mode class on multiple elements
        body.classList.toggle("light-mode", mode === 'light');
        navbar.classList.toggle("light-mode", mode === 'light');
        sidebar.classList.toggle("light-mode", mode === 'light');
        footer.classList.toggle("light-mode", mode === 'light');
        searchBarInput.classList.toggle("light-mode", mode === 'light');
        rows.forEach(row => row.classList.toggle("light-mode", mode === 'light')); // Apply to all rows
        headers.forEach(header => header.classList.toggle("light-mode", mode === 'light')); // Apply to all h2 headers
    
        sidebarImagesLight.forEach(img => img.classList.toggle("hidden", mode === 'dark'));
        sidebarImagesDark.forEach(img => img.classList.toggle("hidden", mode === 'light'));
    
        dropdownMenuIconsLight.forEach(img => img.classList.toggle("hidden", mode === 'dark'));
        dropdownMenuIconsDark.forEach(img => img.classList.toggle("hidden", mode === 'light'));
    }
    
    

    // Function to initialize the mode based on the stored preference
    function initializeMode() {
        const storedMode = getModePreference();
        applyMode(storedMode || 'light'); // Default to light mode if no preference is stored
    }

    // Call initializeMode() when the page loads
    initializeMode();

    // Toggle button event listener
    var toggleButton = document.getElementById("toggle-light-mode");
    toggleButton.addEventListener("click", function () {
        const mode = document.body.classList.contains("light-mode") ? 'dark' : 'light';
        setModePreference(mode);
        applyMode(mode);
    });

    // Your other existing code...

});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.getElementById("custom-sidebar-toggle");

    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-minimized");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("custom-sidebar-toggle");

    toggleButton.addEventListener("click", function () {
        toggleLogo();
    });
});
//changes the logo when we minimize the side

var logoFlag = 0;
function toggleLogo() {
    var logoImg = document.getElementById("trial-img");
    logoFlag = (logoFlag === 0) ? 1 : 0;

    if (logoFlag === 1) {
        logoImg.src = "../photo/1(2).png";  // Path updated to include "../photo/"
        logoImg.classList.add("minimized");
    } else {
        logoImg.src = "../photo/output-onlinepngtools.png";  // Path updated to include "../photo/"
        logoImg.classList.remove("minimized");
    }
}

function minimizeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const logoImg = document.getElementById("trial-img");

    sidebar.classList.add("sidebar-minimized");
    logoImg.src = "../photo/1(2).png";  // Path updated to include "../photo/"
    logoImg.classList.add("minimized");
}

function restoreSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const logoImg = document.getElementById("trial-img");

    sidebar.classList.remove("sidebar-minimized");
    logoImg.src = "../photo/output-onlinepngtools.png";  // Path updated to include "../photo/"
    logoImg.classList.remove("minimized");
}
