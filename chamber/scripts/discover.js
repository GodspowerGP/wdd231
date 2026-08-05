import { places } from '../data/places.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate the 8 cards
    const galleryContainer = document.getElementById('gallery-container');
    
    if (galleryContainer) {
        places.forEach(place => {
            const card = document.createElement('div');
            card.classList.add('gallery-card');

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button>Learn More</button>
            `;

            galleryContainer.appendChild(card);
        });
    }

    // 2. Handle localStorage for visit tracking
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisitKey = 'discover-last-visit';
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem(lastVisitKey);
    const msToDays = 86400000; // 1000 ms * 60 s * 60 m * 24 h

    if (visitorMessage) {
        if (!lastVisit) {
            visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysBetween = (currentVisit - parseInt(lastVisit)) / msToDays;
            
            if (daysBetween < 1) {
                visitorMessage.textContent = "Back so soon! Awesome!";
            } else {
                const wholeDays = Math.floor(daysBetween);
                const dayString = wholeDays === 1 ? "day" : "days";
                visitorMessage.textContent = `You last visited ${wholeDays} ${dayString} ago.`;
            }
        }
        
        // Update the last visit to now
        localStorage.setItem(lastVisitKey, currentVisit.toString());
    }
});
