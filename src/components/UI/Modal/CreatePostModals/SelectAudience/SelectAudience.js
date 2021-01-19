
import React, {useContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./SelectAudience.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";

const selectAudience = props => {

    const postContext = useContext(PostContext);

    useEffect(() => {
        console.log(selection);
    })
    const [selection, setSelection] = useState('public');


    return (
        <div>
            <section className={baseClasses.Header}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Select Audience</h3>
                </div>
            </section>
            <section className={classes.PrivacyOptions}>
                <div className={classes.Option}>
                    <div className={classes.OptionLeftBlock}>
                        <div className={classes.OptionIconContainer}>
                            <div className={[classes.OptionIcon, classes.PublicIcon].join(" ")}></div>
                        </div>
                        <div className={classes.TextContainer}>
                            <div className={classes.OptionText}>Public</div>
                            <div className={classes.OptionSubText}>Anyone on or off dumb facebook</div>
                        </div>
                    </div>
                    <div className={classes.RadioContainer} onClick={() => setSelection('public')}>
                        <div className={classes.RadioInput}>
                            <input type="radio" checked={selection === 'public'}/>
                        </div>
                    </div>
                </div>
                <div className={classes.Option}>
                    <div className={classes.OptionLeftBlock}>
                        <div className={classes.OptionIconContainer}>
                            <div className={[classes.OptionIcon, classes.FriendsIcon].join(" ")}>
                            </div>
                        </div>
                        <div className={classes.TextContainer}>
                            <div className={classes.OptionText}>Friends</div>
                            <div className={classes.OptionSubText}>Your friends on dumb facebook</div>
                        </div>
                    </div>
                    <div className={classes.RadioContainer}>
                        <div className={classes.RadioInput} onClick={() => setSelection('friends')}>
                            <input type="radio" checked={selection === 'friends'}/>
                        </div>
                    </div>
                </div>
                <div className={classes.Option}>
                    <div className={classes.OptionLeftBlock}>
                        <div className={classes.OptionIconContainer}>
                            <div className={[classes.OptionIcon, classes.PrivateIcon].join(" ")}>
                            </div>
                        </div>
                        <div className={classes.OptionText}>Only Me</div>
                    </div>
                    <div className={classes.RadioContainer} onClick={() => setSelection('private')}>
                        <div className={classes.RadioInput}>
                            <input type="radio" checked={selection === 'private'}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default selectAudience;