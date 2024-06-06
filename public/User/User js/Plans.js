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

function redirectToSubscription() {
    window.location.href = 'Subscription.html';
}