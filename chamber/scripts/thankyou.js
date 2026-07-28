// thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const displayElement = (id, paramName) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = urlParams.get(paramName) || 'N/A';
        }
    };

    displayElement('display-name', 'fname');
    
    // Combine first and last name
    const fname = urlParams.get('fname') || '';
    const lname = urlParams.get('lname') || '';
    const nameEl = document.getElementById('display-name');
    if (nameEl) {
        nameEl.textContent = `${fname} ${lname}`.trim() || 'N/A';
    }

    displayElement('display-email', 'email');
    displayElement('display-phone', 'phone');
    displayElement('display-bizname', 'bizname');
    
    // Format date nicely
    const dateEl = document.getElementById('display-date');
    if (dateEl) {
        const timestamp = urlParams.get('timestamp');
        if (timestamp) {
            try {
                const date = new Date(timestamp);
                dateEl.textContent = date.toLocaleString();
            } catch (e) {
                dateEl.textContent = timestamp;
            }
        } else {
            dateEl.textContent = 'N/A';
        }
    }
});
