
import React, {useState} from 'react';
import EditWorkForm from "../EditContent/EditWorkForm"
import EditSchoolForm from "../EditContent/EditSchoolForm"
import EditLocationForm from "../EditContent/EditLocationForm"
import EditRelationshipForm from "../EditContent/EditRelationshipForm"
import EditContactForm from "../EditContent/EditContactForm"
import classes from "./ContentEntry.css";

const contentEntry = props => {

    const [showEditDropdown, setEditDropdown] = useState(false);
    const [editing, setEditing] = useState(true);

    let editDropdownClasses = [classes.EditDropdown]
    if (showEditDropdown) {
        editDropdownClasses.push(classes.VisibleDropdown)
    }

    const toggleEditDropdown = () => {
        setEditDropdown((prevState) => {
            return !prevState
        })
    }

    const toggleEditing = () => {
        setEditing((prevState) => {
            return !prevState
        })
    }

    let categoryIcon;
    let dropdownCaption;
    let editForm;
    switch (props.category) {
        case 'work':
            categoryIcon = 'https://www.flaticon.com/svg/static/icons/svg/1086/1086511.svg'
            dropdownCaption = 'workplace'
            editForm = <EditWorkForm cancel={toggleEditing}/>
            break;
        case 'education':
            categoryIcon = 'https://globalvoices.wm.edu/files/2014/04/Business-Graduation-cap-icon.png'
            dropdownCaption = 'school'
            editForm = <EditSchoolForm cancel={toggleEditing}/>
            break;
        case 'currLocation':
            categoryIcon = 'data:image/png;base64,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'
            dropdownCaption = 'current location'
            editForm = <EditLocationForm cancel={toggleEditing}/>
            break;
        case 'fromLocation':
            categoryIcon = 'https://static.thenounproject.com/png/14236-200.png'
            dropdownCaption = 'hometown'
            editForm = <EditLocationForm cancel={toggleEditing}/>
            break;
        case 'relationship':
            categoryIcon = 'https://static.thenounproject.com/png/77960-200.png'
            dropdownCaption = 'relationship status'
            editForm = <EditRelationshipForm cancel={toggleEditing}/>
            break;
        case 'contact':
            categoryIcon = 'https://simpleicon.com/wp-content/uploads/phone-1.png'
            dropdownCaption = 'contact information'
            editForm = <EditContactForm cancel={toggleEditing}/>
            break;
        default:
            categoryIcon = null;
            dropdownCaption = null;
            editForm = null;
    }

    let shareIcon;
    switch (props.sharedWith) {
        case 'public':
            shareIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQflbtqqJio9KclP0Zjb6n91_iGA1rZ7wFI_w&usqp=CAU'
            break;
        case 'private':
            shareIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQg2kThMLjwq1WJbNWm_pa3HwcY1HAT9bf2BA&usqp=CAU'
            break;
        case 'friends':
            shareIcon = 'https://www.cwc.edu/media/marketing-files/cwcedu/style-assets/icons/two-people.png'
            break;
        default:
            shareIcon = 'https://cdn4.vectorstock.com/i/1000x1000/61/68/globe-icon-on-gray-vector-7606168.jpg'
    }


    const entry = (
        <div className={classes.Entry}>
            <div className={classes.Icon} style={{backgroundImage: `url('${categoryIcon}')`}}/>
            <div className={classes.Text}>
                <span className={classes.MainText}>{props.mainText}</span>
                {props.subText && <span className={classes.SubText}>{props.subText}</span>}
            </div>
            <div className={classes.Icons}>
                <div className={[classes.Icon,classes.Share].join(' ')} style={{backgroundImage: `url('${shareIcon}')`}}/>
                <div className={[classes.Icon,classes.Edit].join(' ')} onClick={toggleEditDropdown}/>
                <div className={editDropdownClasses.join(' ')} >
                    <div className={classes.UpArrow}/>
                    <div className={classes.MenuItem} onClick={toggleEditing}><span className={classes.EditIcon}></span><span>{`Edit ${dropdownCaption}`}</span></div>
                    <div className={classes.MenuItem}><span className={classes.DeleteIcon}></span><span>{`Delete ${dropdownCaption}`}</span></div>
                </div>
            </div>
        </div>
    );

    let content = editing? editForm : entry;
    return content;
}

export default contentEntry;