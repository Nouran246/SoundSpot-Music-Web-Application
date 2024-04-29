// Function to set the page header based on the playlist name passed in the URL
function setPageHeaderFromUrl() {
    // Get the playlist name parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const playlistName = urlParams.get('playlist');
    
    // Get the header element
    const header = document.querySelector('h1');
    
    // Set the header text to the playlist name
    if (playlistName) {
        header.textContent = playlistName;
    }
}

// Call the function to set the page header from the URL when the page loads
document.addEventListener('DOMContentLoaded', function () {
    setPageHeaderFromUrl();
});
