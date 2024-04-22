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
