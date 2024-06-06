document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("issue-report-form");
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='problem_type']");
    const email = document.getElementById("email");
    const confirmEmail = document.getElementById("confirm-email");
    const comment = document.getElementById("comment");
    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.display = "none";
    errorMessage.style.marginTop = "10px";
    form.appendChild(errorMessage);

    form.addEventListener("submit", function(event) {
        let isChecked = false;
        let errors = [];

        // Check if any checkbox is checked
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            errors.push("Please check at least one box.");
        }

        // Check if email is entered
        if (!email.value) {
            errors.push("Email is required.");
        }

        // Check if emails match
        if (email.value !== confirmEmail.value) {
            errors.push("Emails do not match.");
        }

        // Check if comment is not empty
        if (!comment.value.trim()) {
            errors.push("Comment cannot be empty.");
        }

        if (errors.length > 0) {
            event.preventDefault();
            errorMessage.innerHTML = errors.join("<br>");
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    });
});
