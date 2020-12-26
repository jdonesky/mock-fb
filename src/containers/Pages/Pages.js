import React, {useEffect} from 'react';
import classes from './Pages.css'
import {Route, Switch} from 'react-router-dom'

import Managed from '../../components/Pages/BrowsePagesSidedrawer/Managed/Managed';
import PagePreview from '../../components/Create/PagePreview/PagePreview';
import getWindowDimensions from "../../hooks/getWindowDimensions";

const AsyncPage = React.lazy(() => {
    return import('../Page/Page')
})

const AsyncBrowsePagesSidedrawer = React.lazy(() => {
    return import('../../components/Pages/BrowsePagesSidedrawer/BrowsePagesSidedrawer');
})

const AsyncManagePagesSidedrawer = React.lazy(() => {
    return import('../../components/Pages/ManagePageSidedrawer/ManagePageSidedrawer');
})

const AsyncCreatePageSidedrawer = React.lazy(() => {
    return import('../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer');
})


const pages = props => {

    const { width, height } = getWindowDimensions();

    let displayPanelContents;
    if (props.history.location.pathname === '/pages') {
        displayPanelContents = <Managed />;
    } else if (props.history.location.pathname === '/pages/create') {
        displayPanelContents = <PagePreview preview="PAGE"/>
    } else if (props.history.location.pathname === `/pages/${props.history.location.pathname.split('/')[2]}`) {
    }

    return (
        <div className={classes.FullPage}>
            <Switch>
                <Route path='/pages/manage' component={AsyncManagePagesSidedrawer}/>
                <Route path='/pages/create' exact component={AsyncCreatePageSidedrawer}/>
                <Route path='/pages/discover' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages/liked' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages/invites' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages' exact component={AsyncBrowsePagesSidedrawer}/>
            </Switch>
            <div className={classes.PreviewPanel}  style={{width: `${width - 355}px`}}>
                {displayPanelContents}
                <Route path='/pages/:hub/:id' component={AsyncPage}/>
            </div>
        </div>
    )
}


export default pages;