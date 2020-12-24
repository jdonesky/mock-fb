
import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './OwnedPagesDropdown.css';
import * as actions from '../../../../../store/actions/index';

import InlineDots from '../../../../UI/Spinner/InlineDots';
import Flag from "../../../../../assets/images/BookmarkIcons/flag";
import Check from '../../../../../assets/images/check';

const ownedPagesDropdown = props => {

    const {fetchingOwnedPages, myPages, ownedPage} = props
    const [pages, setPages] = useState(null);

    const managePage = (key) => {
        props.onFetchOwnedPage(props.authToken, key)
        props.history.push(`/pages/manage/${key}`)
        props.close();
    }

    useEffect(() => {
        if (myPages) {
            setPages(Object.keys(myPages).map(key => ({...myPages[key]})))
        }
    }, [myPages])

    let ownedPages;
    if (pages)  {
        ownedPages = Object.keys(myPages).map(key => {
            return ( <div
                    key={key}
                    className={classes.OwnPageButton}
                    onClick={() => managePage(key)}
                    style={{justifyContent: ownedPage && ownedPage.dbKey === key ? 'space-between' : null}}
                >
                    <div className={classes.LeftBlock}>
                        <div className={classes.ProfilePageCircle} style={{backgroundImage: myPages[key].profileImage ? `url(${myPages[key].profileImage})` : null}}>
                            {myPages[key].profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                        </div>
                        <div className={classes.Name}>
                            {myPages[key].name}
                        </div>
                    </div>
                    {props.ownedPage && props.ownedPage.dbKey === key ? <div className={classes.ActiveCheck}><Check fill="white"/></div> : null}
                </div>
            )
        })
    }

    if (fetchingOwnedPages) {
        ownedPages = <InlineDots />
    }

    return (
        <div className={classes.DropdownContainer}>
            {ownedPages}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPages: state.pages.myPages,
        ownedPage: state.pages.ownedPage,
        fetchingOwnedPages: state.pages.fetchingOwnedPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ownedPagesDropdown));