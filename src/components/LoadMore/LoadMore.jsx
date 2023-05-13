import React, { Component } from 'react';
import Button from '@mui/material/Button';

export default class LoadMore extends Component {

    render() {
      
    return (
        <Button 
                variant="contained"
                type="submit"
                onClick = {()=> this.props.loadMore()}
            > Load more
        </Button >
    )
  }
}

