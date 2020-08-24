import React from "react";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const layout = (props) => {
  return (
    <React.Fragment>
      <Toolbar />
      <header>Sidedrawer</header>
      <hr></hr>
      <div>Application Content</div>
      {props.children}
    </React.Fragment>
  );
};

export default layout;
