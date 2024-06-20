const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Define the path to your EJS template
const templatePath = path.join(__dirname, 'views', 'UserPart', 'landing.ejs');
// Define the output path for the compiled HTML
const outputPath = path.join(__dirname, 'build', 'landing.html');

// Render the EJS template
ejs.renderFile(templatePath, {}, (err, str) => {
  if (err) {
    console.error('Error rendering EJS:', err);
  } else {
    // Ensure the build directory exists
    fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
    // Write the rendered HTML to the output file
    fs.writeFileSync(outputPath, str);
    console.log('EJS compiled to HTML successfully!');
  }
});
