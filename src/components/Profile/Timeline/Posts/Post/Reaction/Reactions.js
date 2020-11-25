
import React, {useEffect} from 'react';
import classes from './Reactions.css'

import Like from '../../../../../../assets/images/PostReactionIcons/Like'
import Love from '../../../../../../assets/images/PostReactionIcons/love2'

const reactions = (props) => {

    useEffect(() => {
        console.log(iconTypes);
    })

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
                   <div className={classes.IconContainer} style={{backgroundColor: 'blue', zIndex: i}}>
                       <div className={classes.Icon}>
                           <Like />
                       </div>
                   </div>
               )
           } else if (type === 'Love') {
               return (
                   <div className={classes.IconContainer} style={{backgroundColor: 'red', zIndex: i}}>
                       <div className={classes.Icon}>
                           <Love />
                       </div>
                   </div>
               )
           }
       })
    }

    const iconsContainerWidth = iconTypes.length * 18;
    return (
        <div className={classes.ReactionsContainer} style={{zIndex: -1}}>
            <div className={classes.IconsContainer} style={{width: `${iconsContainerWidth}px`}}>
                {icons}
            </div>
        </div>
    )
}

export default reactions;