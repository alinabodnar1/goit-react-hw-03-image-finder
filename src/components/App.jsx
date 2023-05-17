import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import Loader from './Loader/Loader';
import { getPictures }   from '../api/getPictures';
import { ToastContainer, toast } from 'react-toastify';

export default class App extends Component {
    state = {
    searchText: '',
    pictures: [],
    isLoading: false,
    page: 1,
  }
  
  handleSearch = (searchText) => {
    this.setState({
      searchText,
      page: 1,
      pictures: [],
      isLoading: false,
    });
  }
   componentDidUpdate(_, prevState) {
        const search = this.state.searchText.trim();
        if (prevState.searchText !== search || prevState.page !== this.state.page) {
            this.loadPictures();
        } 
   }
  loadPictures = () => {
        const search = this.state.searchText.trim();
        const { page } = this.state;
        this.setState({ isLoading: true });

        getPictures(search, page)
            .then((data) => {
                if (data.total === 0) {
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
      <div>
        <Searchbar handleSearch={this.handleSearch} />
           {isLoading && (
                    <div style={{marginLeft: "10px"}}>
                        <p style={{color: "green"}}>Loading...</p>
                        <Loader />
                    </div>)
        }
        {pictures?.length > 0 && (
          <>
            <ImageGallery items={pictures} isLoading={isLoading} />
            <LoadMore onClick={this.loadMore} />
          </>
        )}
       
        <ToastContainer
            autoClose={3000}
            position="top-left" />
                
      </div>
    )
  }
}

