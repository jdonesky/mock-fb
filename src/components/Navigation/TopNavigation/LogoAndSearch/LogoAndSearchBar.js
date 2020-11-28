
import React from 'react';
import classes from './LogoAndSearchBar.css'
import ReverseFLogo from '../../../../assets/images/Logos/filled';
import SearchGlass from '../../../../assets/images/search';

const logoAndSearch = (props) => {
    return (
        <div className={classes.LogoAndSearchContainer}>
            <div className={classes.LogoContainer}>
                <ReverseFLogo fill='white'/>
            </div>
            <div className={classes.SearchButtonContainer}>
                <SearchGlass fill="rgba(0,0,0,0.2)"/>
            </div>
        </div>
    )
}

export default logoAndSearch;