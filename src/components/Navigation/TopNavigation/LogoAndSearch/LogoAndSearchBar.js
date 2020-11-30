
import React, {useState} from 'react';
import classes from './LogoAndSearchBar.css';
import {withRouter} from 'react-router';

import SearchDropdown from './SearchDropdown/SearchDropdown';
import ReverseFLogo from '../../../../assets/images/Logos/filled';
import SearchGlass from '../../../../assets/images/search';
import OutsideAlerter from "../../../../hooks/outsideClickHandler";


const logoAndSearch = (props) => {

    const [showSearch, setShowSearch] = useState(false);

    const navHome = () => {
        if (props.location.pathname !== '/home') {
            props.history.push('/home');
        }
    }

    const openSearchMenu = () => {
        setShowSearch(true);
    }

    const closeSearchMenu = () => {
        setShowSearch(false);
    }

    let searchMenu;
    if (showSearch) {
        searchMenu = <SearchDropdown close={closeSearchMenu}/>
    }

    return (
        <div className={classes.LogoAndSearchContainer}>
            <div className={classes.LogoContainer} onClick={navHome}>
                <ReverseFLogo fill='white'/>
            </div>
            <div className={classes.SearchButtonContainer} onClick={openSearchMenu}>
                <SearchGlass fill="rgba(0,0,0,0.5)"/>
            </div>
            <OutsideAlerter action={closeSearchMenu}>
                <div className={classes.DropdownPositioner}>
                    {searchMenu}
                </div>
            </OutsideAlerter>
        </div>
    )
}

export default withRouter(logoAndSearch);