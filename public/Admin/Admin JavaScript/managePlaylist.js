playlists = [
    { "name": "Summer Hits 2023", "artist": "Various Artists", "duration": "1h 10m", "creator": "Admin" },
    { "name": "Indie Favorites", "artist": "Drake", "duration": "52m", "creator": "User" },
    { "name": "Chill Beats", "artist": "Various Artists", "duration": "1h 45m", "creator": "Admin" },
    { "name": "Throwback Jams", "artist": "Various Artists", "duration": "1h 35m", "creator": "Admin" },
    { "name": "Acoustic Sessions", "artist": "John Mayer", "duration": "42m", "creator": "User" },
]


document.addEventListener('DOMContentLoaded', function () {
    console.log("Dom content loaded");
    console.log(window.innerWidth);
    console.log("playlisthtml Checkboxes:", userCheckboxes);

    /* Pagination Var */
    var PerPage = 10;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending

    /* checkboxes Var */
    var userCheckboxes = document.querySelectorAll('.checkbox-input');
    var userCheckboxesTop = document.querySelectorAll('.checkbox-input-top');

    function calculateTotalPages() {
        return Math.ceil(playlists.length / PerPage);
    }
    function displayUsers(page) {
       

        var startIndex = (page - 1) * PerPage;
        var endIndex = startIndex + PerPage;
        var displayedUsers = playlists.slice(startIndex, endIndex);

        var listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";


        displayedUsers.forEach(function (playlist) {

            var listItem = document.createElement("div");
            listItem.classList.add("list-item");

            var content_div = document.createElement("div");
            listItem.classList.add("content");

            var musicIcon = document.createElement("i");
            musicIcon.classList.add("fa-solid", "fa-icons");
            musicIcon.style.color = "#800080";
            musicIcon.style.marginRight = "40px";


            var nameDiv = document.createElement("div");
            nameDiv.classList.add("text");
            nameDiv.textContent = playlist.name;

            var artistDiv = document.createElement("div");
            artistDiv.classList.add("text");
            artistDiv.textContent = playlist.artist;

            var song_duration = document.createElement("div");
            song_duration.classList.add("text");
            song_duration.textContent = playlist.duration;

            var playlist_creator = document.createElement("div");
            playlist_creator.classList.add("text");
            playlist_creator.textContent = playlist.creator;

            var checkboxInput = document.createElement("input");
            checkboxInput.classList.add("custom-checkbox");
            checkboxInput.type = "checkbox";
            checkboxInput.id = "userCheckbox_" + playlist.name;
            checkboxInput.setAttribute("data-name", playlist.name);
            checkboxInput.style.width = "10px";
            checkboxInput.style.height = "20px";
            checkboxInput.style.marginRight = "30px";

            let caretIcon = document.createElement("i");
            caretIcon.style.marginLeft = "31px";
            caretIcon.classList.add("fa-solid", "fa-chevron-right");

            content_div.appendChild(musicIcon);
            content_div.appendChild(nameDiv);
            content_div.appendChild(artistDiv);
            content_div.appendChild(song_duration);
            content_div.appendChild(playlist_creator);
            content_div.appendChild(checkboxInput);
            content_div.appendChild(caretIcon);
            listItem.appendChild(content_div);
            listContainer.appendChild(listItem);

            var userInfoContainer = document.createElement('div');
            userInfoContainer.classList.add('user-info-container');

            var userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

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
            <div class="generalContent-header">
    <div>Artist</div>
    <div>Album</div>
    <div>Duration</div>
    <div>Genre</div>

</div>

            <div class="song">
            <i class="fa-solid fa-music"></i>                        <div>Ed Sheeran</div>
            <div>÷ (Divide)</div>
            <div>3:57</div>
            <div>Pop</div>
        </div>
        
        <div class="song">
        <i class="fa-solid fa-music"></i>        <div>The Weeknd</div>
            <div>After Hours</div>
            <div>3:44</div>
            <div>R&B</div>
        </div>
        
        <div class="song">
        <i class="fa-solid fa-music"></i>        <div>Journey</div>
            <div>Escape</div>
            <div>4:11</div>
            <div>Rock</div>
        </div>
        
        <div class="song">
        <i class="fa-solid fa-music"></i>        <div>Queen</div>
            <div>Greatest Hits</div>
            <div>5:55</div>
            <div>Rock</div>
        </div>
        
        <div class="song">
        <i class="fa-solid fa-music"></i>        <div>Nirvana</div>
            <div>Nevermind</div>
            <div>5:01</div>
            <div>Rock</div>
        </div>
            `;
            userContent.appendChild(generalContent);

            listItem.addEventListener('click', function () {
                var infoContainer = listItem.nextElementSibling;
                infoContainer.style.display = infoContainer.style.display === "none" ? "block" : "none";
            });
        });
    }
    function adjustCheckboxStyles() {
        console.log("Function called");
        var checkboxInputs = document.querySelectorAll(".custom-checkbox");
        var sidebar = document.querySelector(".sidebar");
        console.log(window.innerWidth);
        checkboxInputs.forEach(function (input) {
            if (window.innerWidth <= 1200) {
                console.log("Window width is less than or equal to 1200");
                input.style.width = "115px";
                input.style.height = "22px";
                input.style.marginRight = "31px";
            } else {
                console.log("Window width is not it");

                input.style.width = "170px";
                input.style.height = "25px";
                input.style.marginRight = "52px";
                input.style.marginBottom = "5px";


            }
        });
    }
    function logWindowWidth() {
        console.log("Window width:", window.innerWidth);
    }
    window.addEventListener("resize", logWindowWidth);
    window.addEventListener("DOMContentLoaded", adjustCheckboxStyles);
    window.addEventListener("resize", adjustCheckboxStyles);
    const searchInput = document.querySelector('.search-bar input');
    function applySearchListener() {
        const searchText = searchInput.value.toLowerCase().trim();
        const listItems = document.querySelectorAll('.list-item');

        listItems.forEach(function (item) {
            const itemText = item.textContent.toLowerCase();

            if (searchText === '' || itemText.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        const userContainers = document.querySelectorAll('.user-container');

        userContainers.forEach(function (container) {
            const listItems = container.querySelectorAll('.list-item');

            listItems.forEach(function (item) {
                const itemText = item.textContent.toLowerCase();

                if (searchText === '' || itemText.includes(searchText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        );
    }
    /* edit */
    var selectOneItemPopup = document.getElementById('one-edit');
    var editIcon = document.getElementById('edit-icon');
    var editPopup = document.getElementById('edit-popup');
    var selectItemPopup = document.getElementById('select-item-popup');
    var noUsers = document.getElementById('select-item');

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
            editPopup.style.display = 'block';
        } else if (checkedCheckboxes.length === 0 && playlists.length == 0) {
            noUsers.style.display = 'block';
            setTimeout(function () {
                noUsers.style.display = 'none';
            }, 2000);
            topCheckbox.checked = false;
        } else if (checkedCheckboxes.length > 1) {
            selectOneItemPopup.style.display = 'block';
            setTimeout(function () {
                selectOneItemPopup.style.display = 'none';
            }, 2000);
        } else {
            selectItemPopup.style.display = 'block';
            setTimeout(function () {
                selectItemPopup.style.display = 'none';
            }, 2000);
        }
    });
    var addEditLabel = document.getElementById('add-edit');
    var deleteEditLabel = document.getElementById('delete-edit');
    var addPlaylistDiv = document.querySelector('.add-playlist-div');
    var deletePlaylistDiv = document.querySelector('.delete-playlist-div');
/*     addEditLabel.classList.add('active');
 */    if (document.body.classList.contains('light-mode')) {
        addEditLabel.classList.add('active-light-mode');
    } else {
        addEditLabel.classList.add('active');
    }

    addEditLabel.addEventListener('click', function () {
        addPlaylistDiv.style.display = 'block';
        deletePlaylistDiv.style.display = 'none';
        if (document.body.classList.contains('light-mode')) {
            addEditLabel.classList.add('active-light-mode');
            deleteEditLabel.classList.remove('active-light-mode');
        } else {
            addEditLabel.classList.add('active');
            deleteEditLabel.classList.remove('active');
        }
    });

    deleteEditLabel.addEventListener('click', function () {
        deletePlaylistDiv.style.display = 'block';
        addPlaylistDiv.style.display = 'none';
        if (document.body.classList.contains('light-mode')) {
            addEditLabel.classList.remove('active-light-mode');
            deleteEditLabel.classList.add('active-light-mode');
        } else {
            addEditLabel.classList.remove('active');
            deleteEditLabel.classList.add('active');
        }

    });
    var saveButton = document.getElementById('save');
    var cancelButton = document.getElementById('cancel');

    cancelButton.addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('.custom-checkbox:checked');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        editPopup.style.display = 'none';
    });
    var addIcons = document.querySelectorAll('.add');
    var deleteIcons = document.querySelectorAll('.delete');
    var addPlaylistDiv = document.querySelector('.add-playlist-div');
    var deletePlaylistDiv = document.querySelector('.delete-playlist-div');
    var saveButton = document.getElementById('save');
    var checkedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');

    addIcons.forEach(function (addIcon) {
        addIcon.addEventListener('click', function () {
            var songDiv = addIcon.parentElement;
            var currentList = songDiv.parentElement;
            currentList.removeChild(songDiv);
            var targetList = currentList === addPlaylistDiv ? deletePlaylistDiv : addPlaylistDiv;
            targetList.appendChild(songDiv);
        });
    });

    deleteIcons.forEach(function (delIcon) {
        delIcon.addEventListener('click', function () {
            var songDiv = delIcon.parentElement;
            var currentList = songDiv.parentElement;
            currentList.removeChild(songDiv);
            var targetList = currentList === deletePlaylistDiv ? addPlaylistDiv : deletePlaylistDiv;
            targetList.appendChild(songDiv);
            var songName = songDiv.querySelector('div').textContent;
            var generalContentSongs = generalContent.querySelectorAll('.song');
            generalContentSongs.forEach(function (generalSong) {
                if (generalSong.querySelector('div').textContent === songName) {
                    generalSong.parentElement.removeChild(generalSong);
                }
            });
        });
    });

    saveButton.addEventListener('click', function (event) {
        console.log('Save button clicked');

        var checkedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');
        console.log("Number of checkboxes checked:", checkedCheckboxes.length);

        checkedCheckboxes.forEach(function (checkbox) {
            console.log("Checkbox checked:", checkbox);
            var listItem = checkbox.closest('.list-item');
            console.log("List item:", listItem);
            var generalContent = listItem.parentNode.querySelector('.general-content');
            console.log("General content:", generalContent);

            var deleteSongs = deletePlaylistDiv.querySelectorAll('.song');
            console.log("Number of delete songs:", deleteSongs.length);

            // Clear existing content in generalContent, except the header
            generalContent.innerHTML = generalContent.querySelector('.generalContent-header').outerHTML;

            deleteSongs.forEach(function (song) {
                // Clone the song content
                var clonedSong = song.cloneNode(true);

                // Remove the trash icon
                var trashIcon = clonedSong.querySelector('.fa-trash');
                if (trashIcon) {
                    trashIcon.parentElement.removeChild(trashIcon);
                }

                // Remove the plus icon
                var plusIcon = clonedSong.querySelector('.fa-plus');
                if (plusIcon) {
                    plusIcon.parentElement.removeChild(plusIcon);
                }

                // Append the cloned song to generalContent
                generalContent.appendChild(clonedSong);
            });

            checkbox.checked = false; // Move this line inside the forEach loop
        });

        console.log("Closing edit popup");
        editPopup.style.display = 'none';
    });

    /* Delete */
    var deleteIcon = document.getElementById('delete-icon');
    var deletePopup = document.getElementById('delete-popup');
    deleteIcon.addEventListener('click', function () {
        var anyCheckboxChecked = false;
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                anyCheckboxChecked = true;
            }
        });
        if (anyCheckboxChecked) {
            deletePopup.style.display = 'block';
        } else if (playlists.length == 0) {
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
    var cancelButton = document.getElementById('cancel-delete');
    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });
    var okButton = document.getElementById('ok-delete');
    okButton.addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var itemName = checkbox.getAttribute('data-name');
                playlists = playlists.filter(function (item) {
                    return item.name !== itemName;
                });
            }
        })
        displayUsers(currentPage);
        updatePagination();
        User_Info();

        deletePopup.style.display = 'none';
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            topCheckbox.checked = false;
        });
    });

    searchInput.addEventListener('keyup', applySearchListener);
    applySearchListener();
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
                    item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function toggleItem(item) {
        var isActive = item.classList.contains('active');
        item.classList.toggle('active', !isActive);
        var caretIcon = item.querySelector('.fa-chevron-right');
        if (caretIcon) {
            caretIcon.classList.remove('fa-chevron-right');
            caretIcon.classList.add('fa-chevron-down');
        } else {
            caretIcon = item.querySelector('.fa-chevron-down');
            caretIcon.classList.remove('fa-chevron-down');
            caretIcon.classList.add('fa-chevron-right');
        }

        var userInfoContainer = item.nextElementSibling;
        if (userInfoContainer) {
            userInfoContainer.style.display = isActive ? 'none' : 'block';
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
    function adjustSidebar() {
        var sidebar = document.querySelector(".sidebar");

        if (window.innerWidth <= 990) {
            minimizeSidebar();
        } else {
            restoreSidebar();
        }
    }
    var topCheckbox = document.getElementById('topCheckbox');
    topCheckbox.addEventListener('change', function () {
        var isChecked = this.checked;
        var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');
        listItemCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    });

    var add_icon = document.getElementById('plus');
    add_icon.addEventListener('click', function () {
        window.location.href = 'addplaylist';
    });

    window.addEventListener("DOMContentLoaded", adjustSidebar);
    window.addEventListener("resize", adjustSidebar);

    displayUsers(currentPage);
    updatePagination();
    User_Info();

});


/* 
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input');
    const listItems = document.querySelectorAll('.list-item');

    searchInput.addEventListener('keyup', function () {
        const searchText = this.value.toLowerCase().trim();

        listItems.forEach(function (item) {
            const itemText = item.textContent.toLowerCase();    

            if (searchText === '' || itemText.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}); */




