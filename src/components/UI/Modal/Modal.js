import React from 'react' 
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.Modal} show={props.show} close={props.close}>
        {props.children}
      </div>
      <Backdrop show={props.show} close={props.close} />
    </React.Fragment>
  );
};

export default modal