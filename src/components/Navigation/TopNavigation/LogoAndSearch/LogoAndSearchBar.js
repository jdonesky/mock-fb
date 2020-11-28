
import React from 'react';
import classes from './LogoAndSearchBar.css';
import {withRouter} from 'react-router';
import SearchDropdown from './SearchDropdown/SearchDropdown';
import ReverseFLogo from '../../../../assets/images/Logos/filled';
import SearchGlass from '../../../../assets/images/search';
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

const logoAndSearch = (props) => {

    const navHome = () => {
        if (props.location.pathname !== '/') {
            props.history.push('/');
        }
    }

    return (
        <div className={classes.LogoAndSearchContainer}>
            <div className={classes.LogoContainer} onClick={navHome}>
                <ReverseFLogo fill='white'/>
            </div>
            <div className={classes.SearchButtonContainer}>
                <SearchGlass fill="rgba(0,0,0,0.5)"/>
            </div>
            <div className={classes.DropdownPositioner}>
            </div>
        </div>
    )
}

export default withRouter(logoAndSearch);