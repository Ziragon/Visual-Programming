import React from 'react';
import DataSet from './components/DataSet';
import './App.css'

const App = () => {
  const data = [
    { id: 1, name: 'Evgeniy Krivenyshev', age: 20, height: 185},
    { id: 2, name: 'John Wick', age: 32, height: 178 },
    { id: 3, name: 'Daniil Malcev', age: 19, height: 181 },
    { id: 4, name: 'Nikita Shushakov', age: 20, height: 130},
    { id: 5, name: 'Oleg Dobrynin', age: 21, height: 187 },
    { id: 6, name: 'Denis Litvinenko', age: 18, height: 150 },
  ];

  const headers = [
    { key: 'name', title: 'Full Name' },
    { key: 'age', title: 'Age' },
    { key: 'height', title: 'Height' }
  ];

  return (
    <div>
      <DataSet
        data={data}
        renderCell={(item) => item}
        renderHeader={(header) => header.title}
        />
    </div>
  );
};

export default App;