document.addEventListener('DOMContentLoaded', function() {

    const addPlanButton = document.getElementById('addPlanButton');
    const popupForm = document.getElementById('popupForm');
    const cancelButton = popupForm.querySelector('button[type="button"]');
    const saveButton = document.getElementById('save-button');

    // Show popup form when clicking the "Add Plan" button
    addPlanButton.addEventListener('click', function() {
        popupForm.style.display = 'block';
    });

    // Hide popup form and reset form state when clicking Cancel
    cancelButton.addEventListener('click', function() {
        hidePopupForm();
    });

    // Hide popup form and reset form state when clicking Save
    saveButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission
        validateForm();
    });

    // Function to validate the form inputs
    function validateForm() {
        const title = document.getElementById('title').value.trim();
        const features = getSelectedFeatures();
        const price = document.getElementById('price').value.trim();
        const duration = document.getElementById('duration').value.trim();

        let isValid = true;

        isValid = validateField(title, 'title', 'Please enter a title for the plan') && isValid;
        isValid = validateFeatures(features) && isValid;
        isValid = validatePrice(price) && isValid;
        isValid = validateField(duration, 'duration', 'Please select a duration') && isValid;

        if (isValid) {
            // If all fields are valid, submit the form using Fetch API
            submitForm(title, features, price, duration);
        }
    }

    // Function to get selected features
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

    // Helper function to validate a field
    function validateField(value, fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        if (!value) {
            displayErrorMessage(field, errorMessage, `${fieldId}-error`);
            return false;
        } else {
            clearErrorMessage(field);
            return true;
        }
    }

    // Function to validate selected features
    function validateFeatures(features) {
        const featuresField = document.getElementsByName('features');
        if (features.length === 0) {
            displayErrorMessage(featuresField[0], 'Please select at least one feature', 'features-error');
            return false;
        } else {
            clearErrorMessage(featuresField[0]);
            return true;
        }
    }

    // Function to validate price
    function validatePrice(price) {
        const priceField = document.getElementById('price');
        if (price === '' || isNaN(price) || parseFloat(price) <= 0) {
            displayErrorMessage(priceField, 'Please enter a valid price', 'price-error');
            return false;
        } else {
            clearErrorMessage(priceField);
            return true;
        }
    }

    // Function to submit the form data using Fetch API
    function submitForm(title, features, price, duration) {
        const data = {
            title: title,
            features: features,
            price: price,
            duration: duration
        };

        fetch('/submit-plan', { // Change this URL to match your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error submitting the form');
            }
        })
        .then(data => {
            document.getElementById('message').style.display = 'block'; // Show success message
            hidePopupForm(); // Hide the form after successful submission
            setTimeout(() => {
                window.location.reload(); // Reload the page to show the new plan
            }, 500); // Adjust the timeout as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to display error message for a field
    function displayErrorMessage(field, message, id) {
        let errorMessage = field.parentNode.querySelector(`#${id}`);
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.id = id;
            errorMessage.classList.add('error-message');
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
    }

    // Function to clear error message for a field
    function clearErrorMessage(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Function to hide the popup form and reset form state
    function hidePopupForm() {
        popupForm.style.display = 'none';
        document.getElementById('planForm').reset();
        document.getElementById('message').style.display = 'none'; // Hide any success message
        document.querySelectorAll('.error-message').forEach(errorMessage => errorMessage.remove());
    }

});



document.addEventListener('DOMContentLoaded', function () {
    handlePlanDeletion();
});

function handlePlanDeletion() {
    var deleteButtons = document.querySelectorAll('.delete-button');
    var deletePopup = document.getElementById('delete-popup');
    var okButton = document.getElementById('ok-delete');
    var cancelButton = document.getElementById('cancel-delete');

    deleteButtons.forEach(function (deleteButton) {
        deleteButton.addEventListener('click', function () {
            deletePopup.style.display = 'block';
            var plantitle = deleteButton.getAttribute('data-plan-title');
            okButton.onclick = function () {
                deletePlan(plantitle);
            };
        });
    });

    cancelButton.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });
}

function deletePlan(planTitle) {
    fetch(`/auth/delete-plan/${planTitle}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Plan deleted successfully');
            window.location.reload(); 
        } else {
            console.error('Failed to delete plan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    var deletePopup = document.getElementById('delete-popup');
    deletePopup.style.display = 'none'; 
}


    // function handlePlanEditing() {
    //     var editButtons = document.querySelectorAll('.edit-button');
    //     var editPopupForm = document.getElementById('editPopupForm');
    //     var editSaveButton = document.getElementById('editSaveButton');
    //     var editCancelButton = document.getElementById('editCancelButton');
        
    //     // Event listeners for each edit button
    //     editButtons.forEach(function (button) {
    //         button.addEventListener('click', function () {
    //             var selectedPlanTitle = button.getAttribute('data-plan-title');
    //             if (selectedPlanTitle) {
    //                 // Make AJAX request to fetch plan data based on selectedPlanTitle
    //                 fetch(`/plans/${selectedPlanTitle}`, {
    //                     method: 'GET',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     }
    //                 })
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         throw new Error('Failed to fetch plan data');
    //                     }
    //                     return response.json();
    //                 })
    //                 .then(plan => {
    //                     // Populate edit form fields with plan data fetched
    //                     document.getElementById('editTitle').value = plan.Title;
    //                     document.getElementById('editPrice').value = plan.price;
    //                     document.getElementById('editDuration').value = plan.Duration;
                        
    //                     // Uncheck all checkboxes
    //                     var editFeatureCheckboxes = document.querySelectorAll('.editFeatureCheckbox');
    //                     editFeatureCheckboxes.forEach(checkbox => {
    //                         checkbox.checked = false;
    //                     });
                        
    //                     // Check the appropriate checkboxes based on plan.Features
    //                     plan.Features.forEach(feature => {
    //                         var checkbox = document.querySelector(`.editFeatureCheckbox[value="${feature}"]`);
    //                         if (checkbox) {
    //                             checkbox.checked = true;
    //                         }
    //                     });

    //                     document.getElementById('editPlanTitle').value = plan.Title;

    //                     editPopupForm.style.display = 'block'; // Display edit popup after fetching plan data
    //                 })
    //                 .catch(error => {
    //                     console.error('Error fetching plan data for editing:', error);
    //                     window.alert('Failed to fetch plan data for editing. Please try again.');
    //                 });
    //             } else {
    //                 window.alert('No plan title specified for editing.');
    //             }
    //         });
    //     });

    //     // Event listener for Save button in edit popup
    //     editSaveButton.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         var planTitle = document.getElementById('editPlanTitle').value;
    //         var updatedPlanData = {
    //             Title: document.getElementById('editTitle').value,
    //             price: document.getElementById('editPrice').value,
    //             Duration: document.getElementById('editDuration').value,
    //             Features: Array.from(document.querySelectorAll('.editFeatureCheckbox:checked')).map(checkbox => checkbox.value)
    //         };

    //         // Make an AJAX request to update plan data in the database
    //         fetch(`/plans/${(planTitle)}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(updatedPlanData)
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 console.log('Plan data updated successfully');
    //                 return response.json();
    //             } else {
    //                 throw new Error('Failed to update plan data');
    //             }
    //         })
    //         .then(data => {
    //             console.log('Updated plan data:', data);
    //             // Optionally update UI or show success message
    //             editPopupForm.style.display = 'none'; // Hide edit popup after saving
    //             location.reload(); // Reload the page to reflect changes
    //         })
    //         .catch(error => {
    //             console.error('Error updating plan data:', error);
    //             // Handle error as needed
    //         });

    //         editPopupForm.style.display = 'none'; // Hide edit popup after saving
    //     });

    //     // Event listener for Cancel button in edit popup
    //     editCancelButton.addEventListener('click', function () {
    //         editPopupForm.style.display = 'none'; // Hide edit popup on cancel
    //     });
    // }

    // document.addEventListener('DOMContentLoaded', function () {
    //     handlePlanEditing();
    // });
   


