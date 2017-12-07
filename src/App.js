import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import Search from './Search';
import BooksList from './BooksList';
import './App.css'

class BooksApp extends React.Component {
  state={
    books:{},
    searchBooks:[],
    notification:"",
    shelf:{
      currentlyReading:[],
      read:[],
      wantToRead:[]
    }
  }
  componentWillMount(){
    //After get all books, classify your book to different shelves.
    BooksAPI.getAll().then((books)=>{
      let shelftmp=this.state.shelf,bookstmp={};
      books.forEach((b)=>{
        bookstmp[b.id]=b
        if(b.shelf==="currentlyReading"){
          shelftmp.currentlyReading.push(b.id)
        }else if(b.shelf==="read"){
          shelftmp.read.push(b.id)
        }else if(b.shelf==="wantToRead"){
          shelftmp.wantToRead.push(b.id)
        }
      })
      this.setState({
        books:bookstmp,
        shelf:shelftmp
      })
    }) 
  }
  changeShelf(book,shelf){
    this.setState({
        notification:''
    })
    BooksAPI.update(book,shelf).then((_shelf)=>{
      let tmpbook=this.state.books;
      book['shelf']=shelf
      tmpbook[book.id]=book
      this.setState({
        shelf:_shelf,
        books:tmpbook,
        notification:book.title+" has already moved into "+shelf+" shelf."
      })
    }) 
  }
  queryBooks(query,callback){
    BooksAPI.search(query,20).then((books)=>{
      try{
        books=books.map((book)=>{
          if(typeof this.state.books[book.id]==="undefined"){
            book['shelf']='none'
          }else{
            book['shelf']=this.state.books[book.id]['shelf']
          }
          return book
        })
        this.setState({
          searchBooks:books
        })
      }catch(e){
        this.setState({
          searchBooks:[]
        })
      }
      callback()
    }) 
  }
  render() {
    return (
    <div className="app">
      <Route path="/search" exact render={({history})=>(
        <Search
        searchBooks={this.state.searchBooks}
        queryBooks={(query,callback)=>{
          this.queryBooks(query,callback)
        }}
        onChangeShelf={(book,shelf)=>{
          this.changeShelf(book,shelf)
        }}
        />
        )}
      />
      <Route path="/" exact render={()=>(
        <BooksList 
        books={this.state.books} 
        shelf={this.state.shelf} 
        onChangeShelf={(book,shelf)=>{
          this.changeShelf(book,shelf)
        }}
        />
        )}
      />
      <div className={this.state.notification?'notification':'hide'}>{this.state.notification}</div>
    </div>
    )
  }
}

export default BooksApp
