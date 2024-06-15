function validateReportForm(event, form) {
    event.preventDefault(); // Prevent form from submitting

    // Retrieving the values of form elements 
    var email = form.email.value;
    var confirmEmail = form.confirm_email.value;
    var comment = form.comment.value;
    var problemTypes = form.querySelectorAll('input[name="problem_type"]:checked');

    // Defining error variables with a default value
    var emailErr = confirmEmailErr = commentErr = problemTypeErr = false;

    // Validate email address
    if (email === "") {
        document.getElementById("emailErr").innerText = "Please enter your email address";
        emailErr = true;
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            document.getElementById("emailErr").innerText = "Please enter a valid email address";
            emailErr = true;
        } else {
            document.getElementById("emailErr").innerText = "";
        }
    }

    // Validate confirm email address
    if (confirmEmail === "") {
        document.getElementById("confirmEmailErr").innerText = "Please confirm your email address";
        confirmEmailErr = true;
    } else if (confirmEmail !== email) {
        document.getElementById("confirmEmailErr").innerText = "Email addresses do not match";
        confirmEmailErr = true;
    } else {
        document.getElementById("confirmEmailErr").innerText = "";
    }

    // Validate problem types
    if (problemTypes.length === 0) {
        document.getElementById("problemTypeErr").innerText = "Please select at least one problem type";
        problemTypeErr = true;
    } else {
        document.getElementById("problemTypeErr").innerText = "";
    }

    // Validate comment
    if (comment === "") {
        document.getElementById("commentErr").innerText = "Please enter a comment";
        commentErr = true;
    } else {
        document.getElementById("commentErr").innerText = "";
    }

    // Prevent the form from being submitted if there are any errors
    if (emailErr || confirmEmailErr || problemTypeErr || commentErr) {
        return false;
    } else {
        form.submit();
    }
}
