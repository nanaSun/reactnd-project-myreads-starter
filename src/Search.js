import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book';
class SearchComponent extends React.Component {
  static propTypes={
    searchBooks:PropTypes.array.isRequired,
    onChangeShelf:PropTypes.func.isRequired
  }
  state={
    query:"",
    isSearching:false
  }
  updateQuery=(query)=>{
    if(query!==''){
       this.setState({
          query:query.trim(),
          isSearching:true
       })
       this.props.queryBooks(this.state.query,()=>{
          this.setState({
            isSearching:false
          })
       })
    }
  }
  render() {
    const { isSearching } = this.state
    const { onChangeShelf , searchBooks } =this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {isSearching?'searching...':searchBooks.length===0?'no result':searchBooks.map((book) => (
                <Book book={book}  key={book.id} onChangeShelf={onChangeShelf}/>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent
