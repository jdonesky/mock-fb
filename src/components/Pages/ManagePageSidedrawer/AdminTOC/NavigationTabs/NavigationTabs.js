
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import classes from './NavigationTabs.css';
import NavTab from './NavTab/NavTab';

const navigationTabs = props => {

    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])

    useEffect(() => {
        if (displayPage !== props.history.location.pathname.split('/')[3]) {
            setDisplayPage(props.history.location.pathname.split('/')[3])
        }
    })


    let tabs = [
        {name: 'Page', path: `/pages/manage/${displayPage}`},
        {name: 'Inbox', path:`/pages/inbox/${displayPage}`},
        {name: 'Notifications', path:`/pages/manage/${displayPage}/notifications`},
        {name: 'Edit Page Info', path:`/pages/manage/${displayPage}/edit`},
        {name: 'Settings', path:`/pages/manage/${displayPage}/settings`},
    ]

    tabs = tabs.map((tab,i) => (
        <NavTab
            key={i}
            name={tab.name}
            path={tab.path}
        />
    ))

    return (
        <div className={classes.TabsContainer}>
            {tabs}
        </div>
    )
}


export default withRouter(navigationTabs);