import { ComponentProps, Component } from 'react';

export class ClassTextInput extends Component {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.label}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
