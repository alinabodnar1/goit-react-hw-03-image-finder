import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
     state = {
         src: this.props.picture.src,
         alt: this.props.picrure.title,
     }
    
    render() {
        const { picture } = this.props;
        return (
            <div>
                
            </div>
    )
  }
}
