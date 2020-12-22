
import React from 'react';
import classes from './PageEntry.css';
import Flag from "../../../../../assets/images/BookmarkIcons/flag";
import Earth from "../../../../../assets/images/earth";
const pageEntry = (props) => {
    return (
        <div className={classes.EntryContainer}>
            <div className={classes.LeftBlock}>
                <div className={classes.ProfileImageBlock}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}>
                        {props.profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                    </div>
                </div>
                <div className={classes.GeneralInfoBlock}>
                    <div className={classes.Name}>{props.name}</div>
                    <div className={classes.CategoryAndStatsBlock}>
                        <div className={classes.Category}>{props.category}</div>
                        <div className={classes.StatsBlock}>
                            <div className={classes.Stat}>{`${props.likes && props.likes.length ?  props.likes.length : '0'} likes`}</div>
                            <div className={classes.Stat}>{`${props.follows && props.follows.length ?  props.follows.length : '0'} follows`}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.NotesBlock}>
                <div className={classes.Note}><div className={classes.EarthIcon}><Earth /></div></div>
                <div className={classes.Note}><div className={classes.MessagesIcon}></div></div>
            </div>

        </div>
    )
}

export default pageEntry;