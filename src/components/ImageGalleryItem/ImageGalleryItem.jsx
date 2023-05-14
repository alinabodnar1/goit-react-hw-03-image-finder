import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import cssModule from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

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
                <img className={cssModule['small-image']}
                    src={picture.webformatURL}
                    alt={picture.title}
                    loading="lazy"
                    onClick={this.toggleModal}
                    width="400"
                />
                {showModal &&
                    (<Modal onClose={this.toggleModal}> 
                        <img
                            src={picture.largeImageURL}
                            alt={picture.title}
                            width="800"
                        />
                    </Modal>)}
            </>
    )
  }
} ImageGalleryItem.propTypes = {
    picture: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
    }),
    showModal: PropTypes.func,
}
