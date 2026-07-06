const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('nav ul');

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
});

// Update footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Directory Fetch and Display
const url = 'data/members.json';
const directoryContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

async function getMembersData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Failed to fetch members data");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function displayMembers(members) {
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo for ${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        
        directoryContainer.appendChild(card);
    });
}

// Toggle Views
gridBtn.addEventListener('click', () => {
    directoryContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list-view');
});

// Initialize
getMembersData();
