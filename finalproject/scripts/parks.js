// Import shared logic if needed, but here we just run logic specific to the discover page.
const PARKS_URL = 'data/parks.json';
const parksContainer = document.getElementById('parks-container');

// Modal Elements
const modal = document.getElementById('park-modal');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalEstablished = document.getElementById('modal-established');
const modalArea = document.getElementById('modal-area');
const modalDescription = document.getElementById('modal-description');
const closeModalBtn = document.getElementById('close-modal-btn');

// Local Storage Key
const FAVORITES_KEY = 'np-favorites';

async function fetchParks() {
    try {
        const response = await fetch(PARKS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayParks(data);
    } catch (error) {
        console.error("Could not fetch parks data:", error);
        if (parksContainer) {
            parksContainer.innerHTML = '<p>Error loading parks data. Please try again later.</p>';
        }
    }
}

function displayParks(parks) {
    if (!parksContainer) return;
    
    parksContainer.innerHTML = ''; // Clear container

    // Use forEach to build cards
    parks.forEach(park => {
        const card = document.createElement('div');
        card.classList.add('park-card');

        // Template literals for HTML string
        card.innerHTML = `
            <img src="${park.imageUrl}" alt="${park.name}" loading="lazy" width="400" height="300">
            <div class="park-card-content">
                <h3>${park.name}</h3>
                <p><strong>Location:</strong> ${park.location}</p>
            </div>
            <div class="card-actions">
                <button class="action-btn primary-action info-btn" data-id="${park.id}">More Info</button>
                <button class="action-btn accent-action save-btn" data-id="${park.id}">Save to Favorites</button>
            </div>
        `;
        
        // Add Event Listeners for the buttons inside the card
        const infoBtn = card.querySelector('.info-btn');
        infoBtn.addEventListener('click', () => openModal(park));

        const saveBtn = card.querySelector('.save-btn');
        saveBtn.addEventListener('click', () => toggleFavorite(park.id, saveBtn));
        
        // Set initial button state based on Local Storage
        if (getFavorites().includes(park.id)) {
            saveBtn.textContent = 'Saved!';
            saveBtn.classList.replace('accent-action', 'secondary-action');
        }

        parksContainer.appendChild(card);
    });
}

function openModal(park) {
    modalTitle.textContent = park.name;
    modalLocation.textContent = park.location;
    modalEstablished.textContent = park.established;
    modalArea.textContent = park.area;
    modalDescription.textContent = park.description;
    
    modal.showModal();
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

// Close modal when clicking outside of it
if (modal) {
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    });
}

// --- Local Storage Functions ---
function getFavorites() {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
}

function toggleFavorite(id, button) {
    let favorites = getFavorites();
    
    if (favorites.includes(id)) {
        // Remove it (using filter)
        favorites = favorites.filter(favId => favId !== id);
        button.textContent = 'Save to Favorites';
        button.classList.replace('secondary-action', 'accent-action');
    } else {
        // Add it
        favorites.push(id);
        button.textContent = 'Saved!';
        button.classList.replace('accent-action', 'secondary-action');
    }
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Initialize
fetchParks();
