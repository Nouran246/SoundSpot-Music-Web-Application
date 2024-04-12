
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
    var toggleButton = document.getElementById("toggle-light-mode");
    var body = document.body;
    var navbar = document.querySelector(".navbar");
    var sidebar = document.querySelector(".sidebar");
    var footer = document.querySelector("footer");
    var searchBarInput = document.querySelector(".search-bar input[type='text']");
    var sidebarImagesLight = document.querySelectorAll(".light-mode-img");
    var sidebarImagesDark = document.querySelectorAll(".dark-mode-img");
    var profileIcon = document.getElementById("profile-icon");
    var dropdownMenu = document.querySelector(".profile_dropDownMenu");
    var dropdownMenuIconsLight = dropdownMenu.querySelectorAll(".light-mode-img");
    var dropdownMenuIconsDark = dropdownMenu.querySelectorAll(".dark-mode-img");

    toggleButton.addEventListener("click", function () {
        body.classList.toggle("light-mode");
        navbar.classList.toggle("light-mode");
        sidebar.classList.toggle("light-mode");
        footer.classList.toggle("light-mode");
        searchBarInput.classList.toggle("light-mode");

        sidebarImagesLight.forEach(function (img) {
            img.classList.toggle("hidden");
        });
        sidebarImagesDark.forEach(function (img) {
            img.classList.toggle("hidden");
        });

        dropdownMenuIconsLight.forEach(function (img) {
            img.classList.toggle("hidden");
        });
        dropdownMenuIconsDark.forEach(function (img) {
            img.classList.toggle("hidden");
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggle-light-mode");

    toggleButton.addEventListener("click", function () {
        toggleButton.classList.toggle("light-mode");
    });
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
        logoImg.src = "photo/1(2).png";
        logoImg.classList.add("minimized");
    } else {
        logoImg.src = "photo/output-onlinepngtools.png";
        logoImg.classList.remove("minimized");
    }
}


// t-minimize the side-bar
function minimizeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const logoImg = document.getElementById("trial-img");

    sidebar.classList.add("sidebar-minimized");
    logoImg.src = "photo/1(2).png";
    logoImg.classList.add("minimized");
}

// teraga3 el sid-bar
function restoreSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const logoImg = document.getElementById("trial-img");

    sidebar.classList.remove("sidebar-minimized");
    logoImg.src = "photo/output-onlinepngtools.png";
    logoImg.classList.remove("minimized");
}

function handleResize() {
    if (window.innerWidth <= 768) {
        minimizeSidebar();
    } else {
        restoreSidebar();
    }
}

window.addEventListener("resize", handleResize);
handleResize();



