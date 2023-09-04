import { ChangeEvent, Component } from 'react';

import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { isEmailValid, isNameValid, isCityValid } from '../utils/validations';
import { allCities } from '../utils/all-cities';
import { isPhoneNumberValid } from '../utils/validations';
import { PhoneInputState } from '../types';
import { ClassTextInput } from './ClassTextInput';
import { ClassPhoneInput } from './ClassPhoneInput';

type ErrorMessages = {
  [key: string]: string;
};

const errorMessages: ErrorMessages = {
  firstName: 'First name must be at least 2 characters long',
  lastName: 'Last name must be at least 2 characters long',
  email: 'Email is Invalid',
  city: 'State is Invalid',
  phoneNumber: 'Invalid Phone Number',
};

type GameBoardProps = {
  userData: UserInformation;
  handleUpdateUserData: (newUserData: UserInformation) => void;
};

export class ClassForm extends Component<GameBoardProps> {
  state = {
    formInputs: { firstName: '', lastName: '', email: '', city: '', phone: '' },
    phoneInputState: ['', '', '', ''] as PhoneInputState,
    isSubmitted: false,
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [name]: value,
      },
    });
  };
  updatePhoneInputState = (newState: PhoneInputState) => {
    this.setState({ phoneInputState: newState });
  };
  render() {
    const [isFirstNameInputValid, isLastNameInputValid] = [
      this.state.formInputs.firstName,
      this.state.formInputs.lastName,
    ].map(isNameValid);
    const cityNotBlank = isCityValid(this.state.formInputs.city);
    const validEmail = isEmailValid(this.state.formInputs.email);
    const validPhoneNumber = isPhoneNumberValid(this.state.phoneInputState);

    const shouldShowFirstNameError =
      !isFirstNameInputValid && this.state.isSubmitted;
    const shouldShowLastNameError =
      !isLastNameInputValid && this.state.isSubmitted;
    const shouldShowEmailError = !validEmail && this.state.isSubmitted;
    const shouldShowCityError = !cityNotBlank && this.state.isSubmitted;
    const shouldShowPhoneNumberError =
      !validPhoneNumber && this.state.isSubmitted;
const resetForm = () => {
  this.setState({
    formInputs: { firstName: '', lastName: '', email: '', city: '', phone: '' },
  });
  this.setState({ phoneInputState: ['', '', '', ''] });
  this.setState({ isSubmitted: false });
};
    const updateFormData = () => {
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
        const updatedFormInputs = {
          ...this.state.formInputs,
          phone: this.state.phoneInputState.join(''),
        };

        this.props.handleUpdateUserData(updatedFormInputs);
        resetForm();

      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      this.setState({ isSubmitted: true });

      updateFormData();
    };

    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}

        <ClassTextInput
          label={'First Name'}
          inputProps={{
            value: this.state.formInputs.firstName,
            placeholder: 'Bilbo',
            name: 'firstName',
            onChange: this.handleInputChange,
          }}
        />
        {shouldShowFirstNameError && (
          <ErrorMessage message={errorMessages.firstName} show={true} />
        )}

        {/* last name input */}
        <ClassTextInput
          label={'Last Name'}
          inputProps={{
            value: this.state.formInputs.lastName,
            placeholder: 'Baggins',
            name: 'lastName',
            onChange: this.handleInputChange,
          }}
        />

        {shouldShowLastNameError && (
          <ErrorMessage message={errorMessages.lastName} show={true} />
        )}

        {/* Email Input */}
        <ClassTextInput
          label={'Email'}
          inputProps={{
            value: this.state.formInputs.email,
            placeholder: 'bilbo-baggins@adventurehobbits.net',
            name: 'email',
            onChange: this.handleInputChange,
          }}
        />

        {shouldShowEmailError && (
          <ErrorMessage message={errorMessages.email} show={true} />
        )}

        {/* City Input */}

        <div className="input-wrap">
          <label>{'City'}:</label>
          <input
            placeholder="Hobbiton"
            type="text"
            list="cities"
            value={this.state.formInputs.city}
            onChange={this.handleInputChange}
            name="city"
          />
          <datalist id="cities">
            {allCities.map((city, index) => (
              <option value={city} key={index}></option>
            ))}
          </datalist>
        </div>
        {shouldShowCityError && (
          <ErrorMessage message={errorMessages.city} show={true} />
        )}

        <div className="input-wrap">
          <ClassPhoneInput
            phoneInputState={this.state.phoneInputState}
            updatePhoneInputState={this.updatePhoneInputState}
          />
        </div>
        {shouldShowPhoneNumberError && (
          <ErrorMessage message={errorMessages.phoneNumber} show={true} />
        )}

        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    );
  }
}
