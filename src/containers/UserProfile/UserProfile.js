import React, { useState,useEffect,useContext, Suspense } from "react";
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

const ProfileAbout = React.lazy(() => {
  return import('../../components/Profile/ProfileAbout/ProfileAbout')
})

  const userProfile = (props) => {

    const {onFetchProfile,userId,authToken} = props
    const deleteContext = useContext(DeleteContext)

    useEffect(() => {
      onFetchProfile(userId, authToken);
    }, [onFetchProfile,userId,authToken])

    const closeModal = () => {
        deleteContext.toggleModal()
    }

    const deleteModal = (
        <Modal show={deleteContext.showModal} close={closeModal}>
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
                <div className={sharedClasses.SubmitOrCancel} style={{marginLeft: 'auto'}}>
                  <Button addClass="Neutral" clicked={deleteContext.toggleModal} type="button">Cancel</Button>
                  <Button addClass="Save" type="submit">Confirm</Button>
                </div>
              </div>
            </div>
        </Modal>
    )

    return (
        <React.Fragment>
            {deleteModal}
            <div className={classes.UserProfile}>
              <ProfilePics />
              <ProfileHeader name={props.name}/>
              <Switch>
                <Route path="/user-profile/about" render={(props) => (
                    <Suspense fallback={<h1>...Loading</h1>}>
                      <ProfileAbout {...props}/>
                    </Suspense>
                )} />
              </Switch>
            </div>
        </React.Fragment>
    )
  }


const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    key: state.profile.firebaseKey,
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
