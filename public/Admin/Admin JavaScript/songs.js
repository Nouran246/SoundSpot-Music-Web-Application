// ManageUsers.js

// Function to adjust sidebar based on window width
function adjustSidebar() {
    var sidebar = document.querySelector(".sidebar");

    if (window.innerWidth <= 990) {
        minimizeSidebar();
    } else {
        restoreSidebar();
    }
}

// Function to setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchText = this.value.toLowerCase().trim();
            const listItems = document.querySelectorAll('.list-item');

            listItems.forEach(function (item) {
                const itemText = item.querySelector('.text').textContent.toLowerCase();

                if (searchText === '' || itemText.includes(searchText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Function to initialize user info accordion
function User_Info() {
    var userInfoContainers = document.querySelectorAll('.user-info-container');
    userInfoContainers.forEach(function (container) {
        container.style.display = 'none';
    });

    var listItems = document.querySelectorAll('.list-item');
    listItems.forEach(function (item) {
        var chevronIcon = item.querySelector('.fa-chevron-right');
        if (chevronIcon) {
            chevronIcon.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleItem(item);
            });
        }

        item.addEventListener('click', function () {
            var isActive = this.classList.contains('active');

            // Close all other active items
            if (!isActive) {
                listItems.forEach(function (otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');

                        var otherCaretIcon = otherItem.querySelector('.fa-chevron-down');
                        if (otherCaretIcon) {
                            otherCaretIcon.classList.remove('fa-chevron-down');
                            otherCaretIcon.classList.add('fa-chevron-right');
                        }

                        var otherUserInfoContainer = otherItem.nextElementSibling;
                        if (otherUserInfoContainer && otherUserInfoContainer.classList.contains('user-info-container')) {
                            otherUserInfoContainer.style.display = 'none';
                        }
                    }
                });
            }

            // Toggle current item
            this.classList.toggle('active', !isActive);

            var caretIcon = this.querySelector('.fa-chevron-right');
            if (caretIcon) {
                caretIcon.classList.remove('fa-chevron-right');
                caretIcon.classList.add('fa-chevron-down');
            } else {
                caretIcon = this.querySelector('.fa-chevron-down');
                caretIcon.classList.remove('fa-chevron-down');
                caretIcon.classList.add('fa-chevron-right');
            }

            var userInfoContainer = this.nextElementSibling;
            if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                userInfoContainer.style.display = isActive ? 'none' : 'block';

                // Set default icon state and content visibility
                var personalInfoIcon = userInfoContainer.querySelector('.fa-info');
                var activityLogIcon = userInfoContainer.querySelector('.fa-clock-rotate-left');
                var generalContent = userInfoContainer.querySelector('.general-content');
                var activityLogContent = userInfoContainer.querySelector('.activity-log-content');

                personalInfoIcon.style.color = "#800080";
                activityLogIcon.style.color = "#ddd";

                generalContent.style.display = "block";
                activityLogContent.style.display = "none";
            }
        });
    });

    // Event listeners for each icon
    userInfoContainers.forEach(function (userInfoContainer) {
        var personalInfoIcon = userInfoContainer.querySelector('.fa-info');
        var activityLogIcon = userInfoContainer.querySelector('.fa-clock-rotate-left');

        personalInfoIcon.addEventListener('click', function () {
            toggleIcon(personalInfoIcon, userInfoContainer, 'general-content');
        });

        activityLogIcon.addEventListener('click', function () {
            toggleIcon(activityLogIcon, userInfoContainer, 'activity-log-content');
        });
    });
}

// Function to toggle icon and content visibility
function toggleIcon(icon, userInfoContainer, contentClass) {
    var icons = [userInfoContainer.querySelector('.fa-info'),
    userInfoContainer.querySelector('.fa-clock-rotate-left')];

    var contents = [userInfoContainer.querySelector('.general-content'),
    userInfoContainer.querySelector('.activity-log-content')];

    icons.forEach(function (currentIcon) {
        if (currentIcon === icon) {
            currentIcon.style.color = "#800080"; 
        } else {
            currentIcon.style.color = "#ddd"; 
        }
    });

    contents.forEach(function (currentContent) {
        if (currentContent.classList.contains(contentClass)) {
            currentContent.style.display = "block";
        } else {
            currentContent.style.display = "none";
        }
    });
}


// Function to handle user deletion
function handleUserDeletion() {
    var deleteIcon = document.getElementById('delete-icon1');
    var deletePopup = document.getElementById('delete-popup');
    var selectItemPopup = document.getElementById('select-item-popup'); 
    var checkboxes = document.querySelectorAll('.custom-checkbox');
    var okButton = document.getElementById('ok-delete');
    var cancelButton = document.getElementById('cancel-delete');

    deleteIcon.addEventListener('click', function () {
        var anyCheckboxChecked = false;

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                anyCheckboxChecked = true;
            }
        });

        if (anyCheckboxChecked) {
            deletePopup.style.display = 'block'; 
        } else {
            selectItemPopup.style.display = 'block'; 
            setTimeout(function () {
                selectItemPopup.style.display = 'none';
            }, 2000); 
        }
    });

    okButton.addEventListener('click', function () {
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var listItem = checkbox.closest('.list-item');
                var userInfoContainer = listItem.nextElementSibling;
                listItem.remove(); 
                if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                    userInfoContainer.style.display = 'none'; 
                }
            }
        });

        deletePopup.style.display = 'none';
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false; 
        });
    });

    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none'; 
    });
}


document.addEventListener('DOMContentLoaded', function () {

    var topCheckbox = document.getElementById('topCheckbox1');
    topCheckbox.addEventListener('change', function () {
        var isChecked = this.checked;
        var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');
        listItemCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    });

    User_Info();
    setupSearch();
    adjustSidebar();
    handleUserDeletion();
});
