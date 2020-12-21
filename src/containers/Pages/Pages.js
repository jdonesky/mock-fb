import React from 'react';
import classes from './Pages.css'

import CreatePageSidedrawer from '../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer';
import PagePreview from '../../components/Create/PagePreview/PagePreview';
import getWindowDimensions from "../../hooks/getWindowDimensions";

const pages = props => {

    const { width, height } = getWindowDimensions();

    let sidedrawer;
    if (props.history.location.pathname === '/pages') {
        sidedrawer = null;
    } else if (props.history.location.pathname === '/pages/create') (
        sidedrawer = <CreatePageSidedrawer />
    )

    return (
        <div className={classes.FullPage}>
            {sidedrawer}
            <div className={classes.PreviewPanel}  style={{width: `${width - 355}px`}}>
                <PagePreview preview="PAGE"/>
            </div>
        </div>
    )
}


export default pages;