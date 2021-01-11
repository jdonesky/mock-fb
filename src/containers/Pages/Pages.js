import React, {useState,useEffect} from 'react';
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

const AsyncInboxSidedrawer = React.lazy(() => {
    return import ('../../components/Pages/InboxSideDrawer/InboxSidedrawer');
})

const AsyncCreatePageSidedrawer = React.lazy(() => {
    return import('../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer');
})


const pages = props => {

    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])
    const [viewing, setViewing] = useState(props.history.location.pathname.split('/')[2])
    const { width, height } = getWindowDimensions();

    useEffect(() => {
        console.log('viewing', viewing)
        console.log('displayPage', displayPage);
        if (viewing !== props.history.location.pathname.split('/')[2]) {
            setViewing(props.history.location.pathname.split('/')[2])
        }
        if (displayPage !== props.history.location.pathname.split('/')[3] ) {
            setDisplayPage(props.history.location.pathname.split('/')[3])
        }
    })

    let displayPanelContents;
    if (props.history.location.pathname === '/pages') {
        displayPanelContents = <Managed />;
    } else if (props.history.location.pathname === '/pages/create') {
        displayPanelContents = <PagePreview preview="PAGE"/>
    } else if (props.history.location.pathname === `/pages/inbox`) {
        // displayPanelContents =
    }

    return (
        <div className={classes.FullPage}>
            <Switch>
                <Route path='/pages/create' exact component={AsyncCreatePageSidedrawer}/>
                <Route path='/pages/discover' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages/manage' component={AsyncManagePagesSidedrawer}/>
                <Route path='/pages/inbox' component={AsyncInboxSidedrawer}/>
                <Route path='/pages/liked' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages/invites' component={AsyncBrowsePagesSidedrawer} />
                <Route path='/pages' exact component={AsyncBrowsePagesSidedrawer}/>
            </Switch>
            <div className={classes.PreviewPanel}  style={{width: viewing === 'inbox' && width > 1300 ? `${width - 655}px` : `${width - 355}px`, left: viewing === 'inbox' && width > 1300 ? '655px' : null}}>
                {displayPanelContents}
                <Route path='/pages/:hub/:id' component={AsyncPage}/>
            </div>
        </div>
    )
}


export default pages;