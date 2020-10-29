
import React from 'react';
import {connect} from 'react-redux';
import Button from '../../../UI/Button/Button'
import classes from './Intro.css'

const intro = (props) => {
    return (
        <div className={classes.Container}>
            <h2>Intro</h2>
            <div className={classes.Buttons}>
            <Button addClass="Neutral">Edit Details</Button>
            <Button addClass="Neutral">Add Hobbies</Button>
            <Button addClass="Neutral">Edit Featured</Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation
    }
}

export default connect(mapStateToProps)(intro);