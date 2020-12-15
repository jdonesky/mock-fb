
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
            <Intro />
            <Photos />
            <Friends />
            <LifeEvents />
            <CreatePost displayMyProfile={props.displayMyProfile}/>
            <Posts />
        </div>
    )
}


export default timeLine;