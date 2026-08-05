// --- Menu Toggle ---
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('nav ul');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}

// --- Footer Dates ---
const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}
