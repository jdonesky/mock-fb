
import React, {useState, useEffect, useContext, useRef} from 'react';
import classes from './Messenger.css';
import {MessengerContext} from "../../context/messenger-context";

import Close from '../../assets/images/MessengerIcons/close';
import Minimize from '../../assets/images/MessengerIcons/minimize';
import Photo from '../../assets/images/polaroid';
import Gif from '../../assets/images/MessengerIcons/gif';
import Like from '../../assets/images/like';

const messenger = (props) => {

    const messengerContext = useContext(MessengerContext);
    const messageBar = useRef(null);
    const [focusing, setFocusing] = useState(false);


    useEffect(() => {
        messageBar.current.focus();
    }, [])

    let iconsFill;
    if (focusing) {
        iconsFill = "#3078fc"
    } else {
        iconsFill = "rgba(0,0,0,0.2)"
    }

    return (
        <div
            className={[classes.Container, messengerContext.showMessenger ?  classes.ShowMessenger : null].join(" ")}
        >
            <section className={classes.Header}>
                <div className={classes.IdBlock}>

                </div>
                <div className={classes.ControlsBlock}>
                    <div className={[classes.Control, classes.Minimize].join(" ")}><Minimize fill={iconsFill}/></div>
                    <div className={[classes.Control, classes.Close].join(" ")} onClick={() => messengerContext.closeMessenger()}><Close fill={iconsFill}/></div>
                </div>
            </section>
            <section className={[classes.Footer,messengerContext.showMessenger ?  classes.ShowMessageBar : null].join(" ")}>
                <div className={classes.AddMediaButton}><Photo fill={iconsFill}/></div>
                <div className={classes.AddMediaButton}><Gif fill={iconsFill}/></div>
                <div className={classes.MessageBarContainer}>
                    <input className={classes.MessageBar} placeholder="Aa" ref={messageBar} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)}/>
                </div>
                <div className={classes.LikeButton}><Like fill={iconsFill}/></div>
            </section>
        </div>
    )
}

export default messenger;