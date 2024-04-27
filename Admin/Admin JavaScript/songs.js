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
];


// Database

document.addEventListener('DOMContentLoaded', function () {
    
    console.log("Dom content loaded");
    PerPage = 5;
    var currentPage = 1;
    var sortOrder = 1; // 1 for ascending, -1 for descending

    var songCheckboxes = document.querySelectorAll('.checkbox-input');

    function calculateTotalPages() {
        return Math.ceil(songs.length / songsPerPage);
    }
    function displaySongs(page) {
        let startIndex = (page - 1) * PerPage;
        let endIndex = startIndex + PerPage;
        let displayedSongs = songs.slice(startIndex, endIndex);

        let listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";

        displayedSongs.forEach(function (song) {
            let listItem = document.createElement("div");
            listItem.classList.add("list-item");

            let musicLink = document.createElement("a");
            musicLink.href = "#";

            let musicIcon = document.createElement("i");
            musicIcon.classList.add("fa-solid", "fa-music");

            let nameDiv = document.createElement("div");
            nameDiv.classList.add("text");
            nameDiv.textContent = song.name;

            let artistDiv = document.createElement("div");
            artistDiv.classList.add("text");
            artistDiv.textContent = song.artist;

            let albumDiv = document.createElement("div");
            albumDiv.classList.add("text");
            albumDiv.textContent = song.album;

            let releaseDateDiv = document.createElement("div");
            releaseDateDiv.classList.add("text");
            releaseDateDiv.textContent = song.releaseDate;

            let checkboxInput = document.createElement("input");
            checkboxInput.classList.add("custom-checkbox");
            checkboxInput.type = "checkbox";

            // Append elements to the DOM
            musicLink.appendChild(musicIcon);
            musicLink.appendChild(nameDiv);
            musicLink.appendChild(artistDiv);
            musicLink.appendChild(albumDiv);
            musicLink.appendChild(releaseDateDiv);
            listItem.appendChild(musicLink);
            listItem.appendChild(checkboxInput);
            listContainer.appendChild(listItem);
        });
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
        displaySongs(currentPage);
        updatePagination();
    }
    function sortSongs() {
        sortOrder *= -1; // Toggle sort order
        songs.sort(function (a, b) {
            var dateA = new Date(a.lastAccess);
            var dateB = new Date(b.lastAccess);
            return sortOrder * (dateA - dateB);
        });
        currentPage = 1; // Reset to first page after sorting
        updateSortIconTitle(); // Update sort icon title
        displaySongs(currentPage); // Redisplay sorted songs    
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
    displaySongs(currentPage);
    updatePagination();
    sortSongs();

    var sortIcon = document.querySelector('.fa-sort');
    sortIcon.addEventListener('click', sortSongs);

});


/* pop up of delete log */
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}
function exitPopup() {
    document.getElementById('popup').style.display = 'none';
}

//search song-list
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
    var songCheckboxes = document.querySelectorAll('.checkbox-input');
    selectAllCheckbox.addEventListener('click', function () {
        var isChecked = selectAllCheckbox.checked;
        selectAllCheckbox.title = isChecked ? 'Unselect All' : 'Select All';
    });
});









