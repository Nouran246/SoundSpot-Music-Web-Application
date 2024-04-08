const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function validateForm(form) {
    // Retrieving the values of form elements 
    var name = form.firstname.value;
    var email = form.email.value;
    var mobile = form.phone.value;
    var country = form.country.value;
    var gender = form.gender.value;
    var password = form.password.value;
    var confirm = form.confirm.value;
    
    // Defining error variables with a default value
    var nameErr = emailErr = mobileErr = countryErr = genderErr = passwordErr = confirmErr = false;
    
    // Validate name
    if(name == "") {
        document.getElementById("nameErr").innerText = "Please enter your name";
        nameErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
            document.getElementById("nameErr").innerText = "Please enter a valid name";
            nameErr = true;
        } else {
            document.getElementById("nameErr").innerText = "";
        }
    }
    
    // Validate email address
    if(email == "") {
        document.getElementById("emailErr").innerText = "Please enter your email address";
        emailErr = true;
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            document.getElementById("emailErr").innerText = "Please enter a valid email address";
            emailErr = true;
        } else {
            document.getElementById("emailErr").innerText = "";
        }
    }

    // Validate password
    if(password == "") {
        document.getElementById("passwordErr").innerText = "Please enter your password";
        passwordErr = true;
    } else {       
        document.getElementById("passwordErr").innerText = "";       
    }

    // Validate confirm password
    if(confirm == "") {
        document.getElementById("confpassErr").innerText = "Please confirm your password";
        confpassErr = true;
    } else if (confirm != password) {       
        document.getElementById("confpassErr").innerText = "confirmation incorrect";       
    }
    else{
        document.getElementById("confpassErr").innerText = "";  
    }

    // Validate mobile number
    if(mobile == "") {
        document.getElementById("mobileErr").innerText = "Please enter your mobile number";
        mobileErr = true;
    } else {
        var regex = /^[1-9]\d{9}$/;
        if(regex.test(mobile) === false) {
            document.getElementById("mobileErr").innerText = "Please enter a valid 10 digit mobile number";
            mobileErr = true;
        } else {
            document.getElementById("mobileErr").innerText = "";
        }
    }
    
    // Validate country
    if(country == "Select") {
        document.getElementById("countryErr").innerText = "Please select your country";
        countryErr = true;
    } else {
        document.getElementById("countryErr").innerText = "";
    }
    
    // Validate gender
    if(gender == "") {
        document.getElementById("genderErr").innerText = "Please select your gender";
        genderErr = true;
    } else {
        document.getElementById("genderErr").innerText = "";
    }
    
    // Prevent the form from being submitted if there are any errors
    if(nameErr || emailErr || mobileErr || countryErr || genderErr || passwordErr || confpassErr) {
       return false;
    } else {
        // Creating a string from input data for preview
        var dataPreview = "You've entered the following details: \n" +
                          "Full Name: " + name + "\n" +
                          "Email Address: " + email + "\n" +
                          "Mobile Number: " + mobile + "\n" +
                          "Country: " + country + "\n" +
                          "Gender: " + gender + "\n";

        // Display input data in a dialog box before submitting the form
        alert(dataPreview);
    }
}
