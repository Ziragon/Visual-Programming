import './App.css';
import React, { useEffect, useState } from 'react';
import ObjOut from './ObjOut';
import SearchAndSort from './SortAndSearch';

function App() {
  const [objs, setObjs] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');

  useEffect(() => {
    const fetchObjs = async() => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json();
      const objs = await Promise.all(data.map(async (obj) => {
        return {...obj};
      }));
      setObjs(objs);
    }

    fetchObjs();
  }, [])

  const filteredObjs = objs
    .filter(obj => obj.body.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b) => {
      let comparison = 0;
      if (sortOption === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison = a.id === b.id;
      }
      return comparison;
    })
  
  return ( 
    <div className = 'App' >
      <SearchAndSort 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <ObjOut objs = { filteredObjs }/>
    </div>
  );
}

export default App;