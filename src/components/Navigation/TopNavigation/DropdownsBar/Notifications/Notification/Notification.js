
import React, {useState, useEffect} from 'react';
import classes from "./Notification.css";
import Avatar from "../../../../../../assets/images/BookmarkIcons/user";
import Dots from "../../../../../../assets/images/dots";
import {convertMessageDatetime} from "../../../../../../shared/utility";
import {getElapsedTime} from "../../../../../../shared/utility";

const notification = (props) => {

    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const today = new Date();
        let twoDaysBack = new Date();
        twoDaysBack = new Date(twoDaysBack.setDate(today.getDate() - 2));
        console.log('elapsed since 2 days ago', getElapsedTime(twoDaysBack) )
    })

    let editButton;
    if (hovering) {
      editButton = (
          <div className={classes.EditButtonContainer}>
            <div className={classes.EditButtonIcon}><Dots /></div>
          </div>
      )
    }

    let dateClasses = [classes.Date];
    if (props.read === 'false') {
        dateClasses.push(classes.DateUnread);
    }


    return (
        <section className={classes.NotificationContainer} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className={classes.ImageContainer}
                 style={{backgroundImage: props.image ? `url(${props.image})` : null}}
            >
                {props.image ? null : <Avatar fill="white"/>}
            </div>
            <div className={classes.TextContainer}>
                <div className={classes.Text}>{props.text}</div>
                <div className={dateClasses.join(" ")}>{getElapsedTime(props.date)}</div>
            </div>
            {editButton}
        </section>
    )
}

export default notification;