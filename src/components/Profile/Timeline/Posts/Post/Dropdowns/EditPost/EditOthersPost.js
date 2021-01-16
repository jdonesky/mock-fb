import React, {useContext} from 'react';
import classes from '../../Post.css'
import Bookmark from "../../../../../../../assets/images/UserActionIcons/bookmark";
import Bell from "../../../../../../../assets/images/UserActionIcons/bell";
import HideFile from "../../../../../../../assets/images/UserActionIcons/hideFile";
import HideFiles from "../../../../../../../assets/images/UserActionIcons/hideFiles";
import {UnderConstructionContext} from "../../../../../../../context/under-construction-context";


const editOthersPostDropdown = (props) => {
    const underConstruction = useContext(UnderConstructionContext)

    const blockRoute = () => {
        underConstruction.openModal()
        props.close()
    }

    return (
        <div className={classes.EditDropdownContainer} style={{display: props.editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton} onClick={blockRoute}>
                <div className={classes.EditDropDownButtonIcon}><Bookmark /></div>
                <div className={classes.EditDropdownTextContainer}>
                    <span>Save Post</span>
                    <span className={classes.EditDropdownSubCaption}>Add this to your saved items</span>
                </div>
            </div>
            <div className={classes.Break} style={{margin: '8px 0'}}/>
            <div className={classes.EditDropdownButton} onClick={blockRoute}>
                <div className={classes.EditDropDownButtonIcon}><Bell /></div>
                <span>Turn on notifications for this post</span></div>
            <div className={classes.Break} style={{margin: '8px 0'}}/>
            <div className={classes.EditDropdownButton} onClick={blockRoute}>
                <div className={classes.EditDropDownButtonIcon}><HideFile /></div>
                <div className={classes.EditDropdownTextContainer}>
                    <span>Hide post</span>
                    <span className={classes.EditDropdownSubCaption}>You won't see this post anymore</span>
                </div>
            </div>
            <div className={classes.EditDropdownButton} onClick={blockRoute}>
                <div className={classes.EditDropDownButtonIcon}><HideFiles /></div>
                <div className={classes.EditDropdownTextContainer}>
                    <span>{`Hide all from ${props.posterName}`}</span>
                    <span className={classes.EditDropdownSubCaption}>You won't see posts from this account</span>
                </div>
            </div>
        </div>
    )
}

export default editOthersPostDropdown;