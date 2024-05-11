document.addEventListener('DOMContentLoaded', function() {
    const textarea2 = document.getElementById('resizable-textarea-2');
    const saveButton2 = document.getElementById('save-button-2');

    // Retrieve saved text from localStorage when the page loads
    const savedText2 = localStorage.getItem('savedText2');
    if (savedText2) {
        textarea2.value = savedText2;
    }

    saveButton2.addEventListener('click', function() {
        const text = textarea2.value.trim();

        if (text === '') {
            alert('Textarea is empty. Please enter some text before saving.');
        } else {
            // Save text to localStorage
            localStorage.setItem('savedText2', text);
            alert('Text saved: ' + text);
        }
    });

    const premiumPlanDetails = document.getElementById('premium-plan-details');
    const familyPlanDetails = document.getElementById('family-plan-details');
    const individualPlanDetails = document.getElementById('individual-plan-details');
    const etisalatOfferDetails = document.getElementById('etisalat-offer-details');
    const vodafoneOfferDetails = document.getElementById('vodafone-offer-details');
    const orangeOfferDetails = document.getElementById('orange-offer-details');

    // Premium plan details
    const premiumPlan = {
        price: '$9.99/month',
        features: [
            'Unlimited access to songs',
            'Priority support',
            'Ad-free experience'
        ]
    };

    // Family plan details
    const familyPlan = {
        price: '$14.99/month',
        features: [
            'Unlimited access to songs for family members',
            'Priority support',
            'Ad-free experience for family members'
        ]
    };

    // Individual plan details
    const individualPlan = {
        price: '$6.99/month',
        features: [
            'Access to songs for one user',
            'Standard support',
            'Ad-supported experience'
        ]
    };

    // Etisalat offer details
    const etisalatOffer = {
        price: '$7.99/month',
        features: [
            'Discounted access to songs',
            'Special support for Etisalat users',
            'Ad-free experience'
        ]
    };

    // Vodafone offer details
    const vodafoneOffer = {
        price: '$8.49/month',
        features: [
            'Exclusive access to curated playlists',
            'Priority support for Vodafone users',
            'Ad-free experience'
        ]
    };

    // Orange offer details
    const orangeOffer = {
        price: '$8.99/month',
        features: [
            'Orange subscribers get bonus tracks',
            'Dedicated support for Orange users',
            'Ad-free experience'
        ]
    };

    displayPlanDetails(premiumPlan, premiumPlanDetails);
    displayPlanDetails(familyPlan, familyPlanDetails);
    displayPlanDetails(individualPlan, individualPlanDetails);
    displayPlanDetails(etisalatOffer, etisalatOfferDetails);
    displayPlanDetails(vodafoneOffer, vodafoneOfferDetails);
    displayPlanDetails(orangeOffer, orangeOfferDetails);
});

function displayPlanDetails(plan, element) {
    const detailsHTML = `
        <p class="price"><strong>Price:</strong> ${plan.price}</p>
        <p><strong>Features:</strong></p>
        <ul>
            ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    element.innerHTML = detailsHTML;
}

function editPlan(planType) {
    console.log('Editing plan:', planType);
    const planDetails = document.getElementById(`${planType}-plan-details`);
    const editButton = document.querySelector(`#${planType}-edit-button`);

    // Check if the plan details are currently editable
    const isEditable = planDetails.getAttribute('contenteditable') === 'true';

    if (isEditable) {
        planDetails.setAttribute('contenteditable', 'false');
        editButton.textContent = 'Edit';
        saveChanges(planType);
    } else {
        planDetails.setAttribute('contenteditable', 'true');
        editButton.textContent = 'Save';
    }
}



function saveChanges(planType) {
    console.log('Saving changes for:', planType);
    const planDetails = document.getElementById(`${planType}-plan-details`);
    const newPrice = planDetails.querySelector('.price').textContent.trim();
    const newFeatures = Array.from(planDetails.querySelectorAll('ul li')).map(li => li.textContent.trim());

    const newDetails = {
        price: newPrice.replace('Price: ', ''),
        features: newFeatures
    };

    // Update the saved details in local storage
    localStorage.setItem(`${planType}PlanDetails`, JSON.stringify(newDetails));
    alert('Changes saved for ' + planType);
}

function editPlanPrice(planType) {
    const newPrice = prompt(`Enter the new price for the ${planType} plan:`);
    if (newPrice !== null && newPrice !== "") {
        const planDetails = document.getElementById(`${planType}-plan-details`);
        const priceElement = planDetails.querySelector('p.price');
        if (priceElement) {
            priceElement.textContent = "Price: " + newPrice;
        }
        // Update the saved price in local storage
        const storedDetails = JSON.parse(localStorage.getItem(`${planType}PlanDetails`));
        storedDetails.price = newPrice;
        localStorage.setItem(`${planType}PlanDetails`, JSON.stringify(storedDetails));
        alert(`Price updated for ${planType}: ${newPrice}`);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Get the textarea and save button
    const textarea2 = document.getElementById('resizable-textarea-2');
    const saveButton2 = document.getElementById('save-button-2');

    // Create an error message element for each input
    const titleError = document.createElement('span');
    const featuresError = document.createElement('span');
    const priceError = document.createElement('span');

    titleError.classList.add('error-message');
    featuresError.classList.add('error-message');
    priceError.classList.add('error-message');

    // Append the error message elements under the respective input labels
    document.getElementById('title').parentNode.appendChild(titleError);
    document.getElementById('features').parentNode.appendChild(featuresError);
    document.getElementById('price').parentNode.appendChild(priceError);

    // Add event listener to the save button
    saveButton2.addEventListener('click', function() {
        // Get the text from the textarea
        const text = textarea2.value.trim();

        // Check if the textarea is empty
        if (text === '') {
            // If empty, display an error message
            displayErrorMessage(textarea2, 'Textarea is empty. Please enter some text before saving.');
        } else {
            // If not empty, clear any existing error message
            clearErrorMessage(textarea2);

            // Save the text to localStorage
            localStorage.setItem('savedText2', text);
            // Show an alert indicating the text has been saved
            alert('Text saved: ' + text);
        }
    });

    // Function to display an error message
    function displayErrorMessage(inputElement, message) {
        const errorMessage = inputElement.parentNode.querySelector('.error-message');
        errorMessage.textContent = message; // Set the text content of the error message
        errorMessage.style.color = 'red'; // Set the color of the error message to red
    }

    // Function to clear the error message
    function clearErrorMessage(inputElement) {
        const errorMessage = inputElement.parentNode.querySelector('.error-message');
        errorMessage.textContent = ''; // Clear the text content of the error message
    }



    const addPlanButton = document.getElementById('addPlanButton');
    const popupForm = document.getElementById('popupForm');
    const planForm = document.getElementById('planForm');
    const planDetailsContainer = document.getElementById('dynamicPlansContainer');

    // Function to show the pop-up form
    addPlanButton.addEventListener('click', function() {
        popupForm.style.display = 'block';
    });

    // Function to hide the pop-up form
    function hidePopupForm() {
        popupForm.style.display = 'none';
    }

    // Function to handle form submission
    planForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form inputs
        const title = document.getElementById('title').value.trim();
        const features = document.getElementById('features').value.trim();
        const price = document.getElementById('price').value.trim();

        // Validate form inputs
        if (!validateForm(title, features, price)) {
            return; // Stop further execution if validation fails
        }

        // Create new plan details div
        const planDetailsDiv = document.createElement('div');
        planDetailsDiv.classList.add('plan');
        planDetailsDiv.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th colspan="2" id="details">${title} Subscription Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Price:</td>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <td>Features:</td>
                        <td>${features}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Append plan details div to container
        planDetailsContainer.appendChild(planDetailsDiv);

        // Hide pop-up form
        hidePopupForm();
    });

    function validateForm(title, features, price) {
    var isValid = true;

    // Validate title
    const titleField = document.getElementById('title');
    const titleErrorMessage = document.getElementById('title-error');
    if (title === "") {
        if (!titleErrorMessage) {
            displayErrorMessage(titleField, "Please enter a title for the plan.", 'title-error');
        }
        isValid = false;
    } else {
        clearErrorMessage(titleField);
        if (titleErrorMessage) {
            titleErrorMessage.remove();
        }
    }

    // Validate features
    const featuresField = document.getElementById('features');
    const featuresErrorMessage = document.getElementById('features-error');
    if (features === "") {
        if (!featuresErrorMessage) {
            displayErrorMessage(featuresField, "Please enter features for the plan.", 'features-error');
        }
        isValid = false;
    } else {
        clearErrorMessage(featuresField);
        if (featuresErrorMessage) {
            featuresErrorMessage.remove();
        }
    }

    // Validate price
    const priceField = document.getElementById('price');
    const priceErrorMessage = document.getElementById('price-error');
    if (price === "") {
        if (!priceErrorMessage) {
            displayErrorMessage(priceField, "Please enter price for the plan.", 'price-error');
        }
        isValid = false;
    } else if (isNaN(price) || parseFloat(price) <= 0) {
        if (!priceErrorMessage) {
            displayErrorMessage(priceField, "Price must be a positive numeric value.", 'price-error');
        }
        isValid = false;
    } else {
        clearErrorMessage(priceField);
        if (priceErrorMessage) {
            priceErrorMessage.remove();
        }
    }

    return isValid;
}

function displayErrorMessage(field, message, id) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorMessage.id = id;
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    errorMessage.style.color = 'red';
}

function clearErrorMessage(field) {
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

        
});

