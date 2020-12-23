
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import classes from './AdminTOC.css';
import {PageContext} from "../../../../context/page-context";

import DownArrow from '../../../../assets/images/down-arrow';

const adminTOC = props => {

    const pageContext = useContext(PageContext)

    let managedPage;
    if (pageContext.managing) {
        // if (props.myPages.find(page => page.))
    }

    return (
        <div className={classes.TocContainer}>
            <div className={classes.ProfilesDropdownBar}>
                <div className={classes.ProfilesDropdownBarLeftBlock}>
                    <div className={classes.ProfileImage}>

                    </div>
                    <div className={classes.Name}>Example</div>
                </div>
                <div className={classes.DownArrow}><DownArrow fill='black' /></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPages: state.pages.myPages
    }
}

export default connect(mapStateToProps)(adminTOC);