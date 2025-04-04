import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import classes from './WeatherNow.module.css'

const WeatherForecast = ({ weatherData, cityName, onChangeCity, weatherClass }) => {
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  console.log(weatherData);

  if (!weatherData) {
    return <div>Данные о погоде загружаются...</div>;
  }

  return (
      <div className={`app-container ${weatherClass}`}>
      <div className={classes.block_header}>
        <h2 className={classes.text}>Прогноз погоды для {cityName}</h2>
        <div className={classes.button}>
        <CustomButton 
          variant="primary" 
          size="small"
          onClick={onChangeCity}
        >
          Изменить город
        </CustomButton>
        </div>
      </div>
      
      <div className={classes.weather_now}>
        <div>
            <p className={classes.text}><b>{formatDateTime(weatherData.dt)}</b></p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt={weatherData.weather[0].description}
              className={classes.img}
            />
        </div>
        <div>
            <p className={classes.text_p1}>
                {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
            </p>
            <p className={classes.text_p2}>Температура: {Math.round(weatherData.main.temp)}°C</p>
            <p className={classes.text_p3}>Ощущается как: {Math.round(weatherData.main.feels_like)}°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;