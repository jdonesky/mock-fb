

import React from 'react';
import classes from './InboxTOC.css';

const inboxTOC = props => {
    return (
        <div className={classes.Container}>
            <section className={classes.NavSection}>
                <div className={classes.SubHeader}>Messages</div>
                <div className={classes.CategoryTab}>
                    <div className={classes.IconContainer}>
                        <div className={classes.Icon}></div>
                    </div>
                    <div className={classes.CategoryText}>All Messages</div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={classes.NavSection}>
                <div className={classes.SubHeader}>Comments</div>
                <div className={classes.CategoryTab}>
                    <div className={classes.IconContainer}>
                        <div className={classes.Icon}></div>
                    </div>
                    <div className={classes.CategoryText}>Dumb Facebook</div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={classes.NavSection}>
                <div className={classes.CategoryTab}>
                    <div className={classes.IconContainer}>
                        <div className={classes.Icon}></div>
                    </div>
                    <div className={classes.CategoryText}>Automated Responses</div>
                </div>

            </section>
        </div>
    )
}

export default inboxTOC;
