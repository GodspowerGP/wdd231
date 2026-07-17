// ==========================================
//  Abuja Chamber of Commerce - Home Page JS
// ==========================================

// --- Navigation Toggle ---
const menuBtn = document.querySelector('#menu');
const navList = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navList.classList.toggle('open');
});

// --- Footer Dates ---
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ==========================================
//  Weather Section
// ==========================================
const API_KEY = '38e031060e2ecd1bd9ed8de60cbc2f6c';
const LAT = 9.0765;
const LON = 7.3986;
const UNITS = 'imperial'; // Fahrenheit

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`;

// Mock fallback data for Abuja if API is unavailable
const MOCK_WEATHER = {
    current: { temp: 89, description: 'Partly Cloudy', humidity: 72 },
    forecast: [
        { label: 'Tomorrow', temp: 91 },
        { label: 'Day 2', temp: 88 },
        { label: 'Day 3', temp: 86 },
    ]
};

function displayCurrentWeather(temp, description, humidity) {
    document.getElementById('weather-temp').textContent = `${Math.round(temp)}°F`;
    document.getElementById('weather-desc').textContent = capitalizeWords(description);
    document.getElementById('weather-humidity').textContent = `Humidity: ${humidity}%`;
}

function displayForecast(forecastDays) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';
    forecastDays.forEach(day => {
        const card = document.createElement('div');
        card.classList.add('forecast-day');
        card.innerHTML = `
            <span class="forecast-label">${day.label}</span>
            <span class="forecast-temp">${Math.round(day.temp)}°F</span>
        `;
        container.appendChild(card);
    });
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function getDayLabel(dateStr, index) {
    // index 0 = tomorrow, 1 = day after, etc.
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr);
    return days[date.getDay()];
}

async function fetchWeather() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(CURRENT_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error(`API error: ${currentRes.status}`);
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        // Current weather
        const temp = currentData.main.temp;
        const description = currentData.weather[0].description;
        const humidity = currentData.main.humidity;
        displayCurrentWeather(temp, description, humidity);

        // Extract ~noon forecasts for the next 3 days
        const today = new Date().toISOString().split('T')[0];
        const forecastList = forecastData.list;
        const seen = new Set();
        const nextDays = [];

        for (const entry of forecastList) {
            const entryDate = entry.dt_txt.split(' ')[0];
            if (entryDate === today) continue; // Skip today
            if (!seen.has(entryDate)) {
                seen.add(entryDate);
                nextDays.push({
                    label: getDayLabel(entryDate),
                    temp: entry.main.temp
                });
                if (nextDays.length === 3) break;
            }
        }

        displayForecast(nextDays);

    } catch (error) {
        console.warn('Weather API unavailable, using mock data.', error);
        // Fallback to mock data
        displayCurrentWeather(
            MOCK_WEATHER.current.temp,
            MOCK_WEATHER.current.description,
            MOCK_WEATHER.current.humidity
        );
        displayForecast(MOCK_WEATHER.forecast);
    }
}

// ==========================================
//  Spotlight Section
// ==========================================
const MEMBERS_URL = 'data/members.json';
const LEVEL_NAMES = { 1: 'Bronze', 2: 'Silver', 3: 'Gold' };

async function fetchSpotlights() {
    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) throw new Error('Failed to fetch members');

        const members = await response.json();

        // Filter to gold (3) and silver (2) members only
        const eligible = members.filter(m => m.membershipLevel >= 2);

        // Shuffle and pick 2 or 3
        const shuffled = eligible.sort(() => Math.random() - 0.5);
        const count = Math.random() < 0.5 ? 2 : 3;
        const selected = shuffled.slice(0, Math.min(count, shuffled.length));

        displaySpotlights(selected);
    } catch (error) {
        console.error('Error fetching spotlight members:', error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = '';

    members.forEach(member => {
        const level = LEVEL_NAMES[member.membershipLevel] || 'Member';
        const card = document.createElement('article');
        card.classList.add('spotlight-card', `level-${level.toLowerCase()}`);

        card.innerHTML = `
            <div class="spotlight-badge">${level}</div>
            <img src="images/${member.image}" alt="Logo for ${member.name}" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p class="spotlight-phone">${member.phone}</p>
            <p class="spotlight-address">${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="spotlight-link">Visit Website</a>
        `;

        container.appendChild(card);
    });
}

// ==========================================
//  Initialize
// ==========================================
fetchWeather();
fetchSpotlights();
