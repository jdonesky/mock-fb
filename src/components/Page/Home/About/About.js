
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './About.css';

const about = props => {

    const {ownedPage} = props

    let editButtons;
    if (ownedPage) {
        editButtons = [
            {text: 'Enter location', action: () => {}, filled: ownedPage.location},
            {text: 'Enter description', action: () => {}, filled: ownedPage.description},
            {text: `${ownedPage.follows && ownedPage.follows.length ? ownedPage.follows.length : '0'} people follow this`, action: () => {}, filled: false },
            {text: 'Enter website', action: () => {}, filled: ownedPage.website},
            {text: 'Enter phone number', action: () => {}, filled: ownedPage.phone},
        ]
    }


    return (
        <div className={classes.AboutContainer}>
            <div className={classes.Header}>About</div>
            <section className={classes.EditButtonsContainer}>
                <div className={classes.EditButton}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>

                        </div>
                        <div className={classes.EditText}></div>
                    </div>
                </div>
                <div className={classes.EditButton}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>

                        </div>
                        <div className={classes.EditText}></div>
                    </div>
                </div>
                <div className={classes.EditButton}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>

                        </div>
                        <div className={classes.EditText}></div>
                    </div>
                </div>
                <div className={classes.EditButton}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>

                        </div>
                        <div className={classes.EditText}></div>
                    </div>
                </div>

            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(about);