import './App.css';
import React, { useEffect, useState } from 'react';
import altGif from './img/altGif.gif';
import Book from './Book';
import SearchAndSort from './SortAndSearch';

function App() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [sortDirection, setSortDirection] = useState(false);

  useEffect(() => {
    const fetchBooks = async() => {
      const response = await fetch('https://fakeapi.extendsclass.com/books')
      const data = await response.json();
      const booksWithCovers = await Promise.all(data.map(async (book) => {
        const coverImage = await fetchBookCover(book.isbn);
        return {...book, coverImage };
      }));
      setBooks(booksWithCovers);
    }

    const fetchBookCover = async(isbn) => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await response.json();
      return data.items && data.items.length > 0 ? data.items[0].volumeInfo.imageLinks?.thumbnail || altGif : altGif;
    }

    fetchBooks();
  }, [])

  const filteredBooks = books
    .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a,b) => {
      let comparison = 0;
      if (sortOption === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison = a.authors[0].localeCompare(b.authors[0]);
      }
      return sortDirection ? -comparison : comparison;
    })
  
  return ( 
    <div className = 'App' >
      <SearchAndSort 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection} 
      />
      <Book books = { filteredBooks }/>
    </div>
  );
}

export default App;