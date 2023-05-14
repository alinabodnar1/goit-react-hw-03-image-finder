import React, { Component } from 'react';
import { getPictures }   from '../../api/getPictures';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../Loader/Loader';
import LoadMore from 'components/LoadMore/LoadMore';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
    state = {
        pictures: [],
        isLoading: false,
        // page: 1,
        statusRow: '',
        statusPage: 1
    }       
	componentDidUpdate(prevProps, prevState) {
        const search = this.props.searchText.trim();

        //  if (search !== this.state.statusRow) {
        //      this.setState({
        //         statusRow: search,
        //         statusPage: 1
        //     })
        //     this.clearPictures();
        //  }
        
		if (prevProps.searchText !== search ) {
            this.setState({ isLoading: true });

			getPictures(search, 1)
                .then((data) => {

                    if (data.total === 0) {
                         this.setState({ pictures: [] });
                         toast.error("Sorry, there are no images matching your search query. Please try again.");
                         return;
                    } 
                
                    if (data.hits) {
                        this.setState({
                            pictures: data.hits
                        })
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
    }
    
    clearPictures = () => {
         this.setState({
            pictures: []
        })
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
                    <>
                    <ImageList sx={{ width: "100vw", height: "100vh" }} cols={3} >
                        {pictures.map((picture) => (
                            <ImageListItem
                                key={picture.id}>
                                <ImageGalleryItem picture={ picture} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <LoadMore />
                    </>   
				)}				
				
                <ToastContainer
                    autoClose={3000}
                    position="top-left"/>
			</>
		)
	}
}
