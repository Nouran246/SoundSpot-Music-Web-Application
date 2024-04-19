



let users = [
    { id: 1, username: "john_doe", name: "John Doe", lastAccess: "2024-04-19T10:30:00"},
    { id: 2, username: "jane_smith", name: "Jane Smith", lastAccess: "2024-04-18T14:45:00" },
    { id: 3, username: "alice_johnson", name: "Alice Johnson", lastAccess: "2024-04-17T08:20:00" }
];

let deletedUsers = [];

function deleteUser(deleteButton) {
    let removed_user = deleteButton.parentElement;

    if (removed_user) {
        let userText = removed_user.querySelector('.text').textContent;
        let deletionTime = new Date().toLocaleDateString(); 

        let deletedUser = {
            name: userText,
            deletionTime: deletionTime
        };

        deletedUsers.push(deletedUser);
    }

    removed_user.remove();
    localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));   //? local storage 
}


function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function exitPopup() {
    document.getElementById('popup').style.display = 'none';
}

