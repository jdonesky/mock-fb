
import React, {useState, useEffect, useContext} from 'react';
import {withRouter, Route} from 'react-router';
import {connect} from 'react-redux';
import classes from './About.css';
import sharedClasses from '../Shared.css';
import {PageContext} from "../../../../context/page-context";
import {MessengerContext} from "../../../../context/messenger-context";

import Edit from '../../../../assets/images/edit';
import Pin from '../../../../assets/images/Pin';
import Info from '../../../../assets/images/MiscIcons/info';
import Follow from '../../../../assets/images/UserActionIcons/follow';
import Phone from '../../../../assets/images/phone';
import Web from '../../../../assets/images/MiscIcons/web';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import Email from '../../../../assets/images/email';
import AddCategory from '../../../../assets/images/UserActionIcons/addCategory';
import InlineDots from '../../../UI/Spinner/InlineDots';

const about = props => {

    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[2])
    const [displayProfile,setDisplayProfile] = useState(props.history.location.pathname.split('/')[3])

    const pageContext = useContext(PageContext);
    const messengerContext = useContext(MessengerContext);
    const {adminPage, ownedPageKeys, othersPage} = props


    useEffect(() => {

    })

    const startChat = (isOwned) => {
        console.log('startingChat - isOwned(page)?', isOwned)
        console.log('ownedPage', ownedPage);
        console.log('adminPage', adminPage);
        let page;
        if (isOwned) {
            let owned;
            if (adminPage) {
                 owned = adminPage
            } else if (ownedPage) {
                owned = ownedPage;
            }
            page = owned
        } else {
            page = othersPage
        }
        if (page) {
            messengerContext.startChat(page, 'PAGE', 'USER')
        }
    }

    let owned;
    if (pathRoot === 'view') {
        if (othersPage && ownedPageKeys) {
            owned = ownedPageKeys.includes(othersPage.dbKey)
        }
    }

    let ownedPage;
    if (pathRoot === 'manage') {
        if (adminPage) {
            ownedPage = adminPage;
            owned = true;
        }
    } else if (owned) {
        if (othersPage) {
            ownedPage = othersPage
        }
    }


    let editButtons;
    if (ownedPage) {
        editButtons = [
            {
                text: ownedPage.location && `${ownedPage.location.address}, ${ownedPage.location.city} ` || 'Enter location',
                action: () => pageContext.startEditing('LOCATION'),
                filled: ownedPage.location,
                icon: <Pin fill="rgba(0,0,0,0.45)"/>
            },
            {
                text: ownedPage.description || 'Enter description',
                action: () => pageContext.startEditing('DESCRIPTION'),
                filled: ownedPage.description,
                icon: <Info fill="rgba(0,0,0,0.45)"/>
            },
            {
                text: `${ownedPage.follows && ownedPage.follows.length ? ownedPage.follows.length : '0'} people follow this`,
                action: () => {
                },
                filled: false,
                icon: <Follow fill="rgba(0,0,0,0.45)"/>,
                followText: true
            },
            {
                text: ownedPage.website || 'Enter website',
                action: () => pageContext.startEditing('WEBSITE'),
                filled: ownedPage.website,
                icon: <Web fill="rgba(0,0,0,0.45)"/>
            },
            {
                text: ownedPage.phone || 'Enter phone number',
                action: () => pageContext.startEditing('PHONE'),
                filled: ownedPage.phone,
                icon: <Phone fill="rgba(0,0,0,0.45)"/>
            },
            {
                text: 'Send Conversation', action: () => startChat(true),
                filled: false,
                icon: <FbMessage fill="rgba(0,0,0,0.45)"/>,
                messageText: true
            },
            {
                text: ownedPage.email || 'Enter email',
                action: () => pageContext.startEditing('EMAIL'),
                filled: ownedPage.email,
                icon: <Email fill="rgba(0,0,0,0.45)"/>
            },
            {
                text: ownedPage.category,
                action: () => pageContext.startEditing('CATEGORY'),
                filled: true,
                icon: <AddCategory fill="rgba(0,0,0,0.45)"/>,
                categoryText: true
            }
        ]
            .map((obj, i) => (
                <div key={i} className={classes.EditButton}
                     style={{justifyContent: obj.filled ? 'space-between' : null}}>
                    <div className={classes.EditButtonLeftBlock}>
                        <div className={classes.EditIcon}>
                            {obj.icon}
                        </div>
                        <div
                            className={[classes.EditText, obj.followText ? classes.FollowClass : null, obj.messageText ? classes.MessageClass : null, obj.categoryText ? classes.CategoryClass : null].join(" ")}
                            onClick={obj.action}>{obj.text}</div>
                    </div>
                    {obj.filled ?
                        <div className={classes.PenIcon} onClick={obj.action}><Edit fill="#0a70ff"/></div> : null}
                </div>
            ))

    } else if (pathRoot === 'view' && !owned) {
        if (othersPage) {
            editButtons = [
                othersPage.location ? {
                text: othersPage.location && `${othersPage.location.address}, ${othersPage.location.city} `,
                icon: <Pin fill="rgba(0,0,0,0.45)"/>
                } : null,
                othersPage.description ? {
                    text: othersPage.description,
                    icon: <Info fill="rgba(0,0,0,0.45)"/>
                } : null,
                {
                    text: `${othersPage.follows && othersPage.follows.length ? othersPage.follows.length : '0'} people follow this`,
                    icon: <Follow fill="rgba(0,0,0,0.45)"/>,
                    followText: true
                },
                othersPage.website ? {
                    text: othersPage.website,
                    icon: <Web fill="rgba(0,0,0,0.45)"/>,
                    website: true
                } : null,
                othersPage.phone ? {
                    text: othersPage.phone,
                    icon: <Phone fill="rgba(0,0,0,0.45)"/>
                } : null,
                {
                    text: 'Send Conversation',
                    action: () => startChat(false),
                    filled: false,
                    icon: <FbMessage fill="rgba(0,0,0,0.45)"/>,
                    messageText: true
                },
                othersPage.email ? {
                    text: othersPage.email,
                    icon: <Email fill="rgba(0,0,0,0.45)"/>,
                    email: true
                } : null,
                {
                    text: othersPage.category,
                    icon: <AddCategory fill="rgba(0,0,0,0.45)"/>,
                    categoryText: true
                }
        ]
        .map((obj, i) => {
            if (obj) {
                return (
                    <div key={i} className={classes.AboutEntry}>
                        <div className={classes.EditButtonLeftBlock}>
                            <div className={classes.EditIcon}>
                                {obj.icon}
                            </div>
                            <div
                                className={[classes.AboutText, obj.followText ? classes.FollowClass : null, obj.messageText ? classes.EditText: null, obj.messageText ? classes.MessageClass: null, obj.categoryText ? classes.CategoryClass : null, obj.email ? classes.Link : null, obj.website ? classes.Link : null].join(" ")}
                                onClick={obj.action}
                            >
                                {obj.email ? <a href={`mailto:${obj.text}`}>{obj.text}</a> : obj.website ? <a href={`http://${obj.text}`} target="_blank" rel="noopener noreferrer">{obj.text}</a> : obj.text}
                            </div>
                        </div>
                    </div>
                )
            }
        })
        }
    }

    let about;
    if (props.fetchingOwnedPage || props.fetchingOwnedPageKeys || props.fetchingOthersPage) {
        about = <InlineDots />
    } else {
        about = (
            <div className={sharedClasses.Container} style={{height: "400px"}}>
                <div className={sharedClasses.Header}>About</div>
                <section className={classes.EditButtonsContainer}>
                    {editButtons}
                </section>
            </div>
        )
    }

    return about;
}

const mapStateToProps = state => {
    return {
        adminPage: state.pages.ownedPage,
        fetchingOwnedPage: state.pages.fetchingOwnedPage,
        ownedPageKeys: state.pages.ownedPageKeys,
        fetchingOwnedPageKeys: state.pages.fetchingOwnedPageKeys,
        othersPage: state.pages.othersPage,
        fetchingOthersPage: state.pages.fetchingOthersPage,
    }
}

export default connect(mapStateToProps)(withRouter(about));