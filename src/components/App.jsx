import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    searchText: '',
    showModal: false
  }
  
  handleSearch = (searchText) => {
    this.setState({ searchText });
	}
  
  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { searchText, showModal } = this.state;
    return (
      <div>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchText={searchText} showModal={this.toggleModal} />

        {showModal && (<Modal onClose={this.toggleModal}> Body of modal
        
        </Modal>)}
       
      </div>
    )
  }
}

