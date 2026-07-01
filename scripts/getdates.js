// Dynamically output the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Dynamically output the last modified date
const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modification: ${lastModifiedDate}`;
