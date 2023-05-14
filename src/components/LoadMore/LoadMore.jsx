import React, { Component } from 'react';
import Button from '@mui/material/Button';
import cssModule from './LoadMore.module.css';
import PropTypes from 'prop-types';

export default class LoadMore extends Component {
    render() {
        const { loadMore } = this.props;
        return (
            <div className={cssModule.container}>
                 <Button 
                    variant="contained"
                    type="submit"
                    onClick={loadMore}
                > Load more
            </Button >
            </div>
           
        )
    }
}
LoadMore.propTypes = {
    loadMore: PropTypes.func.isRequired,
}
