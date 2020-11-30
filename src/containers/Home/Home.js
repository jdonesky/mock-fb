
import React, {useEffect} from 'react';
import * as actions from '../../store/actions/index';
import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';
import CreateLifeEventModal from '../../components/UI/Modal/LifeEventModals/LifeEventModal'

const home = (props) => {

    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <CreatePostModal />
            <CreateLifeEventModal />
            <div style={{position:'absolute'}}>PLACEHOLDER</div>
        </React.Fragment>
    )
};

export default home;