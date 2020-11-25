
import React, {useEffect} from 'react';
import classes from './Reactions.css'

import Like from '../../../../../../assets/images/PostReactionIcons/Like'
import Love from '../../../../../../assets/images/PostReactionIcons/love2'

const reactions = (props) => {

    useEffect(() => {
        let names;
        if (props.reactions && props.reactions.length) {
            names = props.reactions.map(reaction => reaction.name);
            if (names.length === 1) {
                names = names[0]
            } else if (names.length === 2) {
                names = `${names[0]} and ${names[1]}`
            } else {
                let last = names.pop();
                console.log('last', last);
                console.log('names', names)
                names = names.join(', ') + ' and ' + last;
                console.log(names);
            }
        }
        console.log(names)
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
    if (props.reactions && props.reactions.length) {
        names = props.reactions.map(reaction => reaction.name);
        if (names.length === 1) {
            names = names[0]
        } else if (names.length === 2) {
            names = `${names[0]} and ${names[1]}`
        } else {
            let last = names.pop();
            names = names.join(', ') + ' and ' + last;
        }
    }

    return (
        <div className={classes.ReactionsContainer}>
            <div className={classes.IconsContainer}>
                {icons}
            </div>
            <div className={classes.Names}>
                {names}
            </div>
        </div>
    )
}

export default reactions;