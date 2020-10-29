
import React from 'react';
import classes from './CategoryButton.css'



const categoryButton = (props) => {

    let icon;
    let caption;

    switch (props.type) {
        case "Work":
            break;
        case "Education":
            break;
        case "Relationship":
            break;
        case "Home":
            break;
        case "Family":
            break;
        case "Travel":
            break;
        case "Interests":
            break;
        case "Health":
            break;
        case "Milestones":
            break;
        case "Remembrance":
            break;
        case "Custom":
            break;
    }

    return (
        <div className={classes.Button}>
            <section className={classes.Icon}>
                {icon}
            </section>
            <p>{caption}</p>
        </div>
        );
}

export default categoryButton;