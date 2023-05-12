import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default class Searchbar extends Component {
    state = {
        search: ''
    }

    // Відповідає за оновлення стану

    handleChange = (evt) => { 
        this.setState({ search: evt.currentTarget.value.toLowerCase() }); 
	}
    
  // Викликається під час відправлення форми
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.handleSearch(this.state.search);  
        console.log("props:", this.state.search);
        
        this.setState({
            search: ''
        })
    }
    
  render() {
    return (
        <form onSubmit={this.handleSubmit}
              style={{ marginLeft: "500px", marginTop: "15px" }}>
            <Stack spacing={2} direction="row">
                <TextField
                    label="Enter word"
                    onChange={this.handleChange}
					value={this.state.search}/>
                <Button
                    type="submit"
                    variant="contained">Search</Button>
            </Stack>
        </form>
    )
  }
}
