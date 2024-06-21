document.addEventListener('DOMContentLoaded', function() {

    const addPlanButton = document.getElementById('addPlanButton');
    const popupForm = document.getElementById('popupForm');
    const cancelButton = popupForm.querySelector('button[type="button"]');
    const saveButton = document.getElementById('save-button'); // Updated to match HTML id attribute

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
            // If all fields are valid, submit the form
            document.getElementById('planForm').submit();
            document.getElementById('message').style.display = 'block'; // Show success message
            hidePopupForm(); // Hide the form after successful submission
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
