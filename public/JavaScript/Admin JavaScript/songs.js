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

    //delete
    const deleteButtons = document.querySelectorAll('.delete-song-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const songId = button.getAttribute('data-song-id');
            console.log('Deleting song with ID:', songId);

            try {
                const response = await fetch(`/songs/${songId}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    console.log('Song deleted successfully');
                    const songElement = button.closest('.list-item');
                    const userInfoContainer = songElement.nextElementSibling;

                    if (songElement) {
                        songElement.remove();
                    } else {
                        console.error('Failed to find song element to remove');
                    }

                    if (userInfoContainer) {
                        userInfoContainer.remove();
                    } else {
                        console.error('Failed to find userInfoContainer element to remove');
                    }
                } else {
                    console.error('Failed to delete song');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
