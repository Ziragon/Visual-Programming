import React from 'react';

function SearchAndSort( {searchTerm, setSearchTerm, sortOption, setSortOption, sortDirection, setSortDirection } )
{
  return (
    <div className="search_and_sort">
      <input
        type="text"
        placeholder="Поиск по названию или автору"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="title">Название</option>
        <option value="author">Автор</option>
      </select>
      <p className="text_p">Обратная сортировка:</p>
      <input
        type="checkbox"
        checked={sortDirection}
        onChange={(e) => setSortDirection(e.target.checked)}></input>
    </div>
  );
};

export default SearchAndSort;