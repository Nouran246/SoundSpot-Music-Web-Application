/*---------------- Database--------------------- */
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

/*----------------Avatars for users--------------- */

// Array of photo URLs
const photoURLs = [
    "photo/avatar_2633291.png",
    "photo/joker_2730970.png",
    "photo/mummy_3529406.png",
    "photo/avatar_14369435.png",
    "photo/avatar_2633288.png",
    "photo/alien_10651194.png",
    "photo/avatar_2633280.png"
];

// Function to randomly select a photo URL
function getRandomPhotoURL() {
    return photoURLs[Math.floor(Math.random() * photoURLs.length)];
}

// Modify the users array to include a random photo URL for each user
users.forEach(function (user) {
    user.photo = getRandomPhotoURL();
});

/* -------------Delete User completly------------- */

//delete el list item
function removeUserElement(username) {
    var userElement = document.getElementById('userCheckbox_' + username).closest('.list-item');
    if (userElement) {
        userElement.remove();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    console.log("Dom content loaded");

    console.log(document.getElementById('delete-icon'));
    console.log("User Checkboxes:", userCheckboxes);


    /* Pagination Var */
    var usersPerPage = 10;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending

    /* checkboxes Var */
    var userCheckboxes = document.querySelectorAll('.checkbox-input');
    var userCheckboxesTop = document.querySelectorAll('.checkbox-input-top');


    /*--------------------Event listener for delete icon-------------------- */
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


    function displayUsers(page) {
        var startIndex = (page - 1) * usersPerPage;
        var endIndex = startIndex + usersPerPage;
        var displayedUsers = users.slice(startIndex, endIndex);

        var listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";


        displayedUsers.forEach(function (user) {

            var listItem = document.createElement("div");
            listItem.classList.add("list-item");

            var content_div = document.createElement("div");
            listItem.classList.add("content");

            var userIcon = document.createElement("img"); // Change to <img> for displaying photos
            userIcon.src = user.photo; // Assign the photo URL

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
            lastAccessDiv.textContent = getTimeDifference(user.lastAccess);
            if (timeDifference >= 15) {
                lastAccessDiv.classList.add("red-text"); // red text law 15 or more days
            }

            var checkboxInput = document.createElement("input");
            checkboxInput.classList.add("custom-checkbox");
            checkboxInput.type = "checkbox";
            checkboxInput.id = "userCheckbox_" + user.username; // id for each checkbox
            checkboxInput.setAttribute("data-username", user.username);
            checkboxInput.style.width = "170px";
            checkboxInput.style.height = "25px";

            let caretIcon = document.createElement("i");
            caretIcon.classList.add("fa-solid", "fa-chevron-right");


            content_div.appendChild(userIcon);
            content_div.appendChild(nameDiv);
            content_div.appendChild(usernameDiv);
            content_div.appendChild(lastAccessDiv);
            content_div.appendChild(checkboxInput);
            content_div.appendChild(caretIcon);
            listItem.appendChild(content_div);

            listContainer.appendChild(listItem);

            var userInfoContainer = document.createElement('div');
            userInfoContainer.classList.add('user-info-container');

            var userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

            var iconsDiv = document.createElement('div');
            iconsDiv.classList.add("user-icons");

            var personalInfoIcon = document.createElement("i");
            personalInfoIcon.classList.add("fa-solid", "fa-info");
            personalInfoIcon.classList.add("info-icon");
            personalInfoIcon.id = 'personal';
            personalInfoIcon.title = "Personal Info";
            personalInfoIcon.style.color = "#800080";
            iconsDiv.appendChild(personalInfoIcon);

            var activityLogIcon = document.createElement("i");
            activityLogIcon.classList.add("fa-solid", "fa-clock-rotate-left");
            activityLogIcon.classList.add("info-icon");
            activityLogIcon.title = "Activity Log";
            iconsDiv.appendChild(activityLogIcon);


            var securityIcon = document.createElement("i");
            securityIcon.classList.add("fa-solid", "fa-user-shield");
            securityIcon.classList.add("info-icon");
            securityIcon.title = "Security";
            iconsDiv.appendChild(securityIcon);

            userInfo.appendChild(iconsDiv);
            userInfoContainer.appendChild(userInfo);
            listContainer.appendChild(userInfoContainer);

            var actualContent = document.createElement("div");
            actualContent.classList.add("actual-content");
            userInfo.appendChild(actualContent);

            var personalInfoContent = document.createElement('div');
            personalInfoContent.classList.add('personal-info-content');
            personalInfoContent.id = 'personalInfoContent';
            actualContent.appendChild(personalInfoContent);



            var userContent = document.createElement("div");
            userContent.classList.add('user-content');

            var generalContent = document.createElement("div");
            generalContent.classList.add("general-content");
            personalInfoContent.appendChild(userContent);

            generalContent.innerHTML = `
<div class="first-sec">
    <div>
        <label>Date of Birth</label>
        <span>1985-07-15</span>
    </div>
    <div>
        <label>Country</label>
        <span>Egypt</span>
    </div>
    <div>
        <label>Email</label><span> example@example.com</span>
    </div>
    <div>
        <label>Phone Number</label><span> +1234567890</span>
    </div>
    <div>
        <label>Role</label><span> User</span>

    </div>
</div>
            <div class="second-sec">
    <div>
        <label>Plan Type</label>
        <span> Premium</span>
    </div>
    <div>
        <label>Start Date</label>
        <span> January 1, 2024</span>
    </div>
    <div>
        <label>Renewal Date</label>
        <span> January 1, 2025</span>
    </div>
    <div>
        <label>Billing Information</label>
        <span>Visa **** **** **** 1234</span>
    </div>
    <div>
        <label>Payment Method</label>
        <span> Credit Card</span>
    </div>
</div>

            
            
            
            
            
            `;
            userContent.appendChild(generalContent);

            var activityLogContent = document.createElement('div');
            activityLogContent.classList.add('activity-log-content');
            activityLogContent.id = 'activityLogContent';
            activityLogContent.innerHTML = ` 
            <div class="first-sec">
                <div>
                    <label>Total Listening Time</label>
                    <span>3,240 minutes</span>
                </div>
                <div>
                    <label>Playlists Created</label>
                    <span>5 playlists</span>
                </div>
                <div>
                    <label>Songs Uploaded</label>
                    <span>20 songs</span>
                </div>
                <div>
                    <label>Followers</label>
                    <span>500 followers</span>
                </div>
                <div>
                    <label>Following</label>
                    <span>250 users</span>
                </div>
            </div>
            <div class="second-sec">
                <div>
                    <label>Liked Songs</label>
                    <span>100 songs</span>
                </div>
                <div>
                    <label>Recently Played Song</label>
                    <span>"Song Title" by Artist</span>
                </div>
                <div>
                    <label>Most Played Playlist</label>
                    <span>"Playlist Title"</span>
                </div>
                <div>
                    <label>Top Genre</label>
                    <span>Rock</span>
                </div>
                <div>
                    <label>Last Song Favorited</label>
                    <span>"Song Title" by Artist</span>
                </div>
            </div>
        `;
            activityLogContent.style.display = 'none';

            actualContent.appendChild(activityLogContent);

            var securityContent = document.createElement('div');
            securityContent.classList.add('security-content');
            securityContent.id = 'securityContent';
            securityContent.innerHTML = `
            <div class="first-sec">
            <div>
                <label>Password Strength</label><span> Strong</span>
            </div>
            <div>
                <label>Password Last Updated</label><span> April 25, 2024</span>
            </div>
            <div>
                <label>Account Status</label><span> Active</span>
            </div>
            <div>
                <label>Two-Factor Authentication</label><span> Enabled</span>
            </div>
            <div>
            <label>Last Login</label><span> April 30, 2024</span>
        </div>
      
            </div>
            <div class="second-sec">
        
            <div>
                <label>IP Address of Last Login</label><span> 192.168.1.10</span>
            </div>
            <div>
                <label>Device of Last Login</label><span> Chrome on Windows 10</span>
            </div>
            <div>
                <label>Recent Password Changes</label><span> None</span>
            </div>
            <div>
                <label>Failed Login Attempts</label><span> 0</span>
            </div>
            <div>
                <label>Accessed from New Device</label><span> No</span>
            </div>
            </div>
        `;
            securityContent.style.display = 'none';

            actualContent.appendChild(securityContent);

            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn");
            editButton.id = "edit-button";
            editButton.addEventListener("click", () => handleEditButtonClick());
            editButton.addEventListener("click", function () {
                if (this.textContent === "Edit") {
                    this.textContent = "Save";
                } else {
                    this.textContent = "Edit";
                }
            });
            actualContent.appendChild(editButton);

            listItem.addEventListener('click', function () {
                var infoContainer = this.nextElementSibling; // Get the next element (user info container)
                infoContainer.style.display = infoContainer.style.display === "none" ? "block" : "none"; // Toggle visibility

                function toggleIcon(icon, content) {
                    var icons = [personalInfoIcon, activityLogIcon, securityIcon];
                    var contents = [personalInfoContent, activityLogContent, securityContent];

                    icons.forEach(function (currentIcon, index) {
                        var currentContent = contents[index];
                        if (currentIcon === icon) {
                            currentIcon.style.color = "#800080"; // Set color for clicked icon
                            currentContent.style.display = "block"; // Show corresponding content

                        } else {
                            currentIcon.style.color = "#ffffff"; // Reset color for other icons
                            currentContent.style.display = "none"; // Hide other content divs
                        }
                    });
                }
                // Event listener for personal info icon
                personalInfoIcon.addEventListener('click', function () {
                    toggleIcon(personalInfoIcon, personalInfoContent);
                });

                activityLogIcon.addEventListener('click', function () {
                    toggleIcon(activityLogIcon, activityLogContent);
                });

                securityIcon.addEventListener('click', function () {
                    toggleIcon(securityIcon, securityContent);
                });

            });

        });
    }





    function updatePagination() {
        var totalPages = calculateTotalPages();
        var pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(startPage + 4, totalPages);

        if (currentPage > 1) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
        }

        for (var i = startPage; i <= endPage; i++) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${i})">${i}</a></li>`;
        }

        if (currentPage < totalPages) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
        }

        pagination.querySelectorAll('.page-link').forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var action = this.textContent.toLowerCase();
                if (action === 'previous') {
                    goToPage(currentPage - 1);
                } else if (action === 'next') {
                    goToPage(currentPage + 1);
                } else {
                    goToPage(parseInt(action));
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
        User_Info();

    }

    function User_Info() {
        var userInfoContainers = document.querySelectorAll('.user-info-container');
        userInfoContainers.forEach(function (container) {
            container.style.display = 'none';
        });

        // Select all list items
        var listItems = document.querySelectorAll('.list-item');

        // Loop through each list item
        listItems.forEach(function (item) {
            // Add click event listener
            item.addEventListener('click', function () {
                // Check if the clicked item is already active
                var isActive = this.classList.contains('active');

                // Toggle active class
                this.classList.toggle('active', !isActive);

                // Toggle chevron icon
                var caretIcon = this.querySelector('.fa-chevron-right');
                if (caretIcon) {
                    caretIcon.classList.remove('fa-chevron-right');
                    caretIcon.classList.add('fa-chevron-down');
                } else {
                    caretIcon = this.querySelector('.fa-chevron-down');
                    caretIcon.classList.remove('fa-chevron-down');
                    caretIcon.classList.add('fa-chevron-right');
                }
                // Close other open items if the clicked item was not initially active
                if (!isActive) {
                    listItems.forEach(function (otherItem) {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');

                            // Reset chevron icon
                            var otherCaretIcon = otherItem.querySelector('.fa-chevron-down');
                            if (otherCaretIcon) {
                                otherCaretIcon.classList.remove('fa-chevron-down');
                                otherCaretIcon.classList.add('fa-chevron-right');
                            }

                            var otherUserInfoContainer = otherItem.nextElementSibling;
                            if (otherUserInfoContainer) {
                                otherUserInfoContainer.style.display = 'none';
                            }
                        }

                    });
                    item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });

        });
    }


    function sortUsers() {
        sortOrder *= -1; // Toggle sort order
        users.sort(function (a, b) {
            var dateA = new Date(a.lastAccess);
            var dateB = new Date(b.lastAccess);
            return sortOrder * (dateA - dateB);
        });
        currentPage = 1;
        updateSortIconTitle();
        displayUsers(currentPage);
        User_Info();
    }

    function updateSortIconTitle() {
        var sortIcon = document.querySelector('.fa-sort');
        if (sortOrder === 1) {
            sortIcon.title = 'Sort by newest last access';
        } else {
            sortIcon.title = 'Sort by oldest last access';

        }
    }

    document.getElementById("custom-sidebar-toggle").addEventListener("click", function () {
        var sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("minimized");

        // Adjust margin of content container based on sidebar state
        var container = document.querySelector(".list-container");
        var top = document.querySelector(".top-content");

        if (sidebar.classList.contains("minimized")) {
            container.style.marginLeft = "250px"; // Adjust as needed based on your sidebar width
            top.style.marginLeft = "250px"; // Adjust as needed based on your sidebar width

        } else {
            container.style.marginLeft = "350px"; // Adjust as needed based on your sidebar width
            top.style.marginLeft = "350px"; // Adjust as needed based on your sidebar width

        }
    });
    displayUsers(currentPage);
    updatePagination();
    sortUsers();

    var sortIcon = document.querySelector('.fa-sort');
    sortIcon.addEventListener('click', sortUsers);

});


//search user-list
document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('.search-bar input');

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



