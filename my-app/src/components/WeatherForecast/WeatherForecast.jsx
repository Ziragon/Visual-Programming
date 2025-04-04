import React from 'react';
import classes from './WeatherForecast.module.css'

const WeatherForecast = ({ forecastData }) => {
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  if (!forecastData?.list) {
    return <div>Данные о погоде загружаются...</div>;
  }

  return (
      <div className={classes.main}>  
      <div className={classes.content}>
        {forecastData.list.map((item, index) => (
          <div key={index} className={classes.weather_card}>
            <p><b>{formatDateTime(item.dt)}</b></p>
            <p className={classes.text_p1}>
                {item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
            </p>
            <p className={classes.text_p2}>Температура: {Math.round(item.main.temp)}°C</p>
            <p className={classes.text_p3}>Ощущается как: {Math.round(item.main.feels_like)}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className={classes.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;