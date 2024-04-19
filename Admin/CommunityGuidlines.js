document.addEventListener('DOMContentLoaded', function() {
    const textArea4 = document.getElementById('resizable-textarea-4');
    const saveBtn4 = document.getElementById('save-button-4');

    const savedText = localStorage.getItem('savedText4');
    if (savedText) {
        textArea4.value = savedText;
    }

    saveBtn4.addEventListener('click', function() {
        const text = textArea4.value.trim();

        if (text === '') {
            alert('Textarea is empty. Please enter some text before saving.');
        } else {
        
            localStorage.setItem('savedText4', text);
            alert('Text saved: ' + text);
        }
    });
});
