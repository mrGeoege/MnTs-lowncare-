// OpenWeatherMap API Key (free tier)
const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherContainer = document.getElementById('weatherContainer');
const forecastContainer = document.getElementById('forecastContainer');

// Weather Icons Mapping
const weatherIcons = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '🌤️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
};

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        loading.style.display = 'block';
        error.style.display = 'none';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (err) => {
                showError('Unable to get your location. Please check permissions.');
                loading.style.display = 'none';
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
});

// Fetch weather by city name
async function fetchWeather(city) {
    loading.style.display = 'block';
    error.style.display = 'none';

    try {
        if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
            showError('Please set your OpenWeatherMap API key in app.js');
            loading.style.display = 'none';
            return;
        }

        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                showError('City not found. Please check the spelling.');
            } else {
                showError('Unable to fetch weather data. Please try again.');
            }
            loading.style.display = 'none';
            return;
        }

        const data = await response.json();
        displayWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
        showError('An error occurred. Please try again later.');
        console.error(err);
    } finally {
        loading.style.display = 'none';
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
            showError('Please set your OpenWeatherMap API key in app.js');
            loading.style.display = 'none';
            return;
        }

        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();
        displayWeather(data);
        fetchForecast(lat, lon);
    } catch (err) {
        showError('An error occurred. Please try again later.');
        console.error(err);
    } finally {
        loading.style.display = 'none';
    }
}

// Fetch 5-day forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();
        displayForecast(data.list);
    } catch (err) {
        console.error('Error fetching forecast:', err);
    }
}

// Display current weather
function displayWeather(data) {
    const { name, main, weather, wind, clouds, visibility, sys } = data;
    const iconCode = weather[0].icon;
    const weatherIcon = weatherIcons[iconCode] || '🌡️';

    document.getElementById('cityName').textContent = `${name}, ${data.sys.country}`;
    document.getElementById('description').textContent =
        weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    document.getElementById('temperature').textContent = `${Math.round(main.temp)}°C`;
    document.getElementById('weatherIcon').textContent = weatherIcon;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('uvIndex').textContent = `${clouds.all}%`; // Using clouds as proxy
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
}

// Display 5-day forecast
function displayForecast(forecastList) {
    // Get one forecast per day (every 8th item = 24 hours)
    const dailyForecasts = forecastList.filter((_, index) => index % 8 === 0).slice(0, 5);

    forecastContainer.innerHTML = dailyForecasts.map((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconCode = forecast.weather[0].icon;
        const weatherIcon = weatherIcons[iconCode] || '🌡️';

        return `
            <div class="forecast-card">
                <div class="date">${dayName}</div>
                <div class="icon">${weatherIcon}</div>
                <div class="temp">${Math.round(forecast.main.temp)}°C</div>
                <div class="desc">${forecast.weather[0].main}</div>
            </div>
        `;
    }).join('');
}

// Show error message
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
}

// Load default city on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});