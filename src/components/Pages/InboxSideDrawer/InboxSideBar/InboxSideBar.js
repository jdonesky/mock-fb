import React from 'react';
import {withRouter} from 'react-router';
import classes from './InboxSideBar.css';
import sharedClasses from '../InboxTOC/InboxTOC.css';

import Flag from '../../../../assets/images/BookmarkIcons/flag';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import DumbFb from '../../../../assets/images/Logos/filled';
import AutoReact from '../../../../assets/images/MiscIcons/react';

const inboxSideBar = props => {

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
        <div className={classes.SideBarContainer}>
            <div className={classes.ProfileImageContainer}>
                <div
                    className={classes.ProfileImage}
                    style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}
                    onClick={() => props.history.push(`/pages/manage/${props.history.location.pathname.split('/')[3]}`)}
                >
                    {props.profileImage ? null : <Flag first="white" second="white"/>}
                </div>
            </div>
            <div className={classes.SectionBreak}/>
            <section className={sharedClasses.SideBarNavSection}>
                <div className={[sharedClasses.SideBarTab, sharedClasses[activeMessageClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/messages`)}>
                    <div className={[sharedClasses.IconContainer, sharedClasses.SideBarIcon].join(" ")}>
                        <div className={[sharedClasses.Icon, sharedClasses.MessageIcon].join(" ")}><FbMessage fill={messageIconFill}/></div>
                    </div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={sharedClasses.SideBarNavSection}>
                <div className={[sharedClasses.SideBarTab, sharedClasses[activeCommentClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/comments`)}>
                    <div className={[sharedClasses.IconContainer, sharedClasses.SideBarIcon].join(" ")}>
                        <div className={[sharedClasses.Icon, sharedClasses.FbIcon].join(" ")} style={{backgroundColor: fbIconBackdrop ? fbIconBackdrop : null}}><DumbFb fill={fbIconFill}/></div>
                    </div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={sharedClasses.SideBarNavSection}>
                <div className={[sharedClasses.SideBarTab, sharedClasses[activeReactClass]].join(" ")} onClick={() => props.history.push(`/pages/inbox/${props.history.location.pathname.split('/')[3]}/automate`)}>
                    <div className={[sharedClasses.IconContainer, sharedClasses.SideBarIcon].join(" ")}>
                        <div className={[sharedClasses.Icon, sharedClasses.SideBarReactIcon].join(" ")}><AutoReact fill={reactIconFill}/></div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default withRouter(inboxSideBar);