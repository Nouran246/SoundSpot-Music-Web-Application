function toggleNavbar() {
    var navbar = document.querySelector('.navigationbar');
    navbar.classList.toggle('minimized');
    var trialImg = document.querySelector('#trial-img');
    trialImg.classList.toggle('minimized');
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
