import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import DataSet from './components/DataSet'
import AddElement from './components/AddElement'
import './App.css';

function App() {
  const data = [{
      "name": "Eugene",
      "age": 20,
      "email": "123@115221",
      "pet": [
      {
      "name": "Sonya",
      "age": 15,
      }
    ]
   },
  {"name": "Nikita",
      "age": 10,
      "email": "sagak@115221",
      "pet": [
      {
      "name": "Doggie",
      "age": 12,
      }
    ]
   }]

  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link to="/add">Add objects</Link></li>
            <li><Link to="/table">Table</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<div>Select a table from the sidebar</div>} />
            <Route path="/add" element={<AddElement data={data} type='datas'/>} />
            <Route path="/table" element={<DataSet data={data}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
