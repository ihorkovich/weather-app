import { useEffect, useState } from "react";

import "./weatherAPI.scss";

const WeatherAPI = (props) => {
  const { coords } = props;

  const [temperature, setTemperature] = useState();
  const [icon, setIcon] = useState();
  const [city, setCity] = useState();
  const [iconExplaining, setIconExplaining] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [todaysForecast, setTodaysForecast] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e4986dddd6msh8569c658d0e09ffp13430ejsnefac55440e8f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };
  useEffect(() => {
    if (coords) {
      fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coords[0]},${coords[1]}&days=3`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const { location } = response;
          const { current } = response;
          const { forecast } = response;
          console.log(response);
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

          const forecastForToday = forecast.forecastday[0].hour;
          setTodaysForecast(forecastForToday);
        })
        .catch((error) => console.log(error));
    }
  }, [coords]);

  return (
    <div className="forecast-container">
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
            return (
              <div className="forecast-for-specific-hour" key={idx}>
                <div className="specific-hour-hour">{hour.time.slice(-5)}</div>
                <div>
                  <img
                    src={hour.condition.icon}
                    className="specific-hour-icon"
                  />
                </div>
                <div>{`${hour.temp_c}°`}</div>
                <div className="specific-hour-rain-chance">
                  <div className="drop">
                    <svg viewBox="0 0 50 42">
                      <defs>
                        <linearGradient
                          id="grad1"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0.01"
                            stopColor="#ffffff"
                            stopOpacity={1}
                          />
                          <stop
                            offset="0.01"
                            stopColor="#0000ff"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        id="tear"
                        className="tear"
                        d="M15 6
                      Q 15 6, 25 18
                      A 12.8 12.8 0 1 1 5 18
                      Q 15 6 15 6z"
                        fill="url(#grad1)"
                      />
                    </svg>
                  </div>
                  <div className="specific-hour-percent">{`${hour.chance_of_rain}%`}</div>
                </div>
                {console.log(currentDate.slice(5, -3))}
                {console.log(hour.time.slice(11, -3))}
                {console.log(`CHANCE OF RAIN: ${hour.chance_of_rain}%`)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="forecast-for-few-days"></div>
      <div className="sunrise-sunset"></div>
      <div className="additional-information"></div>
    </div>
  );
};

export default WeatherAPI;
