import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h1 className="city"></h1>
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
              <p className="day">Monday</p>
              <p className="temp">20°C</p>
              <p className="condition">Sunny</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
