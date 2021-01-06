
import React, {useState, useEffect} from 'react';
import classes from "./Notification.css";
import EditOptions from './Edit/EditOptions';

import Avatar from "../../../../../../assets/images/BookmarkIcons/user";
import Info from "../../../../../../assets/images/MiscIcons/info";
import Dots from "../../../../../../assets/images/dots";
import {getElapsedTime} from "../../../../../../shared/utility";
import OutsideAlerter from "../../../../../../hooks/outsideClickHandler";

const notification = (props) => {

    const [hovering, setHovering] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [readStatus, setReadStatus] = useState(null);

    const switchRead = () => {
        setReadStatus(props.read === "false" ? "true" : "false");
        setShowOptions(false);
        props.switchRead()
    }

    const deleteRecord = () => {
        setShowOptions(false);
        props.deleteRecord()
    }

    let avatar;
    if (props.image) {
        avatar = null;
    } else if (props.subject === 'SELF' && props.myProfileImage) {
        avatar = null
    } else {
        avatar = <Avatar fill="white"/>
    }

    let icon;
    let iconBackfill;
    switch (props.type) {
        case "INFO":
            icon = <Info fill="white"/>
            iconBackfill = "#0a70ff"
            break;
        default:
            icon = null;
            iconBackfill = null;
    }

    let Icon;
    if (icon) {
        Icon = (
            <div className={classes.IconContainer} style={{backgroundColor: iconBackfill && iconBackfill}}>
                <div className={classes.Icon}>
                    {icon}
                </div>
            </div>
        )
    }

    let editOptions;
    if (showOptions) {
        editOptions = <EditOptions read={props.read === "true" || null} switchRead={switchRead} deleteRecord={deleteRecord} readStatus={readStatus}/>
    }

    let editButton;
    if (hovering) {
        editButton = (
            <OutsideAlerter action={props.deletedRecord && props.id === props.idInProcess ? null : () => setShowOptions(false)} className={classes.OutsideAlerter}>
                <div className={classes.EditButtonContainer} onClick={() => {setShowOptions(prevState => {return !prevState})}}>
                    <div className={classes.EditButtonIcon}><Dots /></div>
                </div>
                {editOptions}
            </OutsideAlerter>
        )
    }

    let unreadIndicator;
    let dateClasses = [classes.Date];
    if (!readStatus) {
        if (props.read === "false") {
            dateClasses.push(classes.DateUnread);
            unreadIndicator = (
                <div className={classes.UnreadIndicator} />
            )
        }
    } else {
        if (readStatus === "false") {
            dateClasses.push(classes.DateUnread);
            unreadIndicator = (
                <div className={classes.UnreadIndicator} />
            )
        }
    }

    const containerClass = [classes.NotificationContainer]
    if (props.deletedRecord && props.id === props.idInProcess) {
        containerClass.push(classes.Deleting)
    }

    return (
        <section className={containerClass.join(" ")} onMouseEnter={props.deletedRecord && props.id === props.idInProcess ? null : () => setHovering(true)} onMouseLeave={showOptions ? null : () => setHovering(false)}>
            <div className={classes.ImageBlock}>
                <div className={classes.ImageContainer}
                     style={{backgroundImage: props.image ? `url(${props.image})` : !props.image && props.subject === 'SELF' ? `url(${props.myProfileImage})` : null}}
                >
                    {avatar}
                </div>
                {Icon}
            </div>
            <div className={classes.TextContainer}>
                <div className={classes.Text}>{props.text}</div>
                <div className={dateClasses.join(" ")}>{getElapsedTime(props.date)}</div>
            </div>
            {editButton}
            {unreadIndicator}
        </section>
    )
}

export default notification;