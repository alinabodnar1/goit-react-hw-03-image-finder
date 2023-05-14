import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
     state = {
        showModal: false
    }
    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }))
    }  
    
    render() {
        const { picture } = this.props;
        const { showModal } = this.state;
        return (
            <>
                <img
                    src={`${picture.webformatURL}?w=164&h=164&fit=crop&auto=format`}
                    alt={picture.title}
                    loading="lazy"
                    onClick={this.toggleModal}
                    width="500"
                    height="300"
                />
                {showModal &&
                    (<Modal onClose={this.toggleModal}> 
                        <img
                            src={picture.largeImageURL}
                            alt={picture.title}
                            width="800"
                            height="600"/>
                    </Modal>)}
            </>
    )
  }
}
