
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PostContext} from "../../../../../context/post-context";
import classes from './CreateMenu.css';

import Paper from '../../../../../assets/images/TopNavButtonIcons/paper-pen';
import Book from '../../../../../assets/images/TopNavButtonIcons/open-book';
import Star from '../../../../../assets/images/TopNavButtonIcons/star';
import Flag from '../../../../../assets/images/TopNavButtonIcons/flag';
import Group from '../../../../../assets/images/TopNavButtonIcons/user-group';
import Calendar from '../../../../../assets/images/TopNavButtonIcons/calendar';

const createMenu = (props) => {

    const postContext = useContext(PostContext);

    const openPostModal = () => {
        postContext.toggleModal()
    }

    const openLifeEventModal = () => {

    }

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderContainer}>
                <div className={classes.DropdownTitle}>
                    <b>Create</b>
                </div>
            </section>
            <section className={classes.Button} onClick={openPostModal}>
                <div className={[classes.Icon, classes.Paper].join(" ")}>
                    <Paper />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Post</div>
                    <div className={classes.SmallText}>Share a post on News Feed</div>
                </div>
            </section>
            <section className={classes.Button}>
                <div className={classes.Icon}>
                    <Book />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Story</div>
                    <div className={classes.SmallText}>Share a photo or write something</div>
                </div>
            </section>
            <section className={classes.Button}>
                <div className={[classes.Icon, classes.Star].join(" ")}>
                    <Star />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Life Event</div>
                    <div className={classes.SmallText}>Add a life event to your profile</div>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.Button}>
                <div className={[classes.Icon, classes.Flag].join(" ")}>
                    <Flag />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Page</div>
                    <div className={classes.SmallText}>Connect and share with customers or fans</div>
                </div>
            </section>
            <section className={classes.Button}>
                <div className={classes.Icon}>
                    <Group />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Group</div>
                    <div className={classes.SmallText}>Connect over your shared interests</div>
                </div>
            </section>
            <section className={classes.Button}>
                <div className={[classes.Icon, classes.Event].join(" ")}>
                    <Calendar />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Event</div>
                    <div className={classes.SmallText}>Bring people together with an event</div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(withRouter(createMenu));