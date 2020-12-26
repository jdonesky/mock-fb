

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './InviteLikes.css';
import sharedClasses from '../Shared.css';
import * as actions from '../../../../store/actions/index';
import Searchbar from "../../../Search/Searchbar";
import Avatar from '../../../../assets/images/BookmarkIcons/user';


const inviteLikes = props => {

    const {publicProfile, ownedPage, authToken, onRequestLike} = props

    const [suggestions, setSuggestions] = useState(null);
    const [sentRequests, setSentRequests] = useState([])

    useEffect(() => {
        console.log(sentRequests)
    })

    useEffect(() => {
        if (publicProfile) {
            setSuggestions(publicProfile.friends)
        }
    }, [publicProfile])

    useEffect(() => {
        if (ownedPage) {
            if (ownedPage.requests && ownedPage.requests.sent) {
                setSentRequests(ownedPage.requests.sent.map(req => req.publicProfileKey))
            }
        }
    }, [ownedPage])

    const requestLike = (request) => {
        let pageRequests;
        if (ownedPage) {
            let newPage = {...ownedPage}
            if (newPage.requests) {
                pageRequests = {...newPage.requests};
                if (pageRequests && pageRequests.sent) {
                    pageRequests.sent = [...pageRequests.sent, request]
                }
            } else {
                pageRequests = {sent: [request]}
            }
            newPage.requests = pageRequests
            onRequestLike(authToken, newPage, request.publicProfileKey)
            setSentRequests(prevState => {
                return [...prevState, request.publicProfileKey]
            })
        }
    }

    let friends;
    if (suggestions) {
        friends = (
            <div className={classes.FriendsContainer}>
                {suggestions.map(friend => {

                    let requestSent;
                    const inviteButtonClasses = [classes.InviteButton]
                    if (sentRequests && sentRequests.includes(friend.publicProfileKey)) {
                        requestSent = true;
                        inviteButtonClasses.push(classes.InviteDisabled)
                    }

                    return (
                        <div className={classes.Friend} key={friend.userKey}>
                            <div className={classes.FriendInfoBlock}>
                                <div className={classes.FriendProfileImageCircle}
                                     style={{backgroundImage: friend.profileImage ? `url(${friend.profileImage})` : null}}>
                                    {friend.profileImage ? null : <Avatar/>}
                                </div>
                                <div className={classes.FriendName}>{friend.name}</div>
                            </div>
                            <div className={inviteButtonClasses.join(" ")}
                                 onClick={requestSent ? null : () => requestLike({...friend, date: new Date()})}>
                                Invite
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={sharedClasses.Container}>
            <div className={sharedClasses.Header}>Invite Friend to Like Your Page</div>
            <div className={classes.HeaderCaption}>More people might see your posts in News Feed if your friends like your Page and share posts </div>
            <Searchbar
                className={classes.Searchbar}
                iconClass={classes.SearchGlass}
                inputClass={classes.SearchInput}
                placeholder="Search for friends to invite"
            />
            {friends}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.token,
        publicProfile: state.profile.publicProfile,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRequestLike: (authToken, newPage, recipientKey) => dispatch(actions.requestPageLikeAttempt(authToken, newPage, recipientKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(inviteLikes);