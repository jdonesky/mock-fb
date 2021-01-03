
import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './ViewAs.css';
import {ViewAsContext} from "../../../../context/view-as-context";
import World from '../../../../assets/images/earth';

const viewAsModal = (props) => {

    const viewAsContext = useContext(ViewAsContext);
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[1])

    useEffect(() => {
        console.log(props.history.location.pathname.split('/')[1])
        if (pathRoot !== props.history.location.pathname.split('/')[1]) {
            setPathRoot(props.history.location.pathname.split('/')[1])
        }
    })

    let routeBack;
    let context;
    if (pathRoot === 'user-profile') {
        context = 'profile'
        routeBack = '/user-profile/me';
    } else if (pathRoot === 'page' || pathRoot === 'pages') {
        context = 'page'
        if (props.ownedPage) {
            routeBack = `/${pathRoot}/manage/${props.ownedPage.dbKey}`
        }
    }

    const goBack = () => {
        props.history.replace(routeBack)
        viewAsContext.closeModal();
    }

    const message = <div className={classes.Message}>{`This content on your ${context} is: Public`}</div>

    return (
        <div className={[classes.Container, viewAsContext.showModal ? classes.ShowContainer : null].join(" ")} >
            <div className={classes.MessageBlock}>
                {message}
                <div className={classes.PublicIcon}><World fill="white"/></div>
            </div>
            <div className={classes.ExitButton} onClick={goBack}>Exit View As</div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(withRouter(viewAsModal));