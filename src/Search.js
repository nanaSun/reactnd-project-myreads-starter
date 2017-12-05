import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from  'sort-by'
import {Link} from 'react-router-dom'

class SearchComponent extends React.Component {
  state={
    query:""
  }
  updateQuery=(query)=>{
    this.setState({query:query.trim()})   
    if(this.state.query!=='')
      this.props.queryBooks(this.state.query)
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent
