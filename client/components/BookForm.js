import React, { Component } from 'react';
import axios from 'axios';
import store, { displayForm, addBook } from '../store';

export default class BookForm extends Component {

  constructor(props) {
    super(props);

    if (this.props.book) {
      const book = this.props.book;
  
      this.state = {
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        price: book.price,
        inventory: book.inventory,
        photoUrl: book.photoUrl
      }
    } else {
      this.state = {
        title: '',
        author: '',
        description: '',
        genre: '',
        price: '',
        inventory: '',
        photoUrl: '',
        sku: ''
      }
    }
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBook = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      genre: this.state.genre,
      price: this.state.price,
      inventory: this.state.inventory,
      photoUrl: this.state.photoUrl,
      sku: this.state.sku
    }

    if (this.props.isEdit) {
      axios.put(`/api/books/${this.props.book.id}/edit`, newBook)
      .then((book) => {
        store.dispatch(displayForm(false));
        store.dispatch(addBook(book.data));
      })
      .catch(console.error);
    } else {
      axios.post(`/api/books/add`, newBook)
        .then((book) => {
          this.setState({
            title: '',
            author: '',
            description: '',
            genre: '',
            price: '',
            inventory: '',
            photoUrl: '',
            sku: ''
          })
          store.dispatch(displayForm(false));
          store.dispatch(addBook(book.data));
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange.bind(this, 'title')} />
          </div>
          <div>
            <label>Author</label>
            <input name="author" type="text" value={this.state.author} onChange={this.handleChange.bind(this, 'author')} />
          </div>
          <div>
            <label>Description</label>
            <input name="description" type="text" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />
          </div>
          <div>
            <label>Genre</label>
            <input name="genre" type="text" value={this.state.genre} onChange={this.handleChange.bind(this, 'genre')} />
          </div>
          <div>
            <label>Price</label>
            <input name="price" type="number" value={this.state.price} onChange={this.handleChange.bind(this, 'price')} />
          </div>
          <div>
            <label>Inventory</label>
            <input name="inventory" type="number" value={this.state.inventory} onChange={this.handleChange.bind(this, 'inventory')} />
          </div>
          <div>
            <label>Photo</label>
            <input name="photoUrl" type="text" value={this.state.photoUrl} onChange={this.handleChange.bind(this, 'photoUrl')} />
          </div>
          {
            !this.props.isEdit
              ?
              (
                <div>
                  <label>SKU</label>
                  <input name="sku" type="number" value={this.state.sku} onChange={this.handleChange.bind(this, 'sku')} />
                </div>
              )
              :
              null
          }
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}