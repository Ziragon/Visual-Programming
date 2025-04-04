import React from 'react';

function SearchAndSort( {searchTerm, setSearchTerm, sortOption, setSortOption} )
{
  return (
    <div className="search_and_sort">
      <input
        type="text"
        placeholder="Поиск по body"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="title">title</option>
        <option value="id">id</option>
      </select>
    </div>
  );
};

export default SearchAndSort;