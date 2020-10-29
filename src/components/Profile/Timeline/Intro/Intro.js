
import React from 'react';
import {connect} from 'react-redux';
import Button from '../../../UI/Button/Button'
import classes from './Intro.css'

const intro = (props) => {
    return (
        <div className={classes.Container}>
            <h1>Intro</h1>
            <Button addClass="Neutral">Edit Details</Button>
            <Button addClass="Neutral">Add Hobbies</Button>
            <Button addClass="Neutral">Edit Featured</Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation
    }
}

export default connect(mapStateToProps)(intro);