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
                var securityIcon = userInfoContainer.querySelector('.fa-user-shield');
                var generalContent = userInfoContainer.querySelector('.general-content');
                var activityLogContent = userInfoContainer.querySelector('.activity-log-content');
                var securityContent = userInfoContainer.querySelector('.security-content');

                personalInfoIcon.style.color = "#800080";
                activityLogIcon.style.color = "#ddd";
                securityIcon.style.color = "#ddd";

                generalContent.style.display = "block";
                activityLogContent.style.display = "none";
                securityContent.style.display = "none";
            }
        });
    });

    // Event listeners for each icon
    userInfoContainers.forEach(function (userInfoContainer) {
        var personalInfoIcon = userInfoContainer.querySelector('.fa-info');
        var activityLogIcon = userInfoContainer.querySelector('.fa-clock-rotate-left');
        var securityIcon = userInfoContainer.querySelector('.fa-user-shield');

        personalInfoIcon.addEventListener('click', function () {
            toggleIcon(personalInfoIcon, userInfoContainer, 'general-content');
        });

        activityLogIcon.addEventListener('click', function () {
            toggleIcon(activityLogIcon, userInfoContainer, 'activity-log-content');
        });

        securityIcon.addEventListener('click', function () {
            toggleIcon(securityIcon, userInfoContainer, 'security-content');
        });
    });
}

// Function to toggle icon and content visibility
function toggleIcon(icon, userInfoContainer, contentClass) {
    var icons = [userInfoContainer.querySelector('.fa-info'),
    userInfoContainer.querySelector('.fa-clock-rotate-left'),
    userInfoContainer.querySelector('.fa-user-shield')];

    var contents = [userInfoContainer.querySelector('.general-content'),
    userInfoContainer.querySelector('.activity-log-content'),
    userInfoContainer.querySelector('.security-content')];

    icons.forEach(function (currentIcon) {
        if (currentIcon === icon) {
            currentIcon.style.color = "#800080"; // Active icon color
        } else {
            currentIcon.style.color = "#ddd"; // Inactive icon color
        }
    });

    contents.forEach(function (currentContent) {
        if (currentContent.classList.contains(contentClass)) {
            currentContent.style.display = "block"; // Show current content
        } else {
            currentContent.style.display = "none"; // Hide other contents
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
            deletePopup.style.display = 'block'; // Display delete confirmation popup
        } else {
            selectItemPopup.style.display = 'block'; // Display select-item-popup if no checkboxes are checked
            setTimeout(function () {
                selectItemPopup.style.display = 'none';
            }, 2000); // Hide select-item-popup after 2 seconds
        }
    });

    okButton.addEventListener('click', function () {
        var selectedUserIds = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedUserIds.push(checkbox.getAttribute('data-userid')); // Adjust as per your data attribute
                var listItem = checkbox.closest('.list-item');
                var userInfoContainer = listItem.nextElementSibling;
                listItem.remove(); // Remove the list item (user) from the DOM
                if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                    userInfoContainer.style.display = 'none'; // Hide corresponding user info container
                }
            }
        });

        // Make an AJAX request to delete selected users from the database
        fetch('/auth/delete-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userIds: selectedUserIds })
        })
        .then(response => {
            if (response.ok) {
                console.log('Users deleted successfully');
            } else {
                console.error('Failed to delete users');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        deletePopup.style.display = 'none'; // Hide delete popup after deletion
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false; // Uncheck all checkboxes
        });
    });

    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none'; // Hide delete popup on cancel
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