import React, { Component } from 'react';
import cssModule from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = evt => {
		if (evt.code === 'Escape') {
			this.props.onClose();
		}
	}
	handleBackDrop = evt => {
		if (evt.currentTarget === evt.target) {
			this.props.onClose();
		}
	}
	render() {
	  return createPortal(
		  <div className={cssModule.backdrop} onClick={this.handleBackDrop}>
			  <div className={cssModule.modal}>
				  {this.props.children}
			  </div>
		  </div>,
		  modalRoot,
	  );
  }
}
