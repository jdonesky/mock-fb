
import React, {useState} from 'react';
import classes from './Emoji.css'

const emoji = (props) => {

    const [showCaption, setShowCaption] = useState(false);

    const onHover = () => {
        setShowCaption(true);
    }

    const onLeave = () => {
        setShowCaption(false);
    }

    let caption;
    if (showCaption) {
        caption = <div className={classes.Caption}>{props.caption}</div>
    }

    return (
        <div className={classes.CaptionPositioner} onMouseEnter={onHover} onMouseLeave={onLeave} >
            {caption}
            <div className={classes.Emoji} style={{backgroundImage: props.gif ? `url(${props.gif})`: null}} onClick={() => props.clicked(props.caption)}/>
        </div>
    )
}

export default emoji;