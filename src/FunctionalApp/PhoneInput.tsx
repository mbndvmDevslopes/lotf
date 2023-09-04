import React, { useRef, ChangeEventHandler } from 'react';

import { PhoneInputState } from '../types';

type FormProps = {
  phoneInputState: PhoneInputState;
  setPhoneInputState: React.Dispatch<React.SetStateAction<PhoneInputState>>;
};

export const PhoneInput: React.FC<FormProps> = ({
  setPhoneInputState,
  phoneInputState,
}) => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const refs = [ref0, ref1, ref2, ref3];
  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;
      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0;

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex
          ? e.target.value.replace(/\D/g, '').slice(0, currentMaxLength) //allow only digits and limit typing length to lengths array
          : phoneInput
      ) as PhoneInputState;
      setPhoneInputState(newState);
      if (shouldGoToNextRef) {
        nextRef?.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef?.current?.focus();
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          name="1"
          id="phone-input-1"
          value={phoneInputState[0]}
          onChange={createOnChangeHandler(0)}
          ref={ref0}
        />
        -
        <input
          type="text"
          name="2"
          id="phone-input-2"
          value={phoneInputState[1]}
          onChange={createOnChangeHandler(1)}
          ref={ref1}
        />
        -
        <input
          type="text"
          name="3"
          id="phone-input-3"
          value={phoneInputState[2]}
          onChange={createOnChangeHandler(2)}
          ref={ref2}
        />
        -
        <input
          type="text"
          name="4"
          id="phone-input-4"
          value={phoneInputState[3]}
          onChange={createOnChangeHandler(3)}
          ref={ref3}
        />
      </div>
    </div>
  );
};
