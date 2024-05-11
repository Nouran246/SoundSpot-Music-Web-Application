document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('resizable-textarea');
    const saveButton = document.getElementById('save-buttons');

    // Retrieve saved text from localStorage when the page loads
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        textarea.value = savedText;
    }

    saveButton.addEventListener('click', function() {
        const text = textarea.value.trim(); // Remove leading and trailing whitespace

        if (text === '') {
            alert('Textarea is empty. Please enter some text before saving.');
        } else {
            // Save text to localStorage
            localStorage.setItem('savedText', text);
            alert('Text saved: ' + text);
        }
    });

    const freeSubscriptionDetails = document.getElementById('free-subscription-details');

    // Free subscription details
    const freeSubscription = {
        price: 'Free',
        features: [
            'Limited access to songs',
            'Standard support',
            'Ad-supported experience'
        ]
    };

    displayPlanDetails(freeSubscription, freeSubscriptionDetails);

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
        const planDetails = document.getElementById(`${planType}-subscription-details`);
        const editButton = document.querySelector(`#${planType}-edit-button`);

        if (planDetails.contentEditable === 'true') {
            planDetails.contentEditable = 'false';
            editButton.textContent = 'Edit';
            saveChanges(planType);
        } else {
            planDetails.contentEditable = 'true';
            editButton.textContent = 'Save';
        }
    }

    function saveChanges(planType) {
        console.log('Saving changes for:', planType);
        const planDetails = document.getElementById(`${planType}-subscription-details`);
        const newPrice = planDetails.querySelector('.price').textContent.trim();
        const newFeatures = Array.from(planDetails.querySelectorAll('ul li')).map(li => li.textContent.trim());

        const newDetails = {
            price: newPrice.replace('Price: ', ''),
            features: newFeatures
        };

        // Update the saved details in local storage
        localStorage.setItem(`${planType}SubscriptionDetails`, JSON.stringify(newDetails));
        alert('Changes saved for ' + planType);
    }
});

