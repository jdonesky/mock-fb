
import React, {useEffect} from 'react';
import * as actions from '../../store/actions/index';
import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';


const home = (props) => {

    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <CreatePostModal />
            <div style={{position:'absolute'}}>PLACEHOLDER</div>
        </React.Fragment>
    )
};

export default home;