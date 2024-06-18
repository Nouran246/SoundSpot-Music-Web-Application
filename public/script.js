const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

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

async function validateForm(event, form) {
    event.preventDefault();

    // Clear previous errors
    displayErrors({});

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
    });

    const result = await response.json();

    if (!result.success) {
        displayErrors(result.errors);
    } else {
        alert(result.message);
        form.reset();
    }
}

function validateLogin(event) {
    event.preventDefault();
    var form = document.getElementById('loginForm');
    var email = form.loginemail.value;
    var password = form.password.value;
    
    if (email === "" || password === "") {
        document.getElementById("loginErr").innerText = "Please enter both email and password";
        document.getElementById("loginErr").style.color = "red";  
        return false;
    } else {
        form.submit();
    }
}
