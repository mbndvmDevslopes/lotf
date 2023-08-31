import { useState } from 'react';

import { ErrorMessage } from '../ErrorMessage';
import { isEmailValid, isNameValid, isCityValid } from '../utils/validations';
import { allCities } from '../utils/all-cities';

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
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

export const FunctionalForm: React.FC<FormProps> = ({
  setUserData,
  userData,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneInputState, setPhoneInputState] = useState(['', '', '']);
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

  const shouldShowFirstNameError = !isFirstNameInputValid && isSubmitted;
  const shouldShowLastNameError = !isLastNameInputValid && isSubmitted;
  const shouldShowEmailError = !validEmail && isSubmitted;
  const shouldShowCityError = !cityNotBlank && isSubmitted;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
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
      !cityNotBlank
    ) {
      alert('bad data');
      return;
    } else {
      setUserData(formInputs);
      setFormInputs(initialFormInputs);
      setIsSubmitted(false);
    }
  };
  return (
    <form>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{'First Name'}:</label>
        <input
          value={formInputs.firstName}
          placeholder="Bilbo"
          name="firstName"
          onChange={handleChange}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label>{'Last Name'}:</label>
        <input
          placeholder="Baggins"
          name="lastName"
          onChange={handleChange}
          value={formInputs.lastName}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{'Email'}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          name="email"
          onChange={handleChange}
          value={formInputs.email}
        />
      </div>
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

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" onClick={handleSubmit} />
    </form>
  );
};
