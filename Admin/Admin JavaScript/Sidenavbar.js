
document.addEventListener("DOMContentLoaded", function() {
    var languageSelect = document.getElementById("language-select");

    var saveButton = document.getElementById("save-button");
    var cancelButton = document.getElementById("cancel-button");

    var settingsButton = document.getElementById("settings-button");

    var settingsPopupContainer = document.querySelector('.settings-popup-container');

    var initialLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = initialLanguage;

    settingsPopupContainer.style.display = 'none';

    saveButton.addEventListener("click", function() {
        var selectedLanguage = languageSelect.value;

        localStorage.setItem('selectedLanguage', selectedLanguage);

        alert("Are you sure you want to change the language to " + selectedLanguage);

        setLanguage(selectedLanguage);

        settingsPopupContainer.style.display = 'none';
    });

    cancelButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'none';
    });

    settingsButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'block';
    });

    setLanguage(initialLanguage);
});

var translations = {
    'en': {
        'manage_users': 'Manage Users',
        'manage_songs': 'Manage Songs',
        'reports': 'Reports',
        'plans': 'Plans',
        'company_overview': 'Company Overview',
        'community_guidelines': 'Community Guidelines',
        'contacts': 'Contacts',
        'settings': 'Settings',
        'change_language': 'Change Language',
        'save': 'Save',
        'cancel': 'Cancel',
        'footer_text': '&copy; 2024 SoundSpot. All rights reserved.',
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'email': 'Email',
        'search_placeholder': 'Search...',
        'profile': 'Profile',
        'view_as': 'View as',
        'light_mode': 'Light Mode',
        'log_out': 'Log Out',
        'playlist_name_label': 'Playlist Name:',
        'select_genre_placeholder': 'Select Genre',
        'album_name_label': 'Album Name:',
        'select_songs_button': 'Select Songs',
        'release_date_label': 'Release Date:',
        'keywords_label': 'Keywords:',
    },
    'gm': {
        // German translations
        'manage_users': 'Benutzer verwalten',
        'manage_songs': 'Lieder verwalten',
        'reports': 'Berichte',
        'plans': 'Pläne',
        'company_overview': 'Firmenüberblick',
        'community_guidelines': 'Community-Richtlinien',
        'contacts': 'Kontakte',
        'settings': 'Einstellungen',
        'change_language': 'Sprache ändern',
        'save': 'Speichern',
        'cancel': 'Abbrechen',
        'footer_text': '&copy; 2024 SoundSpot. Alle Rechte vorbehalten.',
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'email': 'E-Mail',
        'search_placeholder': 'Suchen...',
        'profile': 'Profil',
        'view_as': 'Als anzeigen',
        'light_mode': 'Hell-Modus',
        'log_out': 'Ausloggen',
        'playlist_name_label': 'Wiedergabelistenname:',
        'select_genre_placeholder': 'Genre auswählen',
        'album_name_label': 'Albumname:',
        'select_songs_button': 'Lieder auswählen',
        'release_date_label': 'Veröffentlichungsdatum:',
        'keywords_label': 'Stichwörter:'
    }
};

function setLanguage(language) {
    var translation = translations[language];


    var sidebarLinks = document.querySelectorAll('.text-a.t');
    sidebarLinks.forEach(function(link) {
        var key = link.textContent.trim().toLowerCase().replace(/\s+/g, '_');
        if (translation[key]) {
            link.textContent = translation[key];
        }
    });

var manageUsersIcon = document.querySelector('.text-a:nth-child(3) .fas.fa-users');
if (manageUsersIcon && translation['manage_users']) {
    manageUsersIcon.nextElementSibling.textContent = translation['manage_users'];
}

var manageSongsIcon = document.querySelector('.text-a:nth-child(4) .fa-solid.fa-music');
if (manageSongsIcon && translation['manage_songs']) {
    manageSongsIcon.nextElementSibling.textContent = translation['manage_songs'];
}

var reportsIcon = document.querySelector('.text-a:nth-child(5) .fa-solid.fa-chart-column');
if (reportsIcon && translation['reports']) {
    reportsIcon.nextElementSibling.textContent = translation['reports'];
}

var plansIcon = document.querySelector('.text-a:nth-child(6) .fa-solid.fa-wallet');
if (plansIcon && translation['plans']) {
    plansIcon.nextElementSibling.textContent = translation['plans'];
}

var companyOverviewIcon = document.querySelector('.text-a:nth-child(7) .fa-regular.fa-newspaper');
if (companyOverviewIcon && translation['company_overview']) {
    companyOverviewIcon.nextElementSibling.textContent = translation['company_overview'];
}

var communityGuidelinesIcon = document.querySelector('.text-a:nth-child(8) .fa-solid.fa-file-signature');
if (communityGuidelinesIcon && translation['community_guidelines']) {
    communityGuidelinesIcon.nextElementSibling.textContent = translation['community_guidelines'];
}

var contactsIcon = document.querySelector('.text-a:nth-child(9) .fas.fa-phone');
if (contactsIcon && translation['contacts']) {
    contactsIcon.nextElementSibling.textContent = translation['contacts'];
}

    var searchBar = document.querySelector('.search-bar input[type="text"]');
    if (translation['search_placeholder']) {
        searchBar.placeholder = translation['search_placeholder'];
    }

    var profileLink = document.querySelector('#profile a');
    if (translation['profile']) {
        profileLink.textContent = translation['profile'];
    }

    var viewAsLink = document.querySelector('.menu-item:nth-child(2) a');
    if (translation['view_as']) {
        viewAsLink.textContent = translation['view_as'];
    }
    var settingsIcon = document.querySelector('.menu-item:nth-child(3) .fa-solid.fa-gear');
if (settingsIcon && translation['settings']) {
    settingsIcon.nextElementSibling.textContent = translation['settings'];
}
    var lightModeLink = document.querySelector('.menu-item:nth-child(4) a');
    if (translation['light_mode']) {
        lightModeLink.textContent = translation['light_mode'];
    }

    var logOutLink = document.querySelector('.menu-item:nth-child(5) a');
    if (translation['log_out']) {
        logOutLink.textContent = translation['log_out'];
    }

    var labelElement = document.querySelector('label[for="language-select"]');
    var saveButton = document.getElementById('save-button');
    var cancelButton = document.getElementById('cancel-button');
    var settingsPopupTitle = document.querySelector('.settings-popup h3');
    if (translation['change_language']) {
        labelElement.textContent = translation['change_language'];
    }
    if (translation['save']) {
        saveButton.textContent = translation['save'];
    }
    if (translation['cancel']) {
        cancelButton.textContent = translation['cancel'];
    }
    if (translation['settings']) {
    settingsPopupTitle.textContent = translation['settings'];
}

    var footerText = document.querySelector('footer .text-center p');
    var socialIcons = document.querySelectorAll('.social-icons a');
    if (translation['footer_text']) {
        footerText.textContent = translation['footer_text'];
    }

  
}

window.addEventListener("DOMContentLoaded", function () {
    console.log(document.getElementById("sidebar")); 
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
    function setModePreference(mode) {
        localStorage.setItem('mode', mode);
    }

    function getModePreference() {
        return localStorage.getItem('mode');
    }

    function applyMode(mode) {
        const body = document.body;
        const navbar = document.querySelector(".navbar");
        const sidebar = document.querySelector(".sidebar");
        const footer = document.querySelector("footer");
        const searchBarInput = document.querySelector(".search-bar input[type='text']");
        const sidebarImagesLight = document.querySelectorAll(".light-mode-img");
        const sidebarImagesDark = document.querySelectorAll(".dark-mode-img");
        const profileIcon = document.getElementById("profile-icon");
        const dropdownMenu = document.querySelector(".profile_dropDownMenu");
        const dropdownMenuIconsLight = dropdownMenu.querySelectorAll(".light-mode-img");
        const dropdownMenuIconsDark = dropdownMenu.querySelectorAll(".dark-mode-img");

        body.classList.toggle("light-mode", mode === 'light');
        navbar.classList.toggle("light-mode", mode === 'light');
        sidebar.classList.toggle("light-mode", mode === 'light');
        footer.classList.toggle("light-mode", mode === 'light');
        searchBarInput.classList.toggle("light-mode", mode === 'light');

        sidebarImagesLight.forEach(function (img) {
            img.classList.toggle("hidden", mode === 'dark');
        });
        sidebarImagesDark.forEach(function (img) {
            img.classList.toggle("hidden", mode === 'light');
        });

        dropdownMenuIconsLight.forEach(function (img) {
            img.classList.toggle("hidden", mode === 'dark');
        });
        dropdownMenuIconsDark.forEach(function (img) {
            img.classList.toggle("hidden", mode === 'light');
        });
    }

    function initializeMode() {
        const storedMode = getModePreference();
        applyMode(storedMode || 'light'); // Default to light mode if no preference is stored
    }

    initializeMode();

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

    if (sidebar) {
        sidebar.classList.remove("sidebar-minimized");

        logoImg.src = "photo/output-onlinepngtools.png";
        logoImg.classList.remove("minimized");
    } else {
        console.error("Sidebar element not found");
    }
}

function changeLogo() {
  
}