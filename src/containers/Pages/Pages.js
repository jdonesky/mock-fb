import React from 'react';
import classes from './Pages.css'

import BrowsePagesSidedrawer from '../../components/Pages/BrowsePagesSidedrawer/BrowsePagesSidedrawer';
import CreatePageSidedrawer from '../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer';
import PagePreview from '../../components/Create/PagePreview/PagePreview';
import getWindowDimensions from "../../hooks/getWindowDimensions";

const pages = props => {

    const { width, height } = getWindowDimensions();

    let sidedrawer;
    let displayPanelContents;
    if (props.history.location.pathname === '/pages') {
        sidedrawer = <BrowsePagesSidedrawer />;
    } else if (props.history.location.pathname === '/pages/create') {
        sidedrawer = <CreatePageSidedrawer />
        displayPanelContents = <PagePreview preview="PAGE"/>
    }

    return (
        <div className={classes.FullPage}>
            {sidedrawer}
            <div className={classes.PreviewPanel}  style={{width: `${width - 355}px`}}>
                {displayPanelContents}
            </div>
        </div>
    )
}


export default pages;