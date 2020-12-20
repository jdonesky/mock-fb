import React, {useState,useEffect} from 'react';
import classes from './Pages.css'

import CreatePageSidedrawer from '../../components/Pages/CreatePageSidedrawer/CreatePageSidedrawer'

const pages = props => {

    useEffect(() => {
        console.log('pages - pathname',props.history.location.pathname);
    })
    let sidedrawer;
    if (props.history.location.pathname === '/pages') {
        sidedrawer = null;
    } else if (props.history.location.pathname === '/pages/create') (
        sidedrawer = <CreatePageSidedrawer />
    )

    return (
        <div className={classes.FullPage}>
            {sidedrawer}
        </div>
    )
}


export default pages;