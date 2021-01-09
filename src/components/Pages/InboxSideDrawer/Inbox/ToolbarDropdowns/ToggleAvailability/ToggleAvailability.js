
import React, {useState, useRef, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './ToggleAvailability.css';

const toggleAvailability = props => {

    const {availability, updateAvailability} = props
    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])
    const initialValue = useRef(availability);

    useEffect(() => {
        if (displayPage !== props.history.location.pathname.split('/')[3]) {
            setDisplayPage(props.history.location.pathname.split('/')[3]);
        }
    })

    useEffect(() => {
        console.log('initial', initialValue.current);
        console.log('current', availability);
    })

    return (
        <div className={classes.Positioner}>
            <form className={classes.Container}>
                <div className={classes.Arrow}/>
                <div className={classes.SelectionContainer}>
                    <div className={classes.CheckBlock}>
                        <input
                            className={classes.CheckInput}
                            type="radio"
                            value={true}
                            checked={availability === true}
                            onChange={() => updateAvailability(true)}
                        />
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.DescriptionHeader} style={{color: 'green'}}>Available</div>
                        <div className={classes.DescriptionCaption}>{`You'll be notified when people send ${props.name || 'your page'} messages in Messenger.`}</div>
                    </div>
                </div>
                <div className={classes.SelectionContainer}>
                    <div className={classes.CheckBlock}>
                        <input
                            className={classes.CheckInput}
                            type="radio"
                            value={false}
                            checked={availability === false}
                            onChange={() => updateAvailability(false)}
                        />
                    </div>
                    <div className={classes.DescriptionContainer}>
                        <div className={classes.DescriptionHeader}  style={{color: 'red'}}>Away</div>
                        <div className={classes.DescriptionCaption}>{`${props.name || "You'll"} will be away for 12 hours or as long as you're scheduled to be away. People who send ${props.name || 'your page'} messages in Messenger will receive an away message, and you won't get message notifications. Messages received won't be included in your Page's response rate or response time calculations.`}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
    }
}

export default connect(mapStateToProps)(withRouter(toggleAvailability));