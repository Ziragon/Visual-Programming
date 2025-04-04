import React, { useState, useEffect } from 'react';
import ProgressBar from './components/progressBar/progressBar'
import './App.css'

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);

  const fetchData = (async () => {
    const response = await fetch('https://fakeapi.extendsclass.com/countries');
    if(!response.ok){
      throw new Error("debil");
    }
    const data = await response.json();
    setCountries(data);
  })

  useEffect(() => {
    if (isCancelled) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          fetchData();
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isCancelled]);

  const handleCancel = () => {
    setIsCancelled(true);
    console.log('Cancelled');
  };

  return (
    <div className='App'>   
      {isLoading && !isCancelled ? (
        <ProgressBar 
          title="Загрузка..." 
          progress={progress} 
          onCancel={handleCancel} 
        />
      ) : isCancelled ? (
        <div className='App'>
          <p className='text'>Загрузка отменена</p>
        </div>
      ) : (
        <div className='App'>
          {countries.map((obj,id) => (
              <div key={id}>
                  <p>{id} - {obj.name} - {obj.admissionDateUnitedNations}</p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;