import "./App.css";
import { useState } from "react";
import { Weather_Api_Key, Weather_Api_Url } from "./api";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/Forecast";
import logo from "./Asset/Logo.png";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${Weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`
    );
    const forecastFeth = fetch(
      `${Weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFeth])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <img className="topRight" src={logo} alt="icon" />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
