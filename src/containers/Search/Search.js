import React, { Component } from 'react'
import Users from '../../components/Users/User/User'

class Search extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        
    }

    render() {
        return (
        <div>
            <div>Search Bar</div>
            <div>Users</div>
        </div>
         
        );
    }
}

export default Search