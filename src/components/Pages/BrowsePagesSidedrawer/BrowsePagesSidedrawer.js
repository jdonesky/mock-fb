import React from 'react';
import classes from './BrowsePagesSidedrawer.css';
import TOCclasses from '../../UI/TOCsidedrawer/TOCsidedrawer.css';
import TOCsidedrawer from '../../UI/TOCsidedrawer/TOCsidedrawer';

import Gear from "../../../assets/images/TopNavButtonIcons/gear";

const browsePagesSidedrawer = () => {

    const headerButton = (
        <div className={TOCclasses.SettingsIconContainer}><Gear /></div>
    )

    return (
        <TOCsidedrawer

            title="Pages"
            headerButton={headerButton}
        >

        </TOCsidedrawer>
    )

}

export default browsePagesSidedrawer;