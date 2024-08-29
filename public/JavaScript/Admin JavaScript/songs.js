
// Function to handle song deletion
function handleSongDeletion() {
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
        var selectedSongIds = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedSongIds.push(checkbox.getAttribute('data-songid'));

                var listItem = checkbox.closest('.list-item');
                var userInfoContainer = listItem.nextElementSibling;

                listItem.remove();
                if (userInfoContainer && userInfoContainer.classList.contains('user-info-container')) {
                    userInfoContainer.style.display = 'none';
                }
            }
        });

        fetch('/auth/delete-songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songIds: selectedSongIds })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Song(s) deleted successfully');
                    window.location.reload();
                } else {
                    console.error('Failed to delete song(s)');
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
// Check all boxes
function toggleAllCheckboxes() {
    var topCheckbox = document.getElementById('topCheckbox');
    var isChecked = topCheckbox.checked;
    var listItemCheckboxes = document.querySelectorAll('.list-item .custom-checkbox');

    listItemCheckboxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    //accordion
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(item => {
        item.addEventListener('click', function () {
            const userInfoContainer = this.nextElementSibling;
            const chevronIcon = this.querySelector('.toggle-info');

            // Toggle visibility of user-info-container
            if (userInfoContainer.style.display === 'block') {
                userInfoContainer.style.display = 'none';
                chevronIcon.classList.remove('fa-chevron-down');
                chevronIcon.classList.add('fa-chevron-right');
            } else {
                // Hide all other user-info-containers
                document.querySelectorAll('.user-info-container').forEach(container => {
                    container.style.display = 'none';
                    container.previousElementSibling.querySelector('.toggle-info').classList.remove('fa-chevron-down');
                    container.previousElementSibling.querySelector('.toggle-info').classList.add('fa-chevron-right');
                });
                // Show the clicked user's info
                userInfoContainer.style.display = 'block';
                chevronIcon.classList.remove('fa-chevron-right');
                chevronIcon.classList.add('fa-chevron-down');
            }
        });
    });


 // check all boxes
 var topCheckbox = document.getElementById('topCheckbox');
 topCheckbox.addEventListener('change', toggleAllCheckboxes);
 toggleAllCheckboxes();

    setupSearch();
    handleSongDeletion();
});
