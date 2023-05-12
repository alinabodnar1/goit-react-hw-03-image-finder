import React, { Component } from 'react';
import { getPictures }   from '../../api/getPictures';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
    state = {
        // pictures: null,
        pictures: [],
        error: '',
        isLoading: false
    }       
	componentDidUpdate(prevProps, prevState) {
        // const text = this.props.searchText.trim();
        const search = this.props.searchText.trim();

		if (prevProps.searchText !== search ) {
            this.setState({ isLoading: true });

			getPictures(search)
                .then((data) => {
                    //  console.log("data:", data);
                    // console.log("data.total:", data.total);
                    // console.log("data.hits:", data.hits);

                     if (data.total === 0) {
                         toast.error("Sorry, there are no images matching your search query. Please try again.");
                         return;
                    } 
                
                    if (data.hits) {
                        this.setState({
                            pictures: data.hits })
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
  render() {
    
      const { pictures, isLoading } = this.state;
		return (
			<>
                {isLoading &&
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color: "red"}}>Loading...</p>
                        <Loader />
                    </div>
                    }
                
                
                {pictures?.length > 0 && (
                    

                    
                    <ImageList sx={{ width: 1200, height: "100vh" }} cols={3} rowHeight={400}>
                        {pictures.map((picture) => (
                            <ImageListItem key={picture.id}>
                                <img
                                    src={`${picture.webformatURL}?w=164&h=164&fit=crop&auto=format`}
                                    alt={picture.title}
                                    // loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                        </ImageList>
                       
				)}				
				
                <ToastContainer autoClose ={3000} />


    {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList> */}

			</>
		)
	}
}
