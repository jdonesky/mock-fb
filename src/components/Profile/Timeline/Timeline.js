
import React from 'react';
import classes from './Timeline.css'
import Intro from './Intro/Intro'
import Photos from './Photos/Photos'
import Friends from './Friends/Friends'
import LifeEvents from "./LifeEvents/LifeEvents";
import CreatePost from './Posts/Create/StartCreating'

const timeLine = (props) => {
    return (
        <div className={classes.Timeline}>
            <Intro />
            <Photos />
            <Friends />
            <LifeEvents />
            <CreatePost />
        </div>
    )
}

export default timeLine;