import React from 'react';
import DataSet from './components/DataSet';
import './App.css'

const App = () => {

  const headers = "🍎🍌🍇 Fruits";
  
  const data = [
    "🍎 Apple",
    "🍊 Orange",
    "🍌 Banana",
  ]

  return (
    <div>
      <DataSet 
        headers={headers}
        children={data}
        renderHeader={(headers) => headers}
        renderChildren={(value) => value}
      />
    </div>
  );
};

export default App;