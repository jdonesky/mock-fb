import React, { Component } from "react";

class ImageField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const {
      input: { onChange },
    } = this.props;
    onChange(e.target.file[0]);
  }

  render() {
    const {
      input: { value },
    } = this.props;
    const { input, label, required, meta } = this.props; ///< feed these props to the field from redux state
    return (
      <div>
        <label>{label}</label>
        <div>
          <input type="file" accept="image/*" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}



export default ImageField;
