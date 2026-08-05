const PARKS_URL = 'data/parks.json';
const favoritesContainer = document.getElementById('favorites-container');
const FAVORITES_KEY = 'np-favorites';

async function loadFavorites() {
    try {
        const response = await fetch(PARKS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allParks = await response.json();
        
        const savedIds = getFavorites();
        
        // Use filter to only get saved parks
        const favoriteParks = allParks.filter(park => savedIds.includes(park.id));
        
        displayFavorites(favoriteParks);
        
    } catch (error) {
        console.error("Could not load favorites:", error);
        if (favoritesContainer) {
            favoritesContainer.innerHTML = '<p>Error loading saved parks.</p>';
        }
    }
}

function getFavorites() {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
}

function displayFavorites(parks) {
    if (!favoritesContainer) return;
    
    favoritesContainer.innerHTML = '';
    
    if (parks.length === 0) {
        favoritesContainer.innerHTML = '<p>You have not saved any parks yet. Head over to the Discover page to add some!</p>';
        return;
    }

    // Reuse CSS grid from base.css
    favoritesContainer.style.display = 'grid';
    favoritesContainer.style.gap = '1.5rem';
    // Let CSS handle the multi-column if needed, or we can add an ID that inherits from base/large
    // For simplicity we will add a class that mimics #parks-container
    favoritesContainer.classList.add('parks-grid');

    parks.forEach(park => {
        const card = document.createElement('div');
        card.classList.add('park-card');

        card.innerHTML = `
            <img src="${park.imageUrl}" alt="${park.name}" loading="lazy" width="400" height="300">
            <div class="park-card-content">
                <h3>${park.name}</h3>
                <p><strong>Location:</strong> ${park.location}</p>
                <p><strong>Established:</strong> ${park.established}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-secondary remove-btn" data-id="${park.id}">Remove from Favorites</button>
            </div>
        `;
        
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeFavorite(park.id);
            // Refresh display
            loadFavorites(); 
        });

        favoritesContainer.appendChild(card);
    });
}

function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Initialize
loadFavorites();
