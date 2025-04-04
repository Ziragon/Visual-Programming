import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import CityModal from './components/CityModal/CityModal';
import WeatherNow from './components/WeatherNow/WeatherNow'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState({
    name: 'Москва, RU',
    coords: { lat: '55.75', lon: '37.62' }
  });
  const [weatherClass, setWeatherClass] = useState('weather-clear');

  const getWeatherClass = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return 'weather-thunderstorm';
    if (weatherId >= 300 && weatherId < 400) return 'weather-rain';
    if (weatherId >= 500 && weatherId < 600) return 'weather-rain';
    if (weatherId >= 600 && weatherId < 700) return 'weather-snow';
    if (weatherId >= 700 && weatherId < 800) return 'weather-fog';
    if (weatherId === 800) return 'weather-clear';
    if (weatherId > 800) return 'weather-clouds';
    return 'weather-clear';
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0c14a38c5b8d79e583c683a113346eb1&units=metric&lang=ru`
      );
      setForecastData(response.data);
      
      const responseweather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c14a38c5b8d79e583c683a113346eb1&units=metric&lang=ru`
      );
      setWeatherData(responseweather.data);
      
      // Устанавливаем класс для фона
      setWeatherClass(getWeatherClass(responseweather.data.weather[0].id));
    } catch (error) {
      console.error("Ошибка при загрузке погоды:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city.coords.lat, city.coords.lon);
  }, [city]);

  const handleCitySelect = (newCity) => {
    setCity({
      name: newCity.name,
      coords: { lat: newCity.lat.toString(), lon: newCity.lon.toString() }
    });
  };

  if (loading && !forecastData) {
    return <div>Загрузка данных о погоде...</div>;
  }

  return (
    <div>
      <WeatherNow 
        weatherData={weatherData} 
        cityName={city.name}
        onChangeCity={() => setModalOpen(true)}
        weatherClass={weatherClass}
      />

      <WeatherForecast 
        forecastData={forecastData} 
        cityName={city.name}
        onChangeCity={() => setModalOpen(true)}
      />
      
      <CityModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        onCitySelect={handleCitySelect}
      />
    </div>
  );
}

export default App;