# 🌤️ Weather Dashboard

A beautiful, real-time weather dashboard that fetches data from the OpenWeatherMap API.

## Features

✅ **Current Weather Display** - Real-time temperature, humidity, wind speed, and more
✅ **5-Day Forecast** - Plan ahead with weather predictions
✅ **City Search** - Search any city worldwide
✅ **Geolocation** - Use your current location
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Beautiful UI** - Modern glassmorphism design with smooth animations
✅ **Weather Icons** - Emoji-based weather indicators

## Live Demo

Deployed on Vercel: [Your Vercel URL]

## Setup Instructions

### 1. Get an API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Add Your API Key
Open `app.js` and replace:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```
With your actual API key.

### 3. Deploy on Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option B: Using GitHub Integration
1. Push this branch to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "Add New" → "Project"
4. Select your GitHub repository
5. Click "Deploy"

#### Option C: Manual Upload
1. Go to [Vercel](https://vercel.com/import)
2. Import your GitHub repository
3. Set environment variables if needed
4. Deploy

## File Structure

```
.
├── index.html      # HTML structure
├── styles.css      # Styling with glassmorphism
├── app.js          # Weather API logic
├── vercel.json     # Vercel configuration
├── package.json    # Project metadata
└── README.md       # This file
```

## Weather Information Displayed

- **Current Temperature** - In Celsius
- **Feels Like** - Wind chill adjustment
- **Humidity** - Percentage
- **Wind Speed** - Meters per second
- **Pressure** - Hectopascals
- **Cloud Cover** - Percentage
- **Visibility** - Kilometers
- **5-Day Forecast** - Daily forecasts with icons and temperatures

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: OpenWeatherMap REST API
- **Hosting**: Vercel
- **Design**: Glassmorphism with CSS gradients and backdrop filters

## API Reference

Endpoints used:
- `GET /weather` - Current weather by city or coordinates
- `GET /forecast` - 5-day weather forecast

## Browser Support

✅ Chrome
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile browsers

## License

MIT License - Feel free to use this project for your own purposes.

## Support

For issues or questions, please check:
- [OpenWeatherMap Documentation](https://openweathermap.org/api)
- [Vercel Documentation](https://vercel.com/docs)
- GitHub Issues

---

Made with ❤️ by mrGeoege