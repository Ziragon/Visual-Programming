import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CustomButton from '../CustomButton/CustomButton';
import classes from './CityModal.module.css'

const CityModal = ({ isOpen, onClose, onCitySelect }) => {
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Обработчик клика вне модального окна
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Обработчик нажатия клавиши Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = async () => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=0c14a38c5b8d79e583c683a113346eb1`
      );
      
      if (response.data.length > 0) {
        const { lat, lon, name, country } = response.data[0];
        onCitySelect({ lat, lon, name: `${name}, ${country}` });
        onClose();
      } else {
        setError('Город не найден');
      }
    } catch (err) {
      setError('Ошибка при поиске города');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={classes.modal_window}
      onClick={onClose} // Закрытие при клике на оверлей
    >
      <div 
        ref={modalRef}
        className={classes.background}
        onClick={e => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модалки
      >
        <h3 style={{ marginTop: 0 }}>Выберите город</h3>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Введите название города"
          className={classes.text}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Поиск по Enter
        />
        
        {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
        
        <div className={classes.button}>
          <CustomButton 
            variant="default" 
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </CustomButton>
          <CustomButton 
            variant="primary" 
            onClick={handleSearch} 
            disabled={loading}
          >
            {loading ? 'Поиск...' : 'Применить'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CityModal;