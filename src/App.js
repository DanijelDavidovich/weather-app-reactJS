import summer from "./assets/summer.jpg";
import winter from "./assets/winter.jpg";
import Description from "./components/Description";
import { useEffect, useState } from "react";
import getFormatedWeatherData from "./weatherService";

import "./App.css";

function App() {
  const [city, setCity] = useState("Belgrade");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(summer);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatedWeatherData(city, units);
      setWeather(data);
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(winter);
      else setBg(summer);
    };
    // const fetchFlag = async () => {
    //   const flag = await getFlag(weather.country);
    //   console.log(flag);
    // };
    // fetchFlag();
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
    console.log(button.innerText);
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter city..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <div className="country-container">
                  <h3>{`${weather.name}`}</h3>
                  <img
                    className="flag"
                    src={`https://flagcdn.com/${weather.country.toLowerCase()}.svg`}
                  />
                </div>

                <img src={weather.iconURL} alt="weather-icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

//comments aaa
