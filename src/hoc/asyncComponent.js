import React, { Component } from "react";

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = { component: null, error: null };

    componentDidMount() {
      importComponent()
        .then((cmp) => {
          this.setState({
            component: cmp.default,
          });
        })
        .catch((err) => {
          this.setState({
            error: err,
          });
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
