
import React from 'react';
import LogoAndSearch from './LogoAndSearch/LogoAndSearchBar';
import CenterOptions from './CenterNavOptions/CenterOptionsBar';
import DropdownButtons from './DropdownsBar/DropdownsBar';
import classes from './TopNavigation.css';

const topNavigationBar = (props) => {
    return (
        <div className={classes.BarContainer}>
            <LogoAndSearch />
            <CenterOptions />
            <DropdownButtons />
        </div>
    )
}

export default topNavigationBar;