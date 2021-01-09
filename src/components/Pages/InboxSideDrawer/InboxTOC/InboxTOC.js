

import React from 'react';
import {withRouter} from 'react-router';
import classes from './InboxTOC.css';

import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import DumbFb from '../../../../assets/images/Logos/filled';
import AutoReact from '../../../../assets/images/MiscIcons/react';




const inboxTOC = props => {

    let messageIconFill = 'rgba(0,0,0,.6)';
    let fbIconBackdrop;
    let fbIconFill = "#fff";
    let reactIconFill =  'rgba(0,0,0,.6)';
    let activeMessageClass;
    let activeCommentClass;
    let activeReactClass;

    switch (props.history.location.pathname.split('/')[4]) {
        case 'messages':
            messageIconFill = "white";
            activeMessageClass = "ActiveTab";
            break;
        case 'comments':
            fbIconFill = "#0a70ff";
            fbIconBackdrop = "white";
            activeCommentClass = "ActiveTab";
            break;
        case 'automate':
            reactIconFill = "white";
            activeReactClass = "ActiveTab";
    }

    return (
        <div className={classes.Container}>
            <section className={classes.NavSection}>
                <div className={classes.SubHeader}>Messages</div>
                <div className={[classes.CategoryTab, classes[activeMessageClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/messages`)}>
                    <div className={classes.IconContainer}>
                        <div className={[classes.Icon, classes.MessageIcon].join(" ")}><FbMessage fill={messageIconFill}/></div>
                    </div>
                    <div className={classes.CategoryText}>All Messages</div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={classes.NavSection}>
                <div className={classes.SubHeader}>Comments</div>
                <div className={[classes.CategoryTab, classes[activeCommentClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/comments`)}>
                    <div className={classes.IconContainer}>
                        <div className={[classes.Icon, classes.FbIcon].join(" ")} style={{backgroundColor: fbIconBackdrop ? fbIconBackdrop : null}}><DumbFb fill={fbIconFill}/></div>
                    </div>
                    <div className={classes.CategoryText}>Dumb Facebook</div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={classes.NavSection}>
                <div className={[classes.CategoryTab, classes[activeReactClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/automate`)}>
                    <div className={classes.IconContainer}>
                        <div className={[classes.Icon, classes.ReactIcon].join(" ")}><AutoReact fill={reactIconFill}/></div>
                    </div>
                    <div className={classes.CategoryText}>Automated Responses</div>
                </div>
            </section>
        </div>
    )
}

export default withRouter(inboxTOC);
