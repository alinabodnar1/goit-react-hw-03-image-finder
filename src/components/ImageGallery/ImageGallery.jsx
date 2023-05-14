import React, { Component } from 'react';
import { getPictures }   from '../../api/getPictures';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../Loader/Loader';
import LoadMore from 'components/LoadMore/LoadMore';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import cssModule from './ImageGallery.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
    state = {
        pictures: [],
        isLoading: false,
        page: 1,
    }       

    // componentDidMount() {
    //  
    //  }
    
    componentDidUpdate(prevProps, prevState) {
        const search = this.props.searchText.trim();
        if (prevProps.searchText !== search || prevState.page !== this.state.page) {
            this.loadPictures();
        } 
    }

    loadPictures = () => {
        const search = this.props.searchText.trim();
        const { page } = this.state;
        this.setState({ isLoading: true });

        getPictures(search, page)
            .then((data) => {

                if (data.total === 0) {
                    this.setState({ pictures: [] });
                    toast.error("Sorry, there are no images matching your search query. Please try again.");
                    return;
                }

                if (data.hits) {
                    this.setState(prevState => ({
                        pictures: [...prevState.pictures, ...data.hits]
                    }));
                }
            })
            .catch(() => {
                toast.error("An error occurred while responding from the backend.")
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                });
               })
		}
    
    clearPictures = () => {
         this.setState({
            pictures: []
        })
    };

    loadMore = () => {
        this.setState((prevState) => {
            return {
                page: prevState.page + 1
            };
        });
    };
    
  render() {
      const { pictures, isLoading } = this.state;
		return (
			<>
                {isLoading &&
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color: "green"}}>Loading...</p>
                        <Loader />
                    </div>
                    }
                
                {pictures?.length > 0 && (
                    <div className={cssModule.gallery}>
                        <ImageList cols={3}>
                            {pictures.map((picture) => (
                                <ImageListItem
                                    key={picture.id}>
                                    <ImageGalleryItem picture={ picture} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    <LoadMore loadMore={this.loadMore}/>
                    </div>   
				)}				
				
                <ToastContainer
                    autoClose={3000}
                    position="top-left"/>
			</>
		)
	}
}

ImageGallery.propTypes = {
    pictures: PropTypes.array,
    isLoading: PropTypes.func,
}