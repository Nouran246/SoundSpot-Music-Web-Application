const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

async function validateForm(event, form) {
    event.preventDefault();

    // Clear previous errors
    displayErrors({});

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    // Example: Frontend validation
    const errors = {};
    if (!formObj.firstname) {
        errors.name = 'Please enter your name';
    } else if (!/^[a-zA-Z ]+$/.test(formObj.firstname)) {
        errors.name = 'Name should only contain alphabets and spaces';
    }

    if (!formObj.email) {
        errors.email = 'Please enter your email address';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formObj.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formObj.password) {
        errors.password = 'Please enter your password';
    } else if (formObj.password.length < 3) {
        errors.password = 'Password must be at least 3 characters long';
    }

    if (!formObj.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (formObj.password !== formObj.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (!formObj.phone_number) {
        errors.phone_number = 'Please enter your mobile number';
    } else if (!/^\d{10}$/.test(formObj.phone_number)) {
        errors.phone_number = 'Please enter a valid 10-digit phone number';
    }

    if (!formObj.gender) {
        errors.gender = 'Please select your gender';
    }

    if (formObj.country === 'Select') {
        errors.country = 'Please select your country';
    }

    // Display errors if any exist
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }

    // Proceed with form submission if no errors
    try {
        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        });

        const result = await response.json();

        if (!result.success) {
            if (result.errors) {
                displayErrors(result.errors);
            } else {
                displayErrors({ general: 'Registration failed' });
            }
        } else {
            document.getElementById("generalErr").innerText = result.message;
            document.getElementById("generalErr").style.color = "green";
            form.reset();
        }
    } catch (error) {
        console.error('Error during form submission:', error);
        displayErrors({ general: 'Error during form submission. Please try again later.' });
    }
}

function displayErrors(errors) {
    if (errors.name) {
        document.getElementById("nameErr").innerText = errors.name;
    } else {
        document.getElementById("nameErr").innerText = "";
    }
    if (errors.email) {
        document.getElementById("emailErr").innerText = errors.email;
    } else {
        document.getElementById("emailErr").innerText = "";
    }
    if (errors.password) {
        document.getElementById("passwordErr").innerText = errors.password;
    } else {
        document.getElementById("passwordErr").innerText = "";
    }
    if (errors.confirmPassword) {
        document.getElementById("confpassErr").innerText = errors.confirmPassword;
    } else {
        document.getElementById("confpassErr").innerText = "";
    }
    if (errors.phone_number) {
        document.getElementById("mobileErr").innerText = errors.phone_number;
    } else {
        document.getElementById("mobileErr").innerText = "";
    }
    if (errors.gender) {
        document.getElementById("genderErr").innerText = errors.gender;
    } else {
        document.getElementById("genderErr").innerText = "";
    }
    if (errors.country) {
        document.getElementById("countryErr").innerText = errors.country;
    } else {
        document.getElementById("countryErr").innerText = "";
    }
    if (errors.general) {
        alert(errors.general); // or you can display it in a specific div
    }
}



async function validateLogin(event) {
    event.preventDefault();

    // Clear previous errors
    displayLoginErrors({});

    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    const errors = {};

    // Front-end validation for each field
    if (!formObj.loginemail && !formObj.password) {
        errors.general = 'Please enter both email and password';
    } else {
        if (!formObj.loginemail) {
            errors.loginemail = 'Please enter your email address';
        }
        if (!formObj.password) {
            errors.password = 'Please enter your password';
        }
    }

    // Display errors if any exist
    if (Object.keys(errors).length > 0) {
        displayLoginErrors(errors);
        return;
    }

    // Proceed with form submission if no errors
    const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
    });

    if (!response.ok) {
        const result = await response.text();
        displayLoginErrors({ general: result });
    } else {
        form.submit();
    }
}

function displayLoginErrors(errors) {
    if (errors.loginemail) {
        document.getElementById("loginErr").innerText = errors.loginemail;
        document.getElementById("loginErr").style.color = "red";
    } else if (errors.password) {
        document.getElementById("loginErr").innerText = errors.password;
        document.getElementById("loginErr").style.color = "red";
    } else if (errors.general) {
        document.getElementById("loginErr").innerText = errors.general;
        document.getElementById("loginErr").style.color = "red";
    } else {
        document.getElementById("loginErr").innerText = "";
    }
}
