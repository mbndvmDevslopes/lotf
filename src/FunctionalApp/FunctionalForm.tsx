import { useState } from 'react';

import { PhoneInputState } from '../types';

import { FunctionTextInput } from './FunctionTextInput';
import { PhoneInput } from './PhoneInput';
import { ErrorMessage } from '../ErrorMessage';
import { isEmailValid, isNameValid, isCityValid } from '../utils/validations';
import { allCities } from '../utils/all-cities';
import { isPhoneNumberValid } from '../utils/validations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};

type FormProps = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

export const FunctionalForm: React.FC<FormProps> = ({ setUserData }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>([
    '',
    '',
    '',
    '',
  ]);
  const initialFormInputs = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
  };

  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const isFirstNameInputValid = isNameValid(formInputs.firstName);
  const isLastNameInputValid = isNameValid(formInputs.lastName);
  const validEmail = isEmailValid(formInputs.email);
  const cityNotBlank = isCityValid(formInputs.city);
  const validPhoneNumber = isPhoneNumberValid(phoneInputState);

  const shouldShowFirstNameError = !isFirstNameInputValid && isSubmitted;
  const shouldShowLastNameError = !isLastNameInputValid && isSubmitted;
  const shouldShowEmailError = !validEmail && isSubmitted;
  const shouldShowCityError = !cityNotBlank && isSubmitted;
  const shouldShowPhoneNumberError = !validPhoneNumber && isSubmitted;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setFormInputs(initialFormInputs);
    setPhoneInputState(['', '', '', '']);
    setIsSubmitted(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);
    dataValidation();
  };
  const dataValidation = () => {
    if (
      !isFirstNameInputValid ||
      !isLastNameInputValid ||
      !validEmail ||
      !cityNotBlank ||
      !validPhoneNumber
    ) {
      alert('bad data');
      return;
    } else {
      //setRawData(formInputs);
      //setRawData({
      setUserData({
        ...formInputs,
        phone: phoneInputState.join(''),
      });
      console.log(formInputs);
      /* setFormInputs(initialFormInputs);
      setIsSubmitted(false); */
      console.log(phoneInputState);
      resetForm();
    }
  };
  return (
    <form>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionTextInput
        label={'First Name'}
        inputProps={{
          value: formInputs.firstName,
          placeholder: 'Bilbo',
          name: 'firstName',
          onChange: handleChange,
        }}
      />

      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />

      {/* last name input */}
      <FunctionTextInput
        label={'Last Name'}
        inputProps={{
          value: formInputs.lastName,
          placeholder: 'Baggins',
          name: 'lastName',
          onChange: handleChange,
        }}
      />

      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />

      {/* Email Input */}

      <FunctionTextInput
        label={'Email'}
        inputProps={{
          value: formInputs.email,
          placeholder: 'bilbo-baggins@adventurehobbits.net',
          name: 'email',
          onChange: handleChange,
        }}
      />

      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{'City'}:</label>
        <input
          placeholder="Hobbiton"
          type="text"
          list="cities"
          value={formInputs.city}
          onChange={handleChange}
          name="city"
        />
        <datalist id="cities">
          {allCities.map((city, index) => (
            <option value={city} key={index}></option>
          ))}
        </datalist>
      </div>
      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      <PhoneInput
        setPhoneInputState={setPhoneInputState}
        phoneInputState={phoneInputState}
      />
      {/* <div className="input-wrap">
         <label htmlFor="phone">Phone:</label> 
        <div id="phone-input-wrap">
          {/* <input
            name="phone1"
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={formInputs.phone1}
            onChange={handleChange}
          />
          -
          <input
            name="phone2"
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={formInputs.phone2}
            onChange={handleChange}
          />
          -
          <input
            name="phone3"
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={formInputs.phone3}
            onChange={handleChange}
          />
          <input
            name="phone4"
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={formInputs.phone4}
            onChange={handleChange}
          />
        </div>
      </div>*/}

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberError}
      />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </form>
  );
};
