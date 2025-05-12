import { useState, useEffect } from "react"; // Import useEffect for side effects
import "./App.css";
import.meta.env.VITE_WEATHER_KEY; // Import environment variable for API key

function App() {
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  // State to store weather data, initially null
  const [weatherData, setWeatherData] = useState(null);

  // State to store the current city, default is Nairobi
  const [city, setCity] = useState("Nairobi");

  // Fetch weather data whenever city or apiKey changes
  useEffect(() => {
    // Async function to fetch weather data from OpenWeatherMap API
    const fetchWeatherData = async (cityName) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url); // Fetch data from API
        const data = await response.json(); // Parse JSON response
        setWeatherData(data); // Update state with fetched data
        console.log(data); // Log the data for debugging
      } catch (error) {
        console.error("Error fetching weather data:", error); // Log errors
      }
    };

    fetchWeatherData(city); // Call the fetch function
  }, [city, apiKey]); // Dependency array: runs when city or apiKey changes

  return (
    <>
      {/* Main wrapper for the weather app */}
      <div className="wrapper">
        <div className="header">
          {/* Display city name */}
          <h1 className="city">Nairobi</h1>
          {/* Display temperature */}
          <p className="temperature">17</p>
          {/* Display weather condition */}
          <p className="condition">Cloudy</p>
        </div>

        {/* Weather details section */}
        <div className="weather-details">
          <div>
            <p>Humidity</p>
            <p>60%</p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p>10 km/h</p>
          </div>
        </div>

        {/* Forecast section */}
        <div className="forecast">
          <h2 className="forecast-header">5-day weather forecast</h2>
          <div className="forecast-days">
            <div className="forecast-day">
              <p>Monday</p>
              <p>20°C</p>
              <p>Sunny</p>
            </div>
            <div className="forecast-day">
              <p>Tuesday</p>
              <p>22°C</p>
              <p>Cloudy</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <div className="footer">
        <p>Weather App</p>
        <p>© 2025</p>
        <p>Developed by 0jij0</p>
      </div>
    </>
  );
}

export default App;
