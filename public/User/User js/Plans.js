document.addEventListener("DOMContentLoaded", function(){
    section();
})

function section() {
    document.getElementById("planCards").style.display = "flex";
    document.getElementById("planCards1").style.display = "none";
    document.getElementById("planCards2").style.display = "none";
}

function section1() {
    document.getElementById("planCards").style.display = "none";
    document.getElementById("planCards1").style.display = "flex";
    document.getElementById("planCards2").style.display = "none";
}
function section2() {
    document.getElementById("planCards").style.display = "none";
    document.getElementById("planCards1").style.display = "none";
    document.getElementById("planCards2").style.display = "flex";
}


const axios = require('axios');

// Function to send RCS message (mock without database)
async function sendRCSMessage(phoneNumber, message) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual Seven Send API key
    const url = 'https://gateway.seven.io/api/rcs/messages';

    try {
        const response = await axios.post(url, {
            text: message,
            to: phoneNumber
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': apiKey
            }
        });

        console.log('Message sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to handle sending message on OK button click
document.getElementById('okBtn').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('phoneNumberInput').value.trim();
    const message = 'Thank you for using SountSpot! Your premium plan is now available to use'; // Replace with your desired message

    try {
        await sendRCSMessage(phoneNumber, message);
        console.log('Message sent successfully to', phoneNumber);
        // Optionally close the modal or show success message here
    } catch (error) {
        console.error('Failed to send message:', error);
        // Handle error scenario, e.g., show error message to the user
    }
});













  document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("myModal");
    var subscribeButtons = document.querySelectorAll(".subscribe-btn");
    var span = document.getElementsByClassName("close")[0];

    subscribeButtons.forEach(function(button) {
        button.onclick = function() {
            modal.style.display = "block";
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    document.getElementById("cancelBtn").onclick = function() {
        modal.style.display = "none";
    }

    document.getElementById("okBtn").onclick = function() {
        var phoneNumber = document.getElementById("phoneNumber").value;
        console.log("Subscribe with number:", phoneNumber);
        // Add logic to handle subscription here
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});