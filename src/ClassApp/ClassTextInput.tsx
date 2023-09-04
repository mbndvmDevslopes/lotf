import { ComponentProps, Component } from 'react';

type TextInputProps = {
  label: string;

  inputProps: ComponentProps<'input'>;
};

export class ClassTextInput extends Component<TextInputProps> {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.props.label}:</label>
        <input type="text" {...this.props.inputProps} />
      </div>
    );
  }
}
