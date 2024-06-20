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
    
        // Event listener for delete icon click
        deleteIcon.addEventListener('click', function () {
            var anyCheckboxChecked = false;
    
            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    anyCheckboxChecked = true;
                    return; // Exit forEach loop early since at least one checkbox is checked
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
    
        // Event listener for OK button in delete confirmation popup
        okButton.addEventListener('click', function () {
            var selectedUserIds = [];
    
            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    selectedUserIds.push(checkbox.getAttribute('data-userid'));
    
                    // Find corresponding list item and user info container
                    var listItem = checkbox.closest('.list-item');
                    var userInfoContainer = listItem.nextElementSibling;
    
                    // Remove list item and hide user info container
                    listItem.remove();
                    if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                        userInfoContainer.style.display = 'none';
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
                    window.location.reload(); // Refresh the page after deletion
                } else {
                    console.error('Failed to delete users');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
            deletePopup.style.display = 'none'; // Hide delete popup after deletion
        });
    
        // Event listener for Cancel button in delete confirmation popup
        cancelButton.addEventListener('click', function () {
            deletePopup.style.display = 'none'; // Hide delete popup on cancel
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        adjustSidebar(); // Ensure sidebar adjusts on page load
        setupSearch(); // Initialize search functionality
        User_Info(); // Initialize user info accordion
        handleUserDeletion(); // Initialize user deletion handling
        // Any other initializations can be added here
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        var editIcon = document.getElementById('edit-icon');
        var editPopup = document.getElementById('edit-popup');
        var selectItemPopup = document.getElementById('select-item-popup');
        var noUsers = document.getElementById('select-item');
        var addEditLabel = document.getElementById('add-edit');
        var saveButton = document.getElementById('save');
        var cancelButton = document.getElementById('cancel');
    
        editIcon.addEventListener('click', function () {
            var anyCheckboxChecked = false;
            var checkedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');
            var checkboxes = document.querySelectorAll('.custom-checkbox');
            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    anyCheckboxChecked = true;
                }
            });
    
            if (anyCheckboxChecked && checkedCheckboxes.length === 1) {
                var userId = checkedCheckboxes[0].getAttribute('data-userid');
                fetchUserData(userId);
            } else if (checkedCheckboxes.length === 0) {
                window.alert("Choose at least one user.");
            } else if (checkedCheckboxes.length > 1) {
                window.alert("Choose one user at a time.");
            } else {
                selectItemPopup.style.display = 'block';
                setTimeout(function () {
                    selectItemPopup.style.display = 'none';
                }, 2000);
            }
        });
    
        function fetchUserData(userId) {
            fetch('/api/user/' + userId)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    return response.json();
                })
                .then(user => {
                    document.getElementById('userId').value = user.id;
                    document.getElementById('username').value = user.username;
                    document.getElementById('email').value = user.email;
                    document.getElementById('phone').value = user.phone;
                    document.getElementById('role').value = user.role;
                    document.getElementById('gender').value = user.gender;
                    document.getElementById('country').value = user.country;
    
                    editPopup.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    window.alert('Failed to fetch user data. Please try again.');
                });
        }
    
        cancelButton.addEventListener('click', function () {
            var checkboxes = document.querySelectorAll('.custom-checkbox:checked');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
    
            editPopup.style.display = 'none';
        });
    });
    