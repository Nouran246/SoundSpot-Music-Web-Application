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
        toggleLogo();
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
        const contact = document.querySelectorAll(".contact");
        const aboutus = document.querySelectorAll(".aboutus");
    
        [body, navbar, sidebar, footer, searchBarInput, container].forEach(el => {
            el.classList.toggle("light-mode", mode === 'light');
        });
        rows.forEach(row => row.classList.toggle("light-mode", mode === 'light'));
        headers.forEach(header => header.classList.toggle("light-mode", mode === 'light'));
        contact.forEach(item => item.classList.toggle("light-mode", mode === 'light'));
        aboutus.forEach(item => item.classList.toggle("light-mode", mode === 'light'));
    
        sidebarImagesLight.forEach(img => img.classList.toggle("hidden", mode === 'dark'));
        sidebarImagesDark.forEach(img => img.classList.toggle("hidden", mode === 'light'));
    
        dropdownMenuIconsLight.forEach(img => img.classList.toggle("hidden", mode === 'dark'));
        dropdownMenuIconsDark.forEach(img => img.classList.toggle("hidden", mode === 'light'));
        document.body.classList.toggle("light-mode", mode === 'light');
    
        const toggleElements = document.querySelectorAll('.navbar, .sidebar, footer, .search-bar input[type="text"]');
        toggleElements.forEach(element => {
            element.classList.toggle("light-mode", mode === 'light');
        });
    
        toggleButton.classList.toggle("active", mode === 'light');
    }
    

    function initializeMode() {
        const storedMode = localStorage.getItem('mode') || 'light';
        applyMode(storedMode);
    }

    const toggleButton = document.getElementById("toggle-light-mode");
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            const newMode = document.body.classList.contains("light-mode") ? 'dark' : 'light';
            toggleButton.classList.toggle("active"); 
            localStorage.setItem('mode', newMode);
            applyMode(newMode);
        });
    }

    initializeMode();

    // Logo toggle based on sidebar state
    function toggleLogo() {
        if (sidebar.classList.contains("sidebar-minimized")) {
            logoImg.src = "../photo/1(2).png";
            logoImg.classList.add("minimized");
        } else {
            logoImg.src = "../photo/output-onlinepngtools.png";
            logoImg.classList.remove("minimized");
        }
    }

});