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


document.addEventListener("DOMContentLoaded", function() {
    // Initialize the default section
    section();

    // Modal functionality
    var modal = document.getElementById("myModal");
    var subscribeButtons = document.querySelectorAll(".subscribe-btn");
    var span = document.getElementsByClassName("close")[0];
    var errorMessage = document.getElementById("error-message");

    subscribeButtons.forEach(function(button) {
        button.onclick = function() {
            modal.style.display = "block";
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
        errorMessage.style.display = "none";
    }

    document.getElementById("cancelBtn").onclick = function() {
        modal.style.display = "none";
        errorMessage.style.display = "none";
    }

    document.getElementById("okBtn").onclick = function() {
        var phoneNumber = document.getElementById("phoneNumber").value;
        if (!phoneNumber) {
            errorMessage.textContent = "Please enter your number.";
            errorMessage.style.display = "block";
        } else if (phoneNumber.length !== 11 || isNaN(phoneNumber)) {
            errorMessage.textContent = "Please enter a valid 11-digit number.";
            errorMessage.style.display = "block";
        } else {
            console.log("Subscribe with number:", phoneNumber);
            // Add logic to handle subscription here
            modal.style.display = "none";
            errorMessage.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            errorMessage.style.display = "none";
        }
    }
});