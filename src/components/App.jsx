import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


export default class App extends Component {
  state = {
    searchText: '',
  }

handleSearch = (searchText) => {
  this.setState({ searchText });
	}
  
  render() {
    return (
      <div>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchText={this.state.searchText}/>
      </div>
    )
  }
}

