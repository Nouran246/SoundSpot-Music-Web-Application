document.addEventListener('DOMContentLoaded', function() {
    const textArea5 = document.getElementById('resizable-textarea-5');
    const saveBtn5 = document.getElementById('save-button-5'); // Changed saveBtn to saveBtn5

    // Retrieve saved text from localStorage when the page loads
    const savedText = localStorage.getItem('savedText5');
    if (savedText) {
        textArea5.value = savedText;
    }

    saveBtn5.addEventListener('click', function() { // Changed saveBtn to saveBtn5
        const text5 = textArea5.value.trim(); // Changed textArea to textArea5

        if (text5 === '') {
            alert('Textarea is empty. Please enter some text before saving.');
        } else {
            // Save text to localStorage
            localStorage.setItem('savedText5', text5);
            alert('Text saved: ' + text5);
        }
    });
});

