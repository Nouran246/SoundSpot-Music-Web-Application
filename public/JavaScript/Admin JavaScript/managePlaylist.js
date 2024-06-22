// managePlaylist.js


// Function to handle user deletion
function handlePlaylistDeletion() {
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
                return; 
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
        var selectedPlaylistIds = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedPlaylistIds.push(checkbox.getAttribute('data-playlistid'));

                var listItem = checkbox.closest('.list-item');
                var userInfoContainer = listItem.nextElementSibling;

                listItem.remove();
                if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                    userInfoContainer.style.display = 'none';
                }
            }
        });

        fetch('/auth/delete-playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlistIds: selectedPlaylistIds })
        })
        .then(response => {
            if (response.ok) {
                console.log('Playlists deleted successfully');
                window.location.reload(); 
            } else {
                console.error('Failed to delete playlists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        deletePopup.style.display = 'none'; 
    });

    // Event listener for Cancel button in delete confirmation popup
    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none'; // Hide delete popup on cancel
    });
}















// Check all boxes
function toggleAllCheckboxes() {
    var topCheckbox = document.getElementById('topCheckbox');
    var isChecked = topCheckbox.checked;
    var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');

    listItemCheckboxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
    });
}
// adjust sidebar
function adjustSidebar() {
    var sidebar = document.querySelector(".sidebar");

    if (window.innerWidth <= 990) {
        minimizeSidebar();
    } else {
        restoreSidebar();
    }
}

// search function
function applySearchListener() {
    const searchInput = document.querySelector('.search-bar input');
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
    });
}

// delete function
/* function deleteItems() {
    var deleteIcon = document.getElementById('delete-icon');
    var deletePopup = document.getElementById('delete-popup');
    var cancelButton = document.getElementById('cancel-delete');
    var okButton = document.getElementById('ok-delete');
    var checkboxes = document.querySelectorAll('.custom-checkbox');
    var noUsers = document.getElementById('select-item');
    var topCheckbox = document.getElementById('topCheckbox');
    var selectItemPopup = document.getElementById('select-item-popup');

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

    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });

    okButton.addEventListener('click', function () {
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var listItem = checkbox.closest('.list-item');
                var userInfoContainer = listItem.nextElementSibling;
                listItem.style.display = 'none'; // Hide list item
                if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                    userInfoContainer.style.display = 'none'; // Hide user info container
                }
            }
        });

        deletePopup.style.display = 'none';
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            topCheckbox.checked = false;
        });
    });
} */

// edit function
function editItems() {
    var selectOneItemPopup = document.getElementById('one-edit');
    var editIcon = document.getElementById('edit-icon');
    var editPopup = document.getElementById('edit-popup');
    var selectItemPopup = document.getElementById('select-item-popup');
    var noUsers = document.getElementById('select-item');
    var addEditLabel = document.getElementById('add-edit');
    var deleteEditLabel = document.getElementById('delete-edit');
    var addPlaylistDiv = document.querySelector('.add-playlist-div');
    var deletePlaylistDiv = document.querySelector('.delete-playlist-div');
    var saveButton = document.getElementById('save');
    var cancelButton = document.getElementById('cancel');
    var addIcons = document.querySelectorAll('.add');
    var deleteIcons = document.querySelectorAll('.delete');
    var checkedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');

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

    if (document.body.classList.contains('light-mode')) {
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

    cancelButton.addEventListener('click', function () {
        var checkboxes = document.querySelectorAll('.custom-checkbox:checked');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        editPopup.style.display = 'none';
    });

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

            generalContent.innerHTML = generalContent.querySelector('.generalContent-header').outerHTML;

            deleteSongs.forEach(function (song) {
                var clonedSong = song.cloneNode(true);
                var trashIcon = clonedSong.querySelector('.fa-trash');
                if (trashIcon) {
                    trashIcon.parentElement.removeChild(trashIcon);
                }
                var plusIcon = clonedSong.querySelector('.fa-plus');
                if (plusIcon) {
                    plusIcon.parentElement.removeChild(plusIcon);
                }

                generalContent.appendChild(clonedSong);
            });

            checkbox.checked = false;
        });

        console.log("Closing edit popup");
        editPopup.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // manipulate data
/*     deleteItems();
 */    editItems();

    handlePlaylistDeletion();

    // search
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keyup', applySearchListener);
    applySearchListener();

    // check all boxes
    var topCheckbox = document.getElementById('topCheckbox');
    topCheckbox.addEventListener('change', toggleAllCheckboxes);
    toggleAllCheckboxes();

    //responsivness
    adjustSidebar();

});








