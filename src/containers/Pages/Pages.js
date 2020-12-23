import React, {useEffect} from 'react';
import classes from './Pages.css'
import {Route} from 'react-router-dom'

import BrowsePagesSidedrawer from '../../components/Pages/BrowsePagesSidedrawer/BrowsePagesSidedrawer';
import ManagePageSidedrawer from '../../components/Pages/ManagePageSidedrawer/ManagePageSidedrawer';
import CreatePageSidedrawer from '../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer';
import Managed from '../../components/Pages/BrowsePagesSidedrawer/Managed/Managed';
import PagePreview from '../../components/Create/PagePreview/PagePreview';
import getWindowDimensions from "../../hooks/getWindowDimensions";

const AsyncPage = React.lazy(() => {
    return import('../Page/Page')
})

const pages = props => {

    useEffect(() => {
        console.log('url - ', props.history.location.pathname.split('/')[2])
    })

    const { width, height } = getWindowDimensions();

    let sidedrawer;
    let displayPanelContents;
    if (props.history.location.pathname === '/pages') {
        sidedrawer = <BrowsePagesSidedrawer />;
        displayPanelContents = <Managed />;
    } else if (props.history.location.pathname === '/pages/create') {
        sidedrawer = <CreatePageSidedrawer />
        displayPanelContents = <PagePreview preview="PAGE"/>
    } else if (props.history.location.pathname === `/pages/${props.history.location.pathname.split('/')[2]}`) {
        sidedrawer = <ManagePageSidedrawer />
    }

    return (
        <div className={classes.FullPage}>
            {sidedrawer}
            <div className={classes.PreviewPanel}  style={{width: `${width - 355}px`}}>
                {displayPanelContents}
                <Route path='/pages/:id' component={AsyncPage} />
            </div>
        </div>
    )
}


export default pages;