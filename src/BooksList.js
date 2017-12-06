import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from './Book';
class BooksList extends React.Component {
  static propTypes={
    books:PropTypes.object.isRequired,
    shelf:PropTypes.object.isRequired,
    onChangeShelf:PropTypes.func.isRequired
  }
  render() {
    const { books,shelf,onChangeShelf } = this.props
    const currentlyReading=[]
    const read=[]
    const wantToRead=[]
    return (
    <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {shelf.currentlyReading.map((bookid) => (
                  <Book book={books[bookid]}  key={bookid} onChangeShelf={onChangeShelf}/>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.wantToRead.map((bookid) => (
                  <Book book={books[bookid]}  key={bookid} onChangeShelf={onChangeShelf}/>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.read.map((bookid) => (
                  <Book book={books[bookid]}  key={bookid} onChangeShelf={onChangeShelf}/>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
           <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList
