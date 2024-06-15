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