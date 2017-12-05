import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import Search from './Search';
import Books from './Books';
import './App.css'

class BooksApp extends React.Component {
  state={
    books:[],
    searchBooks:[]
  }
  componentWillMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
      console.log(this.state)
    }) 
  }
  queryBooks(query){
    BooksAPI.search(query,20).then((books)=>{
      this.setState({searchBooks:books})
    }) 
  }
  render() {
    return (
    <div className="app">
      <Route path="/search" exact render={()=>(
        <Search queryBooks={this.queryBooks} searchBooks={this.state.searchBooks}/>
        )}
      />
      <Route path="/" exact render={()=>(
        <Books books={this.state.books}/>
        )}
      />
    </div>
    )
  }
}

export default BooksApp
