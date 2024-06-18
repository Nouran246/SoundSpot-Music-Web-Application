// /*---------------- Database--------------------- */
// let users = [
//     { username: "beebee_m123", name: "beeebees", lastAccess: "2024-04-25T10:30:00" },
//     { username: "jane_smith", name: "Jane Smith", lastAccess: "2024-04-26T14:45:00" },
//     { username: "alice_johnson789", name: "Alice Johnson", lastAccess: "2024-04-01T08:20:00" },
//     { username: "sara_williams321", name: "Sara Williams", lastAccess: "2024-04-24T08:20:00" },
//     { username: "peter_parker567", name: "Peter Parker", lastAccess: "2024-04-18T14:45:00" },
//     { username: "mark_johnson234", name: "Mark Johnson", lastAccess: "2024-04-17T08:20:00" },
//     { username: "emma_doe", name: "Emma Doe", lastAccess: "2024-04-17T08:20:00" },
//     { username: "john_adams", name: "John Adams", lastAccess: "2024-04-18T14:45:00" },
//     { username: "sophia_smith456", name: "Sophia Smith", lastAccess: "2024-04-17T08:20:00" },
//     { username: "william_jackson", name: "William Jackson", lastAccess: "2024-04-17T08:20:00" },
//     { username: "lucy_brown123", name: "Lucy Brown", lastAccess: "2024-04-19T09:15:00" },

//     { username: "michael_lee", name: "Michael Lee", lastAccess: "2024-04-18T12:30:00" },
//     { username: "olivia_clark", name: "Olivia Clark", lastAccess: "2024-04-17T10:20:00" },
//     { username: "ryan_miller789", name: "Ryan Miller", lastAccess: "2024-04-16T08:00:00" },
//     { username: "hannah_white", name: "Hannah White", lastAccess: "2024-04-15T14:45:00" },
//     { username: "david_robinson", name: "David Robinson", lastAccess: "2024-04-16T08:20:00" },
//     { username: "lily_harris", name: "Lily Harris", lastAccess: "2024-04-18T11:00:00" },
//     { username: "ethan_thompson", name: "Ethan Thompson", lastAccess: "2024-04-18T10:30:00" },
//     { username: "zoey_carter", name: "Zoey Carter", lastAccess: "2024-04-19T08:20:00" },
//     { username: "nathan_adams", name: "Nathan Adams", lastAccess: "2024-04-17T07:45:00" },
//     { username: "madison_morris", name: "Madison Morris", lastAccess: "2024-04-19T13:20:00" },
//     { username: "chloe_jackson", name: "Chloe Jackson", lastAccess: "2024-04-18T15:00:00" }
// ];

// /*----------------Avatars for users--------------- */
// // Array of photo URLs
// const photoURLs = [
//     "photo/avatar_2633291.png",
//     "photo/joker_2730970.png",
//     "photo/mummy_3529406.png",
//     "photo/avatar_14369435.png",
//     "photo/avatar_2633288.png",
//     "photo/alien_10651194.png",
//     "photo/avatar_2633280.png"
// ];

function getRandomPhotoURL() {
    return photoURLs[Math.floor(Math.random() * photoURLs.length)];
}

users.forEach(function (user) {
    user.photo = getRandomPhotoURL();
});

/*-------------display user info (accordion)----------*/

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
                        if (otherUserInfoContainer) {
                            otherUserInfoContainer.style.display = 'none';
                        }
                    }
                });
            }
        });
    });
}

/*------Search function-------*/

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

/*--------Adjust checkboxes when window minimized----------*/
function adjustCheckboxStyles() {
    console.log("Function called");

    var checkboxInputs = document.querySelectorAll(".custom-checkbox");
    var sidebar = document.querySelector(".sidebar");
    console.log(window.innerWidth);

    checkboxInputs.forEach(function (input) {
        if (window.innerWidth <= 1200) {
            console.log("Window width is less than or equal to 1200");

            input.style.width = "80px";
            input.style.height = "24px";
            sidebar.classList.add("minimized");

        } else {
            console.log("Window width is not it");

            input.style.width = "170px";
            input.style.height = "25px";
            input.style.marginRight = "21px";
            sidebar.classList.remove("minimized");

        }
    });
}

/*adjust side bar*/
function adjustSidebar() {
    var sidebar = document.querySelector(".sidebar");

    if (window.innerWidth <= 990) {
        minimizeSidebar();
    } else {
        restoreSidebar();
    }
}



document.addEventListener('DOMContentLoaded', function () {


    /*--------CONSOLE-------*/
    console.log("Dom content loaded");
    console.log(window.innerWidth);
    console.log("User Checkboxes:", userCheckboxes);
    function logWindowWidth() {
        console.log("Window width:", window.innerWidth);
    }


    /*--------WINDOW-------*/
    window.addEventListener("resize", logWindowWidth);
    window.addEventListener("DOMContentLoaded", adjustCheckboxStyles);
    window.addEventListener("resize", adjustCheckboxStyles);
    window.addEventListener("DOMContentLoaded", adjustSidebar);
    window.addEventListener("resize", adjustSidebar);

    /*---------VAR--------*/
    var usersPerPage = 5;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending
    var userCheckboxes = document.querySelectorAll('.checkbox-input');
    var userCheckboxesTop = document.querySelectorAll('.checkbox-input-top');

    /*-------FUNCTIONS-------*/

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

            var userIcon = document.createElement("img");
            userIcon.src = user.photo;

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
            listItem.addEventListener('click', function () {
                var infoContainer = listItem.nextElementSibling;
                infoContainer.style.display = infoContainer.style.display === "none" ? "block" : "none";

                function toggleIcon(icon, content) {
                    var icons = [personalInfoIcon, activityLogIcon, securityIcon];
                    var contents = [personalInfoContent, activityLogContent, securityContent];

                    icons.forEach(function (currentIcon, index) {
                        var currentContent = contents[index];
                        if (document.body.classList.contains('light-mode')) {
                            if (currentIcon === icon) {
                                currentIcon.style.color = "#800080";
                                currentContent.style.display = "block";
                            }
                            else {
                                currentIcon.style.color = "#333";
                                currentContent.style.display = "none";
                            }
                        }
                        else {
                            if (currentIcon === icon) {
                                currentIcon.style.color = "#800080";
                                currentContent.style.display = "block";

                            } else {
                                currentIcon.style.color = "#333";
                                currentContent.style.display = "none";
                            }
                        }
                    });
                }
                personalInfoIcon.addEventListener('click', function () {
                    toggleIcon(personalInfoIcon, personalInfoContent);
                });

                activityLogIcon.addEventListener('click', function () {
                    toggleIcon(activityLogIcon, activityLogContent);
                });

                securityIcon.addEventListener('click', function () {
                    toggleIcon(securityIcon, securityContent);
                });
                chevronIcon.addEventListener('click', function (event) {
                    event.stopPropagation();
                    toggleItem(item);
                });


            });


        });
    }
    function updatePagination() {
        console.log("Updating pagination...");

        var totalPages = calculateTotalPages();
        var pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(startPage + 4, totalPages);

        if (currentPage > 1) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
        }

        for (var i = startPage; i <= endPage; i++) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="goToPage(${i}) ">${i}</a></li>`;
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
        console.log("Current page:", currentPage);
        console.log("Total pages:", totalPages);
    }
    function goToPage(page) {
        console.log("Going to page:", page);

        if (page < 1) {
            page = 1;
        }
        var totalPages = calculateTotalPages();
        if (page > totalPages) {
            page = totalPages;
        }
        currentPage = page;
        console.log("Current page:", currentPage);
        displayUsers(currentPage);
        updatePagination();
        User_Info();

    }
    /*--------Delete------ */
    var topCheckbox = document.getElementById('topCheckbox1');
    var deleteusersIcon = document.getElementById('delete-icon1');
    var deletePopup = document.getElementById('delete-popup');
    var selectItemPopup = document.getElementById('select-item-popup');
    var noUsers = document.getElementById('select-item');

    deleteusersIcon.addEventListener('click', function () {
        var anyCheckboxChecked = false;
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                anyCheckboxChecked = true;
            }
        });
        if (anyCheckboxChecked) {
            deletePopup.style.display = 'block';
        } else if (users.length == 0) {
            noUsers.style.display = 'block';
            setTimeout(function () {
                noUsers.style.display = 'none';
            }, 2000);
            topCheckbox.checked = false;

        }
        else {
            selectItemPopup.style.display = 'block';
            setTimeout(function () {
                selectItemPopup.style.display = 'none';
            }, 2000);
        }
    });

    var okButton = document.getElementById('ok-delete');
    okButton.addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        var selectedUsers = [];
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var username = checkbox.getAttribute('data-username');
                var user = users.find(u => u.username === username);
                if (user) {
                    selectedUsers.push(user);
                }
            }
        });
        console.log('Selected users:', selectedUsers);
    
        selectedUsers.forEach(function(selectedUser) {
            var index = users.findIndex(function(user) {
                return user.username === selectedUser.username;
            });
            if (index !== -1) {
                users.splice(index, 1);
            }
        });
    
        console.log('New users after deletion:', users);
    
        displayUsers(currentPage);
        updatePagination();
        User_Info();
        deletePopup.style.display = 'none';
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        topCheckbox.checked = false;
    });
    

    var cancelButton = document.getElementById('cancel-delete');
    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });

    topCheckbox.addEventListener('change', function () {
        var isChecked = this.checked;
        var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');
        listItemCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    });

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

        var container = document.querySelector(".list-container");
        var top = document.querySelector(".top-content");

        if (sidebar.classList.contains("minimized")) {
            container.style.marginLeft = "250px";
            top.style.marginLeft = "250px";

        } else {
            container.style.marginLeft = "350px";
            top.style.marginLeft = "350px";

        }
    });


    var add_icon = document.getElementById('plus');
    add_icon.addEventListener('click', function () {
        window.location.href = 'song';
    });


    setupSearch();
    displayUsers(currentPage);
    updatePagination();
    sortUsers();
    adjustSidebar();

    var sortIcon = document.querySelector('.fa-sort');
    sortIcon.addEventListener('click', sortUsers);

});

