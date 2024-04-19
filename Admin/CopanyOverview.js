
document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('resizable-textarea-3');
    const saveBtn = document.getElementById('save-button-3');

    // Retrieve saved text from localStorage when the page loads
    const savedText = localStorage.getItem('savedText3');
    if (savedText) {
        textArea.value = savedText;
    }

    saveBtn.addEventListener('click', function() {
        const text = textArea.value.trim();

        if (text === '') {
            alert('Textarea is empty. Please enter some text before saving.');
        } else {
            // Save text to localStorage
            localStorage.setItem('savedText3', text);
            alert('Text saved: ' + text);
        }
    });
});
