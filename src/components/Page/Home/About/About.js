
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './About.css';

import Edit from '../../../../assets/images/edit';
import Pin from '../../../../assets/images/Pin';
import Info from '../../../../assets/images/MiscIcons/info';
import Follow from '../../../../assets/images/UserActionIcons/follow';
import Phone from '../../../../assets/images/phone';
import Web from '../../../../assets/images/MiscIcons/web';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import Email from '../../../../assets/images/email';
import AddCategory from '../../../../assets/images/UserActionIcons/addCategory';

const about = props => {

    const {ownedPage} = props

    let editButtons;
    if (ownedPage) {
        editButtons = [
            {text: ownedPage.location || 'Enter location', action: () => {}, filled: ownedPage.location, icon: <Pin fill="rgba(0,0,0,0.45)"/>},
            {text: ownedPage.description ||'Enter description', action: () => {}, filled: ownedPage.description, icon: <Info fill="rgba(0,0,0,0.45)"/>},
            {text: `${ownedPage.follows && ownedPage.follows.length ? ownedPage.follows.length : '0'} people follow this`, action: () => {}, filled: false, icon: <Follow fill="rgba(0,0,0,0.45)"/>},
            {text: ownedPage.website ||'Enter website', action: () => {}, filled: ownedPage.website, icon: <Web fill="rgba(0,0,0,0.45)"/>},
            {text: ownedPage.phone ||'Enter phone number', action: () => {}, filled: ownedPage.phone, icon: <Phone fill="rgba(0,0,0,0.45)"/>},
            {text: 'Send Message', action: () => {}, filled: false, icon: <FbMessage fill="rgba(0,0,0,0.45)"/>},
            {text: ownedPage.email ||'Enter email', action: () => {}, filled: ownedPage.email, icon: <Email fill="rgba(0,0,0,0.45)"/>},
            {text: ownedPage.category, action: () => {}, filled: true, icon: <AddCategory fill="rgba(0,0,0,0.45)"/>}
        ]
            .map(obj => (
                <div className={classes.EditButton} onClick={obj.action} style={{justifyContent: obj.filled ? 'space-between' : null}}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>
                            {obj.icon}
                        </div>
                        <div className={classes.EditText}>{obj.text}</div>
                    </div>
                    {obj.filled ? <div className={classes.PenIcon}><Edit fill="#0a70ff"/></div> : null}
                </div>
            ))

    }



    return (
        <div className={classes.AboutContainer}>
            <div className={classes.Header}>About</div>
            <section className={classes.EditButtonsContainer}>
                {editButtons}
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