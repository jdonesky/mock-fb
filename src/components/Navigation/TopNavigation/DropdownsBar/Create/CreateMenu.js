
import React, {useContext} from 'react';
import {withRouter} from 'react-router';
import {PostContext} from "../../../../../context/post-context";
import {LifeEventContext} from "../../../../../context/life-event-context";
import {UnderConstructionContext} from "../../../../../context/under-construction-context";
import classes from './CreateMenu.css';

import Paper from '../../../../../assets/images/TopNavButtonIcons/paperPen';
import Book from '../../../../../assets/images/TopNavButtonIcons/openBook';
import Star from '../../../../../assets/images/TopNavButtonIcons/star';
import Flag from '../../../../../assets/images/TopNavButtonIcons/flag';
import Group from '../../../../../assets/images/TopNavButtonIcons/userGroup';
import Calendar from '../../../../../assets/images/TopNavButtonIcons/calendar';

const createMenu = (props) => {

    const postContext = useContext(PostContext);
    const lifeEventContext = useContext(LifeEventContext);
    const underConstruction = useContext(UnderConstructionContext);

    const openPostModal = () => {
        postContext.toggleModal();
        props.close();
    }

    const openLifeEventModal = () => {
        lifeEventContext.toggleModal();
        props.close();
    }

    const startCreatePage = () => {
        props.history.push('/pages/create');
        props.close();
    }

    const blockRoute = () => {
        underConstruction.openModal();
        props.close()
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
            <section className={classes.Button} onClick={blockRoute}>
                <div className={classes.Icon}>
                    <Book />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Story</div>
                    <div className={classes.SmallText}>Share a photo or write something</div>
                </div>
            </section>
            <section className={classes.Button} onClick={openLifeEventModal}>
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
                <div className={classes.NameTagContainer} onClick={startCreatePage}>
                    <div className={classes.MainText}>Page</div>
                    <div className={classes.SmallText}>Connect and share with customers or fans</div>
                </div>
            </section>
            <section className={classes.Button} onClick={blockRoute}>
                <div className={classes.Icon}>
                    <Group />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Group</div>
                    <div className={classes.SmallText}>Connect over your shared interests</div>
                </div>
            </section>
            <section className={classes.Button} onClick={blockRoute}>
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

export default withRouter(createMenu);