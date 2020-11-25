
import React, {useState} from 'react';
import classes from './Reactions.css'

import Like from '../../../../../../assets/images/PostReactionIcons/Like'
import Love from '../../../../../../assets/images/PostReactionIcons/love2'

const reactions = (props) => {

    const [showOtherNames, setShowOtherNames] = useState(false);

    const openNamesDropdown = () => {
        setShowOtherNames(true);
    }

    const closeNamesDropdown = () => {
        setShowOtherNames(false);
    }

    let iconTypes;
    if (props.reactions && props.reactions.length) {
        iconTypes = new Set();
        props.reactions.forEach(reaction => {
            iconTypes.add(reaction.caption);
        })
        iconTypes = [...iconTypes]
    }

    let icons;
    if (iconTypes && iconTypes.length) {
       icons = iconTypes.map((type, i) => {
           if (type === 'Like') {
               return (
                   <div key={i} className={classes.IconContainer} style={{backgroundColor: 'blue', zIndex: i + 1, position: 'absolute', left: `${(i+1)*18}px`}}>
                       <div className={[classes.Icon, classes.Like].join(" ")}>
                           <Like />
                       </div>
                   </div>
               )
           }
           if (type === 'Love') {
               return (
                   <div key={i} className={classes.IconContainer} style={{backgroundColor: 'red', zIndex: i + 1, position: 'absolute', left: `${(i+1)*18}px`}}>
                       <div className={[classes.Icon, classes.Love].join(" ")}>
                           <Love />
                       </div>
                   </div>
               )
           }
       })
    }

    let names;
    let otherNames;
    if (props.reactions && props.reactions.length) {
        names = props.reactions.map(reaction => reaction.name);
        if (names.length === 1) {
            names = names[0]
        } else if (names.length === 2) {
            names = `${names[0]} and ${names[1]}`
        } else {
            let last = names.pop();
            otherNames = [...names].map(name => (<b style={{marginBottom: '2px'}}>{name}</b>))
            names = last + ' and ' + otherNames.length + ' others'
        }
    }

    let namesDropdown;
    if (otherNames && otherNames.length && showOtherNames) {
        namesDropdown = (
            <div className={classes.OtherNamesDropdown}>
                {otherNames}
            </div>
        )
    }


    return (
        <div className={classes.ReactionsContainer}>
            <div className={classes.IconsContainer}>
                {icons}
            </div>
            <div className={classes.DropdownPositioner}>
                <div className={classes.Names} onMouseEnter={openNamesDropdown} onMouseLeave={closeNamesDropdown}>
                    {names}
                </div>
                {namesDropdown}
            </div>
        </div>
    )
}

export default reactions;