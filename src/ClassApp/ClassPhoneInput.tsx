import React, { createRef, ChangeEventHandler, Component } from 'react';
import { PhoneInputState } from '../types';

type PhoneInputProps = {
  phoneInputState: string[];
  updatePhoneInputState: (newState: PhoneInputState) => void;
};

export class ClassPhoneInput extends Component<
  PhoneInputProps,
  PhoneInputState
> {
  /*   ref0: RefObject<HTMLInputElement> = createRef(); */
  ref0 = createRef<HTMLInputElement>();
  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();

  phonRefs = [this.ref0, this.ref1, this.ref2, this.ref3];

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = this.phonRefs[index + 1];
      const prevRef = this.phonRefs[index - 1];
      const value = e.target.value;
      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0;

      const newState = this.props.phoneInputState.map(
        (phoneInput, phoneInputIndex) =>
          index === phoneInputIndex
            ? e.target.value.replace(/\D/g, '').slice(0, currentMaxLength) //allow only digits and limit typing length to lengths array
            : phoneInput
      ) as PhoneInputState;
      this.props.updatePhoneInputState(newState);

      if (shouldGoToNextRef) {
        nextRef?.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef?.current?.focus();
      }
    };
  render() {
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            name="1"
            id="phone-input-1"
            value={this.props.phoneInputState[0]}
            onChange={this.createOnChangeHandler(0)}
            ref={this.ref0}
            placeholder="88"
          />
          -
          <input
            type="text"
            name="2"
            id="phone-input-2"
            value={this.props.phoneInputState[1]}
            onChange={this.createOnChangeHandler(1)}
            ref={this.ref1 as React.RefObject<HTMLInputElement>}
            placeholder="88"
          />
          -
          <input
            type="text"
            name="3"
            id="phone-input-3"
            value={this.props.phoneInputState[2]}
            onChange={this.createOnChangeHandler(2)}
            ref={this.ref2 as React.RefObject<HTMLInputElement>}
            placeholder="88"
          />
          -
          <input
            type="text"
            name="4"
            id="phone-input-4"
            value={this.props.phoneInputState[3]}
            onChange={this.createOnChangeHandler(3)}
            ref={this.ref3 as React.RefObject<HTMLInputElement>}
            placeholder="8"
          />
        </div>
      </div>
    );
  }
}
