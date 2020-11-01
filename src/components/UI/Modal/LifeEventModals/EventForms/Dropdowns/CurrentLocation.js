import React from 'react';
import classes from './CurrentLocation.css'
import {connect} from 'react-redux'
import Search from '../../../../../Search/Searchbar'

const currentLocation = ({currLocation, hometown, pastLocations}) => {


    return (
        <div className={classes.Container}>
            <div className={classes.BaseArrow}>
                <Search />
                {/*{input}*/}
                {/*{suggestedInputs}*/}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown,
        pastLocations: state.profile.pastLocations,
    }
}

export default connect(mapStateToProps)(currentLocation);

