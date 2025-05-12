import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h1 className="city">Nairobi</h1>
          <p className="temperature"></p>
          <p className="condition"></p>
        </div>

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
      <div className="footer">
        <p>Weather App</p>
        <p>© 2025</p>
        <p>Developed by 0jij0</p>
        </div>
    </>
  );
  }


export default App;
