let songs = [
    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        releaseDate: "2017-01-06"
    },
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        releaseDate: "2019-11-29"
    },
    {
        name: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        releaseDate: "2019-05-10"
    },
    {
        name: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        releaseDate: "2014-11-10"
    },
    {
        name: "Someone Like You",
        artist: "Adele",
        album: "21",
        releaseDate: "2011-09-29"
    },
    {
        name: "Rockstar",
        artist: "Post Malone",
        album: "Beerbongs & Bentleys",
        releaseDate: "2017-09-15"
    },
    {
        name: "Closer",
        artist: "The Chainsmokers",
        album: "Collage",
        releaseDate: "2016-07-29"
    },
    {
        name: "Shallow",
        artist: "Lady Gaga, Bradley Cooper",
        album: "A Star is Born",
        releaseDate: "2018-09-27"
    }, {
        name: "Thinking Out Loud",
        artist: "Ed Sheeran",
        album: "x",
        releaseDate: "2014-09-24"
    },
    {
        name: "Happier",
        artist: "Marshmello ft. Bastille",
        album: "Joytime III",
        releaseDate: "2018-08-17"
    },
    {
        name: "Despacito",
        artist: "Luis Fonsi ft. Daddy Yankee",
        album: "Vida",
        releaseDate: "2017-01-13"
    },
    {
        name: "Old Town Road",
        artist: "Lil Nas X ft. Billy Ray Cyrus",
        album: "7",
        releaseDate: "2018-12-03"
    }, {
        name: "Hello",
        artist: "Adele",
        album: "25",
        releaseDate: "2015-10-23"
    },
    {
        name: "Rolling in the Deep",
        artist: "Adele",
        album: "21",
        releaseDate: "2010-11-29"
    },
    {
        name: "Set Fire to the Rain",
        artist: "Adele",
        album: "21",
        releaseDate: "2011-01-04"
    },
    {
        name: "Skyfall",
        artist: "Adele",
        album: "Skyfall",
        releaseDate: "2012-10-05"
    }

];


document.addEventListener('DOMContentLoaded', function () {
    console.log("Dom content loaded");
    console.log(window.innerWidth);
    console.log("songshtml Checkboxes:", userCheckboxes);

    /* Pagination Var */
    var PerPage = 10;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending

    /* checkboxes Var */
    var userCheckboxes = document.querySelectorAll('.checkbox-input');
    var userCheckboxesTop = document.querySelectorAll('.checkbox-input-top');

    function calculateTotalPages() {
        return Math.ceil(songs.length / PerPage);
    }



    function displayUsers(page) {
        var startIndex = (page - 1) * PerPage;
        var endIndex = startIndex + PerPage;
        var displayedUsers = songs.slice(startIndex, endIndex);

        var listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";


        displayedUsers.forEach(function (song) {

            var listItem = document.createElement("div");
            listItem.classList.add("list-item");

            var content_div = document.createElement("div");
            listItem.classList.add("content");

            var musicIcon = document.createElement("i");
            musicIcon.classList.add("fa-solid", "fa-music");
            musicIcon.style.color = "#800080";

            var nameDiv = document.createElement("div");
            nameDiv.classList.add("text");
            nameDiv.textContent = song.name;

            var artistDiv = document.createElement("div");
            artistDiv.classList.add("text");
            artistDiv.textContent = song.artist;

            var albumDiv = document.createElement("div");
            albumDiv.classList.add("text");
            albumDiv.textContent = song.album;

            var dateDiv = document.createElement("div");
            dateDiv.classList.add("text");
            dateDiv.textContent = song.releaseDate;

            var checkboxInput = document.createElement("input");
            checkboxInput.classList.add("custom-checkbox");
            checkboxInput.type = "checkbox";
            checkboxInput.id = "userCheckbox_" + song.name; // id for each checkbox
            checkboxInput.setAttribute("data-name", song.name);
            checkboxInput.style.width = "170px";
            checkboxInput.style.height = "25px";

            let caretIcon = document.createElement("i");
            caretIcon.classList.add("fa-solid", "fa-chevron-right");

            content_div.appendChild(musicIcon);
            content_div.appendChild(nameDiv);
            content_div.appendChild(artistDiv);
            content_div.appendChild(albumDiv);
            content_div.appendChild(dateDiv);
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
            <div class="first-sec">
            <div>
                <label>Song name</label>
                <span>Shape of You</span>
            </div>
            <div>
                <label>Artist name</label>
                <span>Ed Sheeran</span>
            </div>
            <div>
                <label>Album name</label>
                <span>÷ (Divide)</span>
            </div>
            <div>
                <label>Release date</label>
                <span>January 6, 2017</span>
            </div>
            <div>
                <label>Genre</label>
                <span>Pop</span>
            </div>
        </div>
        <div class="second-sec">
            <div>
                <label>Duration</label>
                <span>3:53</span>
            </div>
            <div>
                <label>Record label</label>
                <span>Atlantic Records</span>
            </div>
            <div>
                <label>Songwriters</label>
                <span>Ed Sheeran, Steve Mac
            </div>
            <div>
                <label>Producers</label>
                <span>Ed Sheeran, Steve Mac</span>
            </div>
            <div>
                <label>Featured artists</label>
                <span>None</span>
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
                <label>Composer</label>
                <span>John Doe</span>
            </div>
            <div>
                <label>Lyricist</label>
                <span>No lyricist specified</span>
            </div>
            <div>
                <label>Track number</label>
                <span>3</span>
            </div>
            <div>
                <label>Artist origin</label>
                <span>Los Angeles, California</span>
            </div>
            <div>
                <label>Record label</label>
                <span>Universal Music Group</span>
            </div>
        </div>
        <div class="second-sec">
            <div>
                <label>Release type</label>
                <span>Single</span>
            </div>
            <div>
                <label>Song duration</label>
                <span>3 minutes 45 seconds</span>
            </div>
            <div>
                <label>Album sales</label>
                <span>Platinum</span>
            </div>
            <div>
                <label>Song rating</label>
                <span>4.5/5</span>
            </div>
            <div>
                <label>Collaborations</label>
                <span>No collaborations</span>
            </div>
        </div>
        
        `;
            activityLogContent.style.display = 'none';

            actualContent.appendChild(activityLogContent);



            var nextPage_Icon = document.createElement("i");
            nextPage_Icon.classList.add("fa-solid", "fa-circle-chevron-right");
            nextPage_Icon.id = "nextPage";
            nextPage_Icon.title = "Next";
            nextPage_Icon.style.color = "#800080";

            var prevPage_Icon = document.createElement("i");
            prevPage_Icon.classList.add("fa-solid", "fa-circle-chevron-left");
            prevPage_Icon.id = "prevPage";
            prevPage_Icon.title = "Previous";
            prevPage_Icon.style.color = "#333";

            var nav_icons = document.createElement("div");
            nav_icons.classList.add("nav-icons");

/* 
            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn");
            editButton.id = "edit-button";
            editButton.addEventListener("click", () => handleEditButtonClick());
 
            actualContent.appendChild(editButton); */
            actualContent.appendChild(nav_icons);
            nav_icons.appendChild(prevPage_Icon);
            nav_icons.appendChild(nextPage_Icon);



            listItem.addEventListener('click', function () {
                var infoContainer = listItem.nextElementSibling;
                infoContainer.style.display = infoContainer.style.display === "none" ? "block" : "none";
            });
            function toggleCategory(iconToShow, contentToShow, iconToHide, contentToHide) {

                iconToShow.style.display = "block";
                contentToShow.style.display = "block";
                iconToHide.style.display = "block";
                contentToHide.style.display = "none";

                if (document.body.classList.contains('light-mode')) {
                    iconToShow.style.color = "#800080";
                    iconToHide.style.color = "#333";
                } else {
                    iconToHide.style.color = "#800080";
                    iconToShow.style.color = "#333";
                }
            }

            nextPage_Icon.addEventListener('click', function () {
                toggleCategory(nextPage_Icon, activityLogContent, prevPage_Icon, personalInfoContent);
            });

            prevPage_Icon.addEventListener('click', function () {
                toggleCategory(prevPage_Icon, personalInfoContent, nextPage_Icon, activityLogContent);
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
    }
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
    /* Delete */
    var deleteIcon = document.getElementById('delete-trash');
    var deletePopup = document.getElementById('delete-popup');
    var selectItemPopup = document.getElementById('select-item-popup'); // Define selectItemPopup
    var noUsers = document.getElementById('select-item');
    deleteIcon.addEventListener('click', function () {
        var anyCheckboxChecked = false;
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        var topCheckbox = document.getElementById('top-checkbox'); // Define topCheckbox
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                anyCheckboxChecked = true;
            }
        });
        if (anyCheckboxChecked) {
            deletePopup.style.display = 'block';
        } else if (songs.length == 0) {
            noUsers.style.display = 'block'; // Show selectItemPopup if no checkbox is checked
            topCheckbox.checked = false;
            setTimeout(function () {
                noUsers.style.display = 'none';
            }, 2000);
        }
        else {
            selectItemPopup.style.display = 'block'; // Show selectItemPopup if no checkbox is checked
            setTimeout(function () {
                selectItemPopup.style.display = 'none';
            }, 2000);
        }
    });
    var okButton = document.getElementById('ok-delete');
    okButton.addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var itemName = checkbox.getAttribute('data-name');
                songs = songs.filter(function (item) {
                    return item.name !== itemName;
                });
            }
        });
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
    var topCheckbox = document.getElementById('topCheckbox');
    topCheckbox.addEventListener('change', function () {
        var isChecked = this.checked;
        var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');
        listItemCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    });

 
    function adjustSidebar() {
        var sidebar = document.querySelector(".sidebar");

        if (window.innerWidth <= 990) {
            minimizeSidebar();
        } else {
            restoreSidebar();
        }
    }
    var add_icon = document.getElementById('plus');
    add_icon.addEventListener('click', function () {
        window.location.href = 'addsong.html';
    });


    window.addEventListener("DOMContentLoaded", adjustSidebar);
    window.addEventListener("resize", adjustSidebar);

    displayUsers(currentPage);
    updatePagination();
    User_Info();

});



