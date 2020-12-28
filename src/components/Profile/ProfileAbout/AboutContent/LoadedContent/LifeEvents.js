
import React from 'react';
import {connect} from 'react-redux'
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const lifeEvents = ({lifeEvents}) => {

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Life Events</h3>
                <AddContentButton category="lifeEvent" />
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        lifeEvents: state.profile.lifeEvents,
    }
}

export default connect(mapStateToProps)(lifeEvents);