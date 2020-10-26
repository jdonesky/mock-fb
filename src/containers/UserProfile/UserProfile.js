import React, {useEffect,useContext, Suspense} from "react";
import {Switch, Route} from 'react-router'
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import Modal from "../../components/UI/Modal/Modal";
import Close from "../../assets/images/close"
import axios from '../../axios/db-axios-instance'
import classes from "./UserProfile.css";
import {DeleteContext} from "../../context/delete-context";
import sharedClasses from "../../components/Profile/ProfileAbout/AboutContent/EditContent/SharedEditFormUI.css";
import Button from "../../components/UI/Button/Button";
import SquareFold from "../../components/UI/Spinner/SquareFold"

const ProfileAbout = React.lazy(() => {
  return import('../../components/Profile/ProfileAbout/ProfileAbout')
})

  const userProfile = (props) => {

    const {onFetchProfile,userId,authToken} = props
    const deleteContext = useContext(DeleteContext)

    useEffect(() => {
      onFetchProfile(userId, authToken);
    }, [onFetchProfile,userId,authToken])


    const deleteModal = (
        <Modal show={deleteContext.showModal}>
            <div className={classes.DeleteModal}>
              <div className={classes.Header}>
                <h1>Are you sure?</h1>
                <div className={classes.CancelIcon} onClick={deleteContext.toggleModal}>
                  <Close />
                </div>
              </div>
              <div className={classes.Break}/>
              <p>{`Are you sure you want to remove this ${deleteContext.caption} from your profile?`}</p>
              <div className={sharedClasses.Buttons}>
                <div className={sharedClasses.SubmitOrCancel} style={{marginLeft: 'auto', marginBottom: '10px'}}>
                  <Button addClass="Neutral" clicked={deleteContext.toggleModal}>Cancel</Button>
                  <Button addClass="Save" clicked={deleteContext.deleteEntry}>Confirm</Button>
                </div>
              </div>
            </div>
        </Modal>
    )

    let profile = (
        <React.Fragment>
          {deleteModal}
          <div className={classes.UserProfile}>
            <ProfilePics />
            <ProfileHeader name={props.name}/>
          </div>
          <div className={classes.SwitchContent}>
            <Switch>
              <Route path="/user-profile/about" render={(props) => (
                  <Suspense fallback={<SquareFold />}>
                    <ProfileAbout {...props}/>
                  </Suspense>
              )} />
            </Switch>
          </div>
        </React.Fragment>
    )

    if (props.profileLoading) {
      profile = <SquareFold />
    }

    return profile;
  }


const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    firebaseKey: state.profile.firebaseKey,
    name: state.profile.firstName + ' ' + state.profile.lastName,
    birthday: state.profile.birthday,
    location: state.profile.location,
    profileLoading: state.profile.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
