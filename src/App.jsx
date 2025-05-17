import { useState, useEffect } from "react";
import "./App.css";


function App() {
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  // State for the search input field
  const [searchInput, setSearchInput] = useState("");
  // State to store forecast data (initialize as empty array)
  const [forecast, setForecast] = useState([]);
  // State to store weather data, initially null
  const [weatherData, setWeatherData] = useState(null);
  // State to store the current city, default is Nairobi
  const [city, setCity] = useState("Nairobi");
  // State for error and loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch weather data whenever city or apiKey changes
  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try {
        setLoading(true);
        setError(null);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);

        const foreCastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const foreCastData = await foreCastResponse.json();

        // Defensive: check if list exists before filtering
        const dailyForecast = foreCastData.list
          ? foreCastData.list.filter((item, index) => index % 8 === 0)
          : [];
        setForecast(dailyForecast);
      } catch (error) {
        setError("Failed to fetch weather data.");
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData(city);
  }, [city, apiKey]);

  // Handle form submission for searching a city
  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      setCity(searchInput);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      {/* Search input form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {/* Main wrapper for the weather app */}
      <div className="wrapper">
        {/* Weather display */}
        {weatherData && weatherData.main && weatherData.weather && (
          <>
            <div className="header">
              {/* Display city name */}
              <h1 className="city">{weatherData.name}</h1>
              {/* Display temperature */}
              <p className="temperature">
                {Math.round(weatherData.main.temp)}°c
              </p>
              {/* Display weather condition */}
              <p className="condition">{weatherData.weather[0].main}</p>
            </div>

            {/* Weather details section */}
            <div className="weather-details">
              <div>
                <p>Humidity</p>
                <p style={{ fontWeight: "bold" }}>
                  {Math.round(weatherData.main.humidity)}%
                </p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p style={{ fontWeight: "bold" }}>
                  {weatherData.wind
                    ? Math.round(weatherData.wind.speed)
                    : "N/A"}{" "}
                  kph
                </p>
              </div>
            </div>
          </>
        )}

        {/* Forecast section */}
        {forecast && forecast.length > 0 && (
          <div className="forecast">
            <h2 className="forecast-header">5-day weather forecast</h2>
            <div className="forecast-days">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.main.temp)}°c</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer section */}
        <div className="footer">
          <p>Weather App</p>
          <p>© 2025</p>
          <p>Developed by 0jij0</p>
        </div>
      </div>
    </>
  );
}

export default App;
