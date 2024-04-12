function toggleNavbar() {
    var navbar = document.querySelector('.navigationbar');
    var logo = document.getElementById('logo');
    navbar.classList.toggle('minimized');
    logo.style.display = navbar.classList.contains('minimized') ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    var profileIcon = document.getElementById("user");
    var dropdownMenu = document.querySelector(".dropdown-content");

    profileIcon.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var profileIcon = document.getElementById("user");
    var dropdownMenu = document.querySelector(".dropdown-content");

    profileIcon.addEventListener("click", function () {
        
        dropdownMenu.classList.toggle(".show");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var toggleLightModeButton = document.getElementById("toggle-light-mode");
    var body = document.querySelector("body");
    var navigationBar = document.querySelector(".navigationbar");
    var header = document.querySelector(".header");
    var foot=document.querySelector("footer");
    var too = document.querySelector(".toggle-button");
    var dc = document.querySelector(".dropdown-content");
    var lightbutton = document.querySelector("#toggle-light-mode");
    
    toggleLightModeButton.addEventListener("click", function() {
        body.classList.toggle("light-mode");
        navigationBar.classList.toggle("light-mode");
        header.classList.toggle("light-mode");
        too.classList.toggle("light-mode");
        foot.classList.toggle("light-mode");
        dc.classList.toggle("light-mode");
        lightbutton.classList.toggle("light-mode");
        
    });
});
