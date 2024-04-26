/* Database */
let users = [
    { username: "beebee_m123", name: "beeebees", lastAccess: "2024-04-25T10:30:00" },
    { username: "jane_smith", name: "Jane Smith", lastAccess: "2024-04-26T14:45:00" },
    { username: "alice_johnson789", name: "Alice Johnson", lastAccess: "2024-04-01T08:20:00" },
    { username: "sara_williams321", name: "Sara Williams", lastAccess: "2024-04-24T08:20:00" },
    { username: "peter_parker567", name: "Peter Parker", lastAccess: "2024-04-18T14:45:00" },
    { username: "mark_johnson234", name: "Mark Johnson", lastAccess: "2024-04-17T08:20:00" },
    { username: "emma_doe", name: "Emma Doe", lastAccess: "2024-04-17T08:20:00" },
    { username: "john_adams", name: "John Adams", lastAccess: "2024-04-18T14:45:00" },
    { username: "sophia_smith456", name: "Sophia Smith", lastAccess: "2024-04-17T08:20:00" },
    { username: "william_jackson", name: "William Jackson", lastAccess: "2024-04-17T08:20:00" },
    { username: "lucy_brown123", name: "Lucy Brown", lastAccess: "2024-04-19T09:15:00" },
    { username: "michael_lee", name: "Michael Lee", lastAccess: "2024-04-18T12:30:00" },
    { username: "olivia_clark", name: "Olivia Clark", lastAccess: "2024-04-17T10:20:00" },
    { username: "ryan_miller789", name: "Ryan Miller", lastAccess: "2024-04-16T08:00:00" },
    { username: "hannah_white", name: "Hannah White", lastAccess: "2024-04-15T14:45:00" },
    { username: "david_robinson", name: "David Robinson", lastAccess: "2024-04-16T08:20:00" },
    { username: "lily_harris", name: "Lily Harris", lastAccess: "2024-04-18T11:00:00" },
    { username: "ethan_thompson", name: "Ethan Thompson", lastAccess: "2024-04-18T10:30:00" },
    { username: "zoey_carter", name: "Zoey Carter", lastAccess: "2024-04-19T08:20:00" },
    { username: "nathan_adams", name: "Nathan Adams", lastAccess: "2024-04-17T07:45:00" },
    { username: "madison_morris", name: "Madison Morris", lastAccess: "2024-04-19T13:20:00" },
    { username: "chloe_jackson", name: "Chloe Jackson", lastAccess: "2024-04-18T15:00:00" },
    { username: "jacob_baker", name: "Jacob Baker", lastAccess: "2024-04-17T16:30:00" },
    { username: "ava_hall", name: "Ava Hall", lastAccess: "2024-04-17T08:45:00" },
    { username: "ethan_wilson", name: "Ethan Wilson", lastAccess: "2024-04-16T12:20:00" },
    { username: "oliver_thomas", name: "Oliver Thomas", lastAccess: "2024-04-18T08:20:00" },
    { username: "amelia_scott", name: "Amelia Scott", lastAccess: "2024-04-18T14:30:00" },
    { username: "william_hall", name: "William Hall", lastAccess: "2024-04-19T09:20:00" },
    { username: "mia_mitchell", name: "Mia Mitchell", lastAccess: "2024-04-17T11:15:00" },
    { username: "ethan_wilson", name: "Ethan Wilson", lastAccess: "2024-04-16T12:20:00" },
    { username: "sophie_brown", name: "Sophie Brown", lastAccess: "2024-04-19T09:30:00" },
    { username: "jackson_smith", name: "Jackson Smith", lastAccess: "2024-04-18T12:15:00" },
    { username: "oliver_davis", name: "Oliver Davis", lastAccess: "2024-04-17T11:20:00" },
    { username: "amelia_jones", name: "Amelia Jones", lastAccess: "2024-04-16T08:45:00" },
    { username: "noah_wilson", name: "Noah Wilson", lastAccess: "2024-04-15T14:30:00" },
    { username: "emily_taylor", name: "Emily Taylor", lastAccess: "2024-04-18T10:00:00" },
    { username: "ethan_anderson", name: "Ethan Anderson", lastAccess: "2024-04-17T16:20:00" },
    { username: "mia_thompson", name: "Mia Thompson", lastAccess: "2024-04-17T08:50:00" },
    { username: "lucas_white", name: "Lucas White", lastAccess: "2024-04-16T12:10:00" }
];

/* To display if zero users */

document.addEventListener('DOMContentLoaded', function () {
    if (users.length === 0) {
        var zeroUsersDiv = document.querySelector('.zero-users');
        zeroUsersDiv.style.display = 'block';
    }

});

// Database

document.addEventListener('DOMContentLoaded', function () {
    
    console.log("Dom content loaded");
    var usersPerPage = 5;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending

    var userCheckboxes = document.querySelectorAll('.checkbox-input');

    console.log(document.getElementById('delete-icon'));
        console.log("User Checkboxes:", userCheckboxes); // Debugging statement
    function deleteUser(username) {
        users = users.filter(function(user) {
            return user.username !== username;
        });
    }

    function removeUserElement(username) {
        var userElement = document.getElementById('userCheckbox_' + username).closest('.list-item');
        if (userElement) {
            userElement.remove();
        }
    }
    document.getElementById('delete-icon').addEventListener('click', function () {
        var userCheckboxes = document.querySelectorAll('.checkbox-input');
        userCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var username = checkbox.getAttribute('data-username') || checkbox.id.split('_')[1];
                deleteUser(username);
                removeUserElement(username);
            }
        });
        
        // Update pagination and sorting after deletion
        updatePagination();
        sortUsers();
    });
    function calculateTotalPages() {
        return Math.ceil(users.length / usersPerPage);
    }

    function getTimeDifference(lastAccess) {
        var currentTime = new Date();
        var accessTime = new Date(lastAccess);
        var timeDifference = Math.abs(currentTime - accessTime);
        var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference === 0 ? 'Today' : daysDifference === 1 ? 'Yesterday' : daysDifference + ' days ago';
    }


    function attachCheckboxEventListeners() {
        var userCheckboxes = document.querySelectorAll('.list-container .checkbox-input');
        userCheckboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                // Your checkbox change event logic here
            });
        });
    }

    function displayUsers(page) {
        var startIndex = (page - 1) * usersPerPage;
        var endIndex = startIndex + usersPerPage;
        var displayedUsers = users.slice(startIndex, endIndex);

        var listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";

        displayedUsers.forEach(function (user) {
            var listItem = document.createElement("div");
            listItem.classList.add("list-item");

            var userLink = document.createElement("a");
            userLink.href = "userProfile.html";

            var userIcon = document.createElement("i");
            userIcon.classList.add("fa-solid", "fa-user");

            var nameDiv = document.createElement("div");
            nameDiv.classList.add("text");
            nameDiv.textContent = user.name;

            var usernameDiv = document.createElement("div");
            usernameDiv.classList.add("text");
            usernameDiv.textContent = user.username;

            var lastAccessDiv = document.createElement("div");
            lastAccessDiv.classList.add("text");
            var accessDate = new Date(user.lastAccess);
            var currentDate = new Date();
            var timeDifference = Math.floor((currentDate - accessDate) / (1000 * 60 * 60 * 24));
            lastAccessDiv.textContent = getTimeDifference(user.lastAccess); // Display time difference
            if (timeDifference >= 15) {
                lastAccessDiv.classList.add("red-text"); // Apply red-text class
            }

            var checkboxInput = document.createElement("input");
            checkboxInput.classList.add("custom-checkbox");
            checkboxInput.type = "checkbox";
            checkboxInput.id = "userCheckbox_" + user.username; // Unique id for each checkbox
            checkboxInput.setAttribute("data-username", user.username); // Optional: Store username as data attribute

            // Append elements to the DOM
            userLink.appendChild(userIcon);
            userLink.appendChild(nameDiv);
            userLink.appendChild(usernameDiv);
            userLink.appendChild(lastAccessDiv);
            userLink.appendChild(checkboxInput);
            listItem.appendChild(userLink);
            listContainer.appendChild(listItem);
            
        });
        attachCheckboxEventListeners();

    }

    function updatePagination() {
        var totalPages = calculateTotalPages();
        var pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        // Calculate start and end page numbers to display
        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(startPage + 4, totalPages);

        // Previous page link
        if (currentPage > 1) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
        }

        // Numbered page links
        for (var i = startPage; i <= endPage; i++) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${i})">${i}</a></li>`;
        }

        // Next page link
        if (currentPage < totalPages) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
        }

        // Attach event listeners to pagination links
        pagination.querySelectorAll('.page-link').forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior
                var action = this.textContent.toLowerCase(); // Extract action from link text
                if (action === 'previous') {
                    goToPage(currentPage - 1);
                } else if (action === 'next') {
                    goToPage(currentPage + 1);
                } else {
                    goToPage(parseInt(action)); // Go to the selected page
                }
            });
        });
    }

    function goToPage(page) {
        if (page < 1) {
            page = 1;
        }
        var totalPages = calculateTotalPages();
        if (page > totalPages) {
            page = totalPages;
        }
        currentPage = page;
        displayUsers(currentPage);
        updatePagination();
    }
    function sortUsers() {
        sortOrder *= -1; // Toggle sort order
        users.sort(function (a, b) {
            var dateA = new Date(a.lastAccess);
            var dateB = new Date(b.lastAccess);
            return sortOrder * (dateA - dateB);
        });
        currentPage = 1; // Reset to first page after sorting
        updateSortIconTitle(); // Update sort icon title
        displayUsers(currentPage); // Redisplay sorted users
    }

    function updateSortIconTitle() {
        var sortIcon = document.querySelector('.fa-sort');
        if (sortOrder === 1) {
            sortIcon.title = 'Sort by newest last access';
        } else {
            sortIcon.title = 'Sort by oldest last access';

        }
    }


    
    // Initial setup
    displayUsers(currentPage);
    updatePagination();
    sortUsers();

    var sortIcon = document.querySelector('.fa-sort');
    sortIcon.addEventListener('click', sortUsers);

});


/* pop up of delete log */
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}
function exitPopup() {
    document.getElementById('popup').style.display = 'none';
}

//search user-list
document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('.search-bar input');
    const topCheckbox = document.getElementById('topCheckbox');

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

});

document.addEventListener('DOMContentLoaded', function () {
    var selectAllCheckbox = document.getElementById('topCheckbox');
    var userCheckboxes = document.querySelectorAll('.checkbox-input');
    selectAllCheckbox.addEventListener('click', function () {
        var isChecked = selectAllCheckbox.checked;
        selectAllCheckbox.title = isChecked ? 'Unselect All' : 'Select All';
    });
});









