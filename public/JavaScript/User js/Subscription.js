function validateForm(form) {
    var firstname = form.firstname.value;
    var lastname = form.lastname.value;
    var address = form.address.value;
    var city = form.city.value;
    var zip = form.zip.value;
    var country = form.country.value;
    var phone = form.phone.value;
    var cardnumber = form.cardnumber.value;
    var expiry = form.expiry.value;
    var cvc = form.cvc.value;

    var firstnameErr = lastnameErr = addressErr = cityErr = zipErr = countryErr = phoneErr = cardnumberErr = expiryErr = cvcErr = false;

    // Regular expressions
    var nameAddressCityRegex = /^[a-zA-Z\s]+$/;
    var phoneRegex = /^\d{10}$/;
    var zipRegex = /^\d{5}$/;
    var cvcRegex = /^\d{3}$/;
    var cardNumberRegex = /^\d{16}$/;  // Assuming Visa card number format
    var expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format


    if (country === "") {
        document.getElementById("countryErr").innerText = "Please select a country";
        countryErr = true;
    } else {
        document.getElementById("countryErr").innerText = "";
    }
    
    // Validate first name
    if (firstname === "" || firstname.length < 3 || firstname.length > 15 || !nameAddressCityRegex.test(firstname)) {
        document.getElementById("firstnameErr").innerText = "First name must be 3-15 letters and no special characters";
        firstnameErr = true;
    } else {
        document.getElementById("firstnameErr").innerText = "";
    }

    // Validate last name
    if (lastname === "" || lastname.length < 3 || lastname.length > 15 || !nameAddressCityRegex.test(lastname)) {
        document.getElementById("lastnameErr").innerText = "Last name must be 3-15 letters and no special characters";
        lastnameErr = true;
    } else {
        document.getElementById("lastnameErr").innerText = "";
    }

    // Validate billing address
    if (address === "" || !nameAddressCityRegex.test(address)) {
        document.getElementById("addressErr").innerText = "Please enter a valid billing address without special characters";
        addressErr = true;
    } else {
        document.getElementById("addressErr").innerText = "";
    }

    // Validate city
    if (city === "" || !nameAddressCityRegex.test(city)) {
        document.getElementById("cityErr").innerText = "Please enter a valid city without special characters";
        cityErr = true;
    } else {
        document.getElementById("cityErr").innerText = "";
    }

    // Validate phone number
    if (phone === "" || !phoneRegex.test(phone)) {
        document.getElementById("phoneErr").innerText = "Please enter a valid 10 digit phone number";
        phoneErr = true;
    } else {
        document.getElementById("phoneErr").innerText = "";
    }

    // Validate zip code
    if (zip === "" || !zipRegex.test(zip)) {
        document.getElementById("zipErr").innerText = "Zip code must be exactly 5 digits";
        zipErr = true;
    } else {
        document.getElementById("zipErr").innerText = "";
    }

    // Validate card number
    if (cardnumber === "" || !cardNumberRegex.test(cardnumber)) {
        document.getElementById("cardnumberErr").innerText = "Card number must be exactly 16 digits";
        cardnumberErr = true;
    } else {
        document.getElementById("cardnumberErr").innerText = "";
    }

    // Validate expiry date
    if (expiry === "" || !expiryRegex.test(expiry)) {
        document.getElementById("expiryErr").innerText = "Please enter the expiry date in MM/YY format";
        expiryErr = true;
    } else {
        document.getElementById("expiryErr").innerText = "";
    }

    // Validate CVC
    if (cvc === "" || !cvcRegex.test(cvc)) {
        document.getElementById("cvcErr").innerText = "CVC must be exactly 3 digits";
        cvcErr = true;
    } else {
        document.getElementById("cvcErr").innerText = "";
    }

    if (firstnameErr || lastnameErr || addressErr || cityErr || zipErr || countryErr || phoneErr || cardnumberErr || expiryErr || cvcErr) {
        return false;
    } else {
        alert("Form Submitted Successfully!");
    }
}
