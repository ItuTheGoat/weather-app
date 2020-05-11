import React, { useState } from "react";

// API Key and base url which I use to call from OpenWeatherMap
const api = {
  key: "29775669c076456b10bd6dcd389ed448",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  // These are the query and result variables that I use to interact with the API
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  // Search function, uses the above query and result variables
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  // variables to hold the date information which will be the current system date
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  // The function to set the apps background
  function appClassname() {
    let result = "app";
    if (typeof weather.main != "undefined") {
      switch (weather.weather[0].main) {
        case "Thunderstorm":
          result = "app thunder";
          break;
        case "Drizzle":
          result = "app drizzle";
          break;
        case "Clouds":
          result = "app cloudy";
          break;
        case "Rain":
          result = "app rainy";
          break;
        case "Clear":
          result = "app clear";
          break;
        case "Tornado":
          result = "app tornado";
          break;
        case "Mist":
          result = "app misty";
          break;
        case "Fog":
          result = "app misty";
          break;
        case "Tornado":
          result = "app tornado";
          break;
        case "Snowy":
          result = "app snowy";
          break;
        default:
          result = "app";
      }
    } else {
      result = "app";
    }
    return result;
  }

  return (
    // This div calls the function that sets the background
    <div className={appClassname()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
