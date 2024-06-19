document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    document.getElementById('planForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        // Get form inputs
        const title = document.getElementById('Title').value.trim();
        const features = getSelectedFeatures();
        const price = document.getElementById('price').value.trim();
        const duration = document.getElementById('Duration').value;
        const planTitle = document.getElementById('Title').value.trim();
        // Validate form inputs
        if (!validateForm(title, features, price, duration)) {
            return; // Stop further execution if validation fails
        }
        // Create new plan details object
        const newPlan = {
            title: title,
            features: features,
            price: price,
            duration: duration
        };
        // Display plan details dynamically
        if (planTitle) {
            // Update existing plan details
            updatePlanDetails(planTitle, newPlan);
        } else {
            // Add new plan details
            displayPlanDetails(newPlan);
            // Optional: Save to localStorage
            savePlanToLocalStorage(newPlan);
        }
        // Hide pop-up form
        hidePopupForm();
    });
    // Fetch plans on page load
    // fetchPlans();
    // Event listener for edit and delete buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const planTitle = event.target.getAttribute('data-plan-title');
            editPlan(planTitle);
        } else if (event.target.classList.contains('delete-button')) {
            const planTitle = event.target.getAttribute('data-plan-title');
            deletePlan(planTitle);
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
        var isValid = true;
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
    
    
    
    
        // Append plan details div to container
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
    // Function to handle editing a plan
    function editPlan(planTitle) {
        // Retrieve plan details from localStorage
        const storedPlan = JSON.parse(localStorage.getItem(`${planTitle}PlanDetails`));
        if (!storedPlan) {
            console.log('Plan details not found in localStorage');
            return;
        }
        // Populate form fields with stored plan details for editing
        document.getElementById('editTitle').value = storedPlan.title;
        document.getElementById('editPrice').value = storedPlan.price;
        document.getElementById('editDuration').value = storedPlan.duration;
        // Check feature checkboxes based on stored plan features
        const checkboxes = document.querySelectorAll('.editFeatureCheckbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = storedPlan.features.includes(checkbox.value);
        });
        // Store the plan title being edited in a hidden input field
        document.getElementById('editPlanTitle').value = planTitle;
        // Display the edit popup form
        document.getElementById('editPopupForm').style.display = 'block';
    }
    // Event listener for Save button in the edit popup form
    document.getElementById('editSaveButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        // Get form inputs from the edit popup form
        const title = document.getElementById('editTitle').value.trim();
        const price = document.getElementById('editPrice').value.trim();
        const duration = document.getElementById('editDuration').value;
        const features = getSelectedEditFeatures(); // Get selected features
        const planTitle = document.getElementById('editPlanTitle').value.trim();
        // Retrieve existing plan details from localStorage
        let storedPlan = JSON.parse(localStorage.getItem(`${planTitle}PlanDetails`));
        if (!storedPlan) {
            console.log('Plan details not found in localStorage');
            return;
        }
        // Update only the fields that were changed
        storedPlan.title = title !== '' ? title : storedPlan.title;
        storedPlan.price = price !== '' ? price : storedPlan.price;
        storedPlan.duration = duration !== '' ? duration : storedPlan.duration;
        storedPlan.features = features.length > 0 ? features : storedPlan.features;
        // Update plan details in localStorage
        localStorage.setItem(`${planTitle}PlanDetails`, JSON.stringify(storedPlan));
        // Update plan details in the UI
        updatePlanDetails(planTitle, storedPlan);
        // Hide the edit popup form
        document.getElementById('editPopupForm').style.display = 'none';
    });
    // Event listener for Cancel button in the edit popup form
    document.getElementById('editCancelButton').addEventListener('click', function() {
        // Hide the edit popup form
        document.getElementById('editPopupForm').style.display = 'none';
    });
    // Function to get selected features from the edit popup form
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
    // Function to update plan details in the UI
    function updatePlanDetails(planTitle, updatedPlan) {
        // Update plan details in the UI
        const planContainer = document.getElementById(`${planTitle}-plan-details`);
        if (planContainer) {
            planContainer.innerHTML = `
            <div class="plan-details">
                <h3>${updatedPlan.title} Subscription Details</h3>        <table>
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
    }
    // Function to delete a plan
    function deletePlan(planTitle) {
        console.log('Deleting plan:', planTitle);
        // Remove plan details from localStorage
        localStorage.removeItem(`${planTitle}PlanDetails`);
        // Remove plan details from the UI
        const planContainer = document.getElementById(`${planTitle}-plan-details`);
        if (planContainer) {
            planContainer.parentNode.removeChild(planContainer); // Remove the plan container from its parent
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
    // Function to hide the pop-up form
    function hidePopupForm() {
        document.getElementById('popupForm').style.display = 'none';
        // Reset form fields and error messages
        document.getElementById('planForm').reset();
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.remove();
        });
        // Reset submit button text to 'Save'
        document.querySelector('#planForm button[type="submit"]').textContent = 'Save';
    }
    const addPlanButton = document.getElementById('addPlanButton');
    addPlanButton.addEventListener('click', function() {
        // Display the pop-up form
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
function fetchPlans() {
    fetch('/plans')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(plans => {
            if (plans && plans.length > 0) {
                plans.forEach(plan => {
                    displayPlanDetails(plan);
                });
            } else {
                document.getElementById('dynamicPlansContainer').innerHTML = '<p>No plans available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching plans:', error);
            document.getElementById('dynamicPlansContainer').innerHTML = 'Failed to fetch plans. Please try again later.';
        });
}
  
    // Function to display plan details
    function displayPlanDetails(Plan) {
        const planDetailsDiv = document.createElement('div');
        planDetailsDiv.classList.add('Plan');
        planDetailsDiv.id = `${Plan.Title}-plan-details`; // Ensure Title matches the case sent by backend
        planDetailsDiv.innerHTML = `
            <div class="plan-details">
                <h3>${Plan.Title} Subscription Details</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td>${Plan.Price}</td>
                            <td><strong>Features:</strong></td>
                            <td>
                                <ul>
                                    ${Plan.Features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </td>
                            <td><strong>Duration:</strong></td>
                            <td>${Plan.Duration}</td>
                            <td class="plan-actions">
                                <button class="edit-button" data-plan-title="${Plan.Title}">Edit</button>
                                <button class="delete-button" data-plan-title="${Plan.Title}">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById('dynamicPlansContainer').appendChild(planDetailsDiv);
    }
    fetchPlans();
  
    // Fetch plans on page load
  
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Document loaded, fetching plans...');
        fetch('/plans')
          .then(response => {
            console.log('Response received:', response);
            return response.json();
          })
          .then(plans => {
            console.log('Plans data:', plans);
            if (plans && plans.length > 0) {
              plans.forEach(plan => {
                displayPlanDetails(plan);
              });
            } else {
              document.getElementById('dynamicPlansContainer').innerHTML = '<p>No plans available.</p>';
            }
          })
          .catch(error => console.error('Error fetching plans:', error));
      });