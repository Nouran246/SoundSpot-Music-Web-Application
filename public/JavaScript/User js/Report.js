// Report.js
function validateReportForm(event, form) {
    event.preventDefault(); // Prevent form from submitting

    // Clear previous errors
    displayErrors({});

    // Retrieving the values of form elements
    var email = form.email.value.trim(); // Use trim() to remove leading/trailing whitespace
    var confirmEmail = form.confirm_email.value.trim();
    var comment = form.comment.value.trim();
    var problemTypes = form.querySelectorAll('input[name="problem_type"]:checked');

    var errors = {};

    // Validate email address
    if (email === "") {
        errors.email = "Please enter your email address";
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            errors.email = "Please enter a valid email address";
        }
    }

    // Validate confirm email address
    if (confirmEmail === "") {
        errors.confirmEmail = "Please confirm your email address";
    } else if (confirmEmail !== email) {
        errors.confirmEmail = "Email addresses do not match";
    }

    // Validate problem types
    if (problemTypes.length === 0) {
        errors.problemType = "At least one problem type must be selected";
    }

    // Validate comment
    if (comment === "") {
        errors.comment = "Please enter a comment";
    }

    // Display errors if any exist
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return false; // Stop form submission
    } else {
        // Simulate success message instead of actual form submission
        displaySuccessMessage();
        form.reset(); // Reset form fields after successful submission
    }
}

function displayErrors(errors) {
    if (errors.email) {
        document.getElementById("emailErr").innerText = errors.email;
        document.getElementById("emailErr").style.color = "red";
    } else {
        document.getElementById("emailErr").innerText = "";
    }
    if (errors.confirmEmail) {
        document.getElementById("confirmEmailErr").innerText = errors.confirmEmail;
        document.getElementById("confirmEmailErr").style.color = "red";
    } else {
        document.getElementById("confirmEmailErr").innerText = "";
    }
    if (errors.problemType) {
        document.getElementById("problemTypeErr").innerText = errors.problemType;
        document.getElementById("problemTypeErr").style.color = "red";
    } else {
        document.getElementById("problemTypeErr").innerText = "";
    }
    if (errors.comment) {
        document.getElementById("commentErr").innerText = errors.comment;
        document.getElementById("commentErr").style.color = "red";
    } else {
        document.getElementById("commentErr").innerText = "";
    }
}

function displaySuccessMessage() {
    // Display success message where the comment error would appear
    const commentErrorElement = document.getElementById("commentErr");
    if (commentErrorElement) {
        commentErrorElement.innerText = "Issue reported successfully!";
        commentErrorElement.style.color = "green";
    }
    // You can also choose to hide this message after a few seconds using setTimeout if needed
    setTimeout(() => {
        commentErrorElement.innerText = ""; // Clear success message after a few seconds
    }, 5000); // 5000 milliseconds = 5 seconds
}