import { useEffect, useState } from "react";

import Drop from "../drop/drop";
import "./weatherAPI.scss";

const WeatherAPI = (props) => {
  let { coords } = props;
  let { cityFromInput } = props;

  const [classes, setClasses] = useState("hidden");

  const [fullLocationInfo, setFullLocationInfo] = useState();
  const [fullCurrentInfo, setFullCurrentInfo] = useState();
  const [fullForecastInfo, setFullForecastInfo] = useState();

  const [temperature, setTemperature] = useState();
  const [icon, setIcon] = useState();
  const [city, setCity] = useState();
  const [iconExplaining, setIconExplaining] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [currentParsedTimeInSpecificCity, setCurrentParsedTimeInSpecificCity] =
    useState();
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [forecastForThreeDays, setForecastForThreeDays] = useState([]);
  const [sunriseSunset, setSunriseSunset] = useState();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e4986dddd6msh8569c658d0e09ffp13430ejsnefac55440e8f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
    if (coords || cityFromInput) {
      fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coords}&days=5`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const { location } = response;
          const { current } = response;
          const { forecast } = response;
          setFullLocationInfo(location);
          setFullCurrentInfo(current);
          setFullForecastInfo(forecast.forecast);
          setTemperature(current.temp_c);
          setIcon(current.condition.icon);
          setCity(location.name);
          setIconExplaining(current.condition.text);
          setFeelsLike(current.feelslike_c);
          const date = new Date(location.localtime);
          const weekdays = [
            "Sun,",
            "Mon,",
            "Tues,",
            "Wed,",
            "Thurs,",
            "Fri,",
            "Sat,",
          ];
          const day = weekdays[date.getDay()];
          const time = date.toLocaleTimeString().slice(0, 5);
          setCurrentDate(`${day} ${time}`);
          setCurrentParsedTimeInSpecificCity(Date.parse(location.localtime));
          const forecastForToday = [
            ...forecast.forecastday[0].hour,
            ...forecast.forecastday[1].hour.slice(0, 13),
          ];
          setTodaysForecast(forecastForToday);
          setForecastForThreeDays(forecast.forecastday);
          setSunriseSunset(forecast.forecastday[0].astro);
          setClasses("");
        })
        .catch((error) => console.log(error));
    }
  }, [coords]);

  useEffect(() => {
    if (cityFromInput) {
      fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityFromInput}&days=5`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const { location } = response;
          const { current } = response;
          const { forecast } = response;
          setFullLocationInfo(location);
          setFullCurrentInfo(current);
          setFullForecastInfo(forecast.forecast);
          setTemperature(current.temp_c);
          setIcon(current.condition.icon);
          setCity(location.name);
          setIconExplaining(current.condition.text);
          setFeelsLike(current.feelslike_c);
          const date = new Date(location.localtime);
          const weekdays = [
            "Sun,",
            "Mon,",
            "Tues,",
            "Wed,",
            "Thurs,",
            "Fri,",
            "Sat,",
          ];
          const day = weekdays[date.getDay()];
          const time = date.toLocaleTimeString().slice(0, 5);
          setCurrentDate(`${day} ${time}`);
          setCurrentParsedTimeInSpecificCity(Date.parse(location.localtime));
          const forecastForToday = [
            ...forecast.forecastday[0].hour,
            ...forecast.forecastday[1].hour.slice(0, 13),
          ];
          setTodaysForecast(forecastForToday);
          setForecastForThreeDays(forecast.forecastday);
          setSunriseSunset(forecast.forecastday[0].astro);
          setClasses("");
        })
        .catch((error) => console.log(error));
    }
  }, [cityFromInput]);

  return (
    <div className={`forecast-container ${classes}`}>
      <div className="main-information">
        <div className="temperature-container">
          <div className="temperature">{`${temperature}°`}</div>
          <div className="city">{city}</div>

          <p className="feels-like">{`Feels like ${feelsLike}°`}</p>
          <p className="current-date">{currentDate}</p>
        </div>
        <div className="weather-icon-container">
          <img className="weather-icon" src={`${icon}`} alt="" />
          <p className="weather-icon-explaining">{iconExplaining}</p>
        </div>
      </div>
      <div className="detailed-forecast-for-today">
        <div className="detailded-forecat-for-today-inner">
          {todaysForecast.map((hour, idx) => {
            if (currentParsedTimeInSpecificCity < Date.parse(hour.time)) {
              return (
                <div className="forecast-for-specific-hour" key={idx}>
                  <div className="specific-hour-hour">
                    {hour.time.slice(-5)}
                  </div>
                  <div>
                    <img
                      src={hour.condition.icon}
                      className="specific-hour-icon"
                    />
                  </div>
                  <div>{`${hour.temp_c}°`}</div>
                  <div className="specific-hour-rain-chance">
                    <Drop percent={hour.chance_of_rain} size={11} />
                    <div className="specific-hour-percent">{`${hour.chance_of_rain}%`}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="forecast-for-few-days">
        {forecastForThreeDays.map((day) => {
          const date = new Date(day.date);
          const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const curDay = weekdays[date.getDay()];

          return (
            <div className="forecast-for-day" key={day.date}>
              <div className="weekday">
                {date.getDay() == new Date().getDay() ? "Today" : curDay}
              </div>
              <div className="chance-of-rain">
                <Drop className="drop" size={13} />
                <div className="forecast-chance-of-rain">
                  {day.day.daily_chance_of_rain}%
                </div>
              </div>

              <div className="forecast-icon-container">
                <img
                  className="forecast-icon"
                  src={`${day.day.condition.icon}`}
                />
              </div>
              <div className="minmax-temp_c-container">
                <div className="minmax-temp_c">
                  <p className="minmax-min-max">Min:</p>
                  <p>{day.day.mintemp_c}°</p>
                </div>
                <div className="minmax-temp_c">
                  <p className="minmax-min-max">Max:</p>
                  <p>{day.day.maxtemp_c}°</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {sunriseSunset != null && (
        <div className="sunrise-sunset">
          <div className="sunrise">
            <div className="sunrise-text">
              <p className="sunrise-title">Sunrise</p>
              <p className="sunrise-time">{sunriseSunset.sunrise}</p>
            </div>
            <div className="sunrise-pic-container">
              <img className="sunrise-pic" src="../src/images/sunrise.png" />
            </div>
          </div>
          <div className="sunset">
            <div className="sunset-text">
              <p className="sunset-title">Sunset</p>
              <p className="sunset-time">{sunriseSunset.sunset}</p>
            </div>
            <div className="sunset-pic-container">
              <img className="sunset-pic" src="../src/images/sunset.png" />
            </div>
          </div>
        </div>
      )}
      <div className="additional-info">
        <div className="information">
          <img src="../src/images/uv.png" className="information-icon" />
          <div className="information-text">
            <p className="information-title">UV index</p>
            {(() => {
              if (fullCurrentInfo != null) {
                const { uv } = fullCurrentInfo;
                if (0 <= uv <= 2) {
                  return <p>Low</p>;
                } else if (3 <= uv <= 5) {
                  return <p>Moderate</p>;
                } else if (6 <= uv <= 7) {
                  return <p>High</p>;
                } else if (8 <= uv <= 10) {
                  return <p>Very high</p>;
                } else if (uv >= 11) {
                  return <p>Extreme</p>;
                }
              }
            })()}
          </div>
        </div>
        <div className="line"></div>
        <div className="information">
          <img src="../src/images/humidity.png" className="information-icon" />
          <div className="information-text">
            <p className="information-title">Humidity</p>
            {(() => {
              if (fullCurrentInfo != null) {
                return `${fullCurrentInfo.humidity}%`;
              }
            })()}
          </div>
        </div>
        <div className="line"></div>
        <div className="information">
          <img src="../src/images/wind.png" className="information-icon" />
          <div className="information-text">
            <p className="information-title">Wind</p>
            {(() => {
              if (fullCurrentInfo != null) {
                return `${fullCurrentInfo.wind_kph} km/h`;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAPI;
