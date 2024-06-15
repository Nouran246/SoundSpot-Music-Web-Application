document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    document.getElementById('planForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission
    
        // Get form inputs
        const title = document.getElementById('title').value.trim();
        const features = getSelectedFeatures();
        const price = document.getElementById('price').value.trim();
        const duration = document.getElementById('duration').value;
        const adsVideo = document.getElementById('adsVideo').files[0];
        const popupImage = document.getElementById('popupImage').files[0];
    
        // Validate form inputs
        if (!validateForm(title, features, price, duration)) {
            return; // Stop further execution if validation fails
        }
    
        // Create a FormData object to send data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('features', features);
        formData.append('price', price);
        formData.append('duration', duration);
        if (adsVideo) {
            formData.append('adsVideo', adsVideo);
        }
        if (popupImage) {
            formData.append('popupImage', popupImage);
        }
    
        // Send the form data to the server using fetch
        try {
            const response = await fetch('http://localhost:3000/plans/process', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const newPlan = await response.json();
                // Display plan details dynamically
                displayPlanDetails(newPlan);
                // Hide pop-up form
                hidePopupForm();
            } else {
                const errorText = await response.text();
                console.error('Error creating plan:', response.status, response.statusText, errorText);
                alert('Failed to create plan. Please try again.');
            }
        } catch (error) {
            console.error('Error creating plan:', error);
            alert('An error occurred. Please try again.');
        }
    });

    function getSelectedFeatures() {
        const checkboxes = document.getElementsByName('features');
        const selectedFeatures = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFeatures.push(checkbox.value);
            }
        });
        return selectedFeatures;
    }

    function validateForm(title, features, price, duration) {
        let isValid = true;

        // Validate title
        const titleField = document.getElementById('title');
        if (title === "") {
            displayErrorMessage(titleField, "Please enter a title for the plan", 'title-error');
            isValid = false;
        } else {
            clearErrorMessage(titleField);
        }

        // Validate features
        const featuresField = document.getElementsByName('features');
        if (features.length === 0) {
            displayErrorMessage(featuresField[0], "Please select at least one feature", 'features-error');
            isValid = false;
        } else {
            clearErrorMessage(featuresField[0]);
        }

        // Validate price
        const priceField = document.getElementById('price');
        if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
            displayErrorMessage(priceField, "Please enter a valid price", 'price-error');
            isValid = false;
        } else {
            clearErrorMessage(priceField);
        }

        // Validate duration
        const durationField = document.getElementById('duration');
        if (duration === "") {
            displayErrorMessage(durationField, "Please select a duration", 'duration-error');
            isValid = false;
        } else {
            clearErrorMessage(durationField);
        }

        return isValid;
    }

    function displayPlanDetails(plan) {
        const planDetailsDiv = document.createElement('div');
        planDetailsDiv.classList.add('plan');
        planDetailsDiv.id = `${plan.title}-plan-details`;
        planDetailsDiv.innerHTML = `
            <div class="plan-details">
                <h3>${plan.title} Subscription Details</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td>${plan.price}</td>
                            <td><strong>Features:</strong></td>
                            <td>
                                <ul>
                                    ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </td>
                            <td><strong>Duration:</strong></td>
                            <td>${plan.duration}</td>
                            <td class="plan-actions">
                                <button class="edit-button" data-plan-title="${plan.title}">Edit</button>
                                <button class="delete-button" data-plan-title="${plan.title}">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById('dynamicPlansContainer').appendChild(planDetailsDiv);
    }

    function savePlanToLocalStorage(plan) {
        // Save plan details to localStorage
        localStorage.setItem(`${plan.title}PlanDetails`, JSON.stringify(plan));
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const planTitle = event.target.getAttribute('data-plan-title');
            editPlan(planTitle);
        } else if (event.target.classList.contains('delete-button')) {
            const planTitle = event.target.getAttribute('data-plan-title');
            deletePlan(planTitle);
        }
    });

    function editPlan(planTitle) {
        const storedPlan = JSON.parse(localStorage.getItem(`${planTitle}PlanDetails`));
        if (!storedPlan) {
            console.log('Plan details not found in localStorage');
            return;
        }

        document.getElementById('editTitle').value = storedPlan.title;
        document.getElementById('editPrice').value = storedPlan.price;
        document.getElementById('editDuration').value = storedPlan.duration;

        const checkboxes = document.querySelectorAll('.editFeatureCheckbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = storedPlan.features.includes(checkbox.value);
        });

        document.getElementById('editPlanTitle').value = planTitle;
        document.getElementById('editPopupForm').style.display = 'block';
    }

    document.getElementById('editSaveButton').addEventListener('click', function(event) {
        event.preventDefault();

        const title = document.getElementById('editTitle').value.trim();
        const price = document.getElementById('editPrice').value.trim();
        const duration = document.getElementById('editDuration').value;
        const features = getSelectedEditFeatures();
        const planTitle = document.getElementById('editPlanTitle').value.trim();

        let storedPlan = JSON.parse(localStorage.getItem(`${planTitle}PlanDetails`));
        if (!storedPlan) {
            console.log('Plan details not found in localStorage');
            return;
        }

        storedPlan.title = title !== '' ? title : storedPlan.title;
        storedPlan.price = price !== '' ? price : storedPlan.price;
        storedPlan.duration = duration !== '' ? duration : storedPlan.duration;
        storedPlan.features = features.length > 0 ? features : storedPlan.features;

        localStorage.setItem(`${planTitle}PlanDetails`, JSON.stringify(storedPlan));
        updatePlanDetails(planTitle, storedPlan);
        document.getElementById('editPopupForm').style.display = 'none';
    });

    document.getElementById('editCancelButton').addEventListener('click', function() {
        document.getElementById('editPopupForm').style.display = 'none';
    });

    function getSelectedEditFeatures() {
        const checkboxes = document.querySelectorAll('.editFeatureCheckbox');
        const selectedFeatures = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFeatures.push(checkbox.value);
            }
        });
        return selectedFeatures;
    }

    function updatePlanDetails(planTitle, updatedPlan) {
        const planContainer = document.getElementById(`${planTitle}-plan-details`);
        if (planContainer) {
            planContainer.innerHTML = `
                <div class="plan-details">
                    <h3>${updatedPlan.title} Subscription Details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Price:</strong></td>
                                <td>${updatedPlan.price}</td>
                                <td><strong>Features:</strong></td>
                                <td>
                                    <ul>
                                        ${updatedPlan.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </td>
                                <td><strong>Duration:</strong></td>
                                <td>${updatedPlan.duration}</td>
                                <td class="plan-actions">
                                    <button class="edit-button" data-plan-title="${updatedPlan.title}">Edit</button>
                                    <button class="delete-button" data-plan-title="${updatedPlan.title}">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        localStorage.setItem(`${planTitle}PlanDetails`, JSON.stringify(updatedPlan));
    }

    function deletePlan(planTitle) {
        localStorage.removeItem(`${planTitle}PlanDetails`);
        const planContainer = document.getElementById(`${planTitle}-plan-details`);
        if (planContainer) {
            planContainer.parentNode.removeChild(planContainer);
            alert('Plan deleted: ' + planTitle);
        } else {
            console.log('Plan container not found');
        }
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
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function hidePopupForm() {
        document.getElementById('popupForm').style.display = 'none';
        document.getElementById('planForm').reset();
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.remove();
        });
        document.querySelector('#planForm button[type="submit"]').textContent = 'Save';
    }

    const addPlanButton = document.getElementById('addPlanButton');
    addPlanButton.addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'block';
    });
});
function updatePlanDetails(planTitle, updatedPlan) {
    // Update plan details in the UI
    const planContainer = document.getElementById(`${planTitle}-plan-details`);
    if (planContainer) {
        planContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th colspan="2" id="details">${updatedPlan.title} Subscription Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Price:</td>
                        <td>${updatedPlan.price}</td>
                  
                        <td>Features:</td>
                        <td>
                            <ul>
                                ${updatedPlan.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </td>
                   
                        <td>Duration:</td>
                        <td>${updatedPlan.duration}</td>

                    </tr>
                </tbody>
            </table>
        `;
    }

    // Update plan details in localStorage
    localStorage.setItem(`${planTitle}PlanDetails`, JSON.stringify(updatedPlan));
}

document.getElementById('cancelButton').addEventListener('click', function() {
    hidePopupForm();
});

function hidePopupForm() {
    document.getElementById('popupForm').style.display = 'none';
}