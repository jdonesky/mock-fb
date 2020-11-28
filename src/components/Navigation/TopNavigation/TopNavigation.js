
import React from 'react';
import LogoAndSearch from './LogoAndSearch/LogoAndSearchBar'
import classes from './TopNavigation.css'

const topNavigationBar = () => {
    return (
        <div className={classes.BarContainer}>
            <LogoAndSearch />
        </div>
    )
}

export default topNavigationBar;