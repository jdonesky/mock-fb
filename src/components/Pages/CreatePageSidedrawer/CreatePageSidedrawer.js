
import React from 'react';
import classes from './CreatePageSidedrawer.css';
import TOCclasses from '../../UI/TOCsidedrawer/TOCsidedrawer.css';
import TOCsidedrawer from '../../UI/TOCsidedrawer/TOCsidedrawer';
import CreatePageForm from './CreatePageForm/CreatePageForm'

import Info from "../../../assets/images/MiscIcons/info";

const createPageSidedrawer = () => {

    const paths = (
        <div className={TOCclasses.Paths} style={{right: '96px'}}><div className={TOCclasses.Path}>Pages</div><span> &rsaquo;</span><div className={TOCclasses.Path}>Create Page</div></div>
    )
    const headerButton = (
        <div className={classes.InfoIconContainer}><Info fill="rgba(0,0,0,0.6)"/></div>
    )

    return (
        <TOCsidedrawer
            paths={paths}
            title="Create a page"
            headerButton={headerButton}
        >
            <CreatePageForm />
        </TOCsidedrawer>
    )
}

export default createPageSidedrawer;