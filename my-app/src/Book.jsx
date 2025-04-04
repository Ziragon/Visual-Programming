import React from 'react'

function Book({...props}) {
    if(!props.books || props.books.length === 0) {
        return <p>Загрузка...</p>
    }
    return (
        <div className='book_pattern'>
            {props.books.map((book,id) => (
                <div key={id} className='pattern'>
                    <img src={book.coverImage} alt={book.title}/>
                    <p className='text_header'>{book.title}</p>
                    <p className='text_authors'>{book.authors.join(', ')}</p>
                </div>
            ))}
        </div>
    );
}

export default Book;