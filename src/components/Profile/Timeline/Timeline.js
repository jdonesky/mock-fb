
import React from 'react';
import classes from './Timeline.css';

import Intro from './Intro/Intro';
import Photos from './Photos/Photos';
import Friends from './Friends/Friends';
import LifeEvents from "./LifeEvents/LifeEvents";
import CreatePost from './Posts/Create/StartCreating';
import Posts from './Posts/Posts'

const timeLine = (props) => {

    return (
        <div className={classes.Timeline}>
            <Intro displayProfile={props.displayProfile} />
            <Photos />
            <Friends />
            <LifeEvents />
            <CreatePost displayProfile={props.displayProfile} />
            <Posts />
        </div>
    )
}


export default timeLine;