import { Component } from 'react';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';
import { ProfileInformation } from '../ProfileInformation';


type ClassAppState = {
  userData: UserInformation;
};

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state = {
    userData: {
      email: '',
      firstName: '',
      lastName: '',
      city: '',
      phone: '',
    },
  };

  handleUpdateUserData = (newUserData: UserInformation) => {
    this.setState({ userData: newUserData });
  };
  render() {
    let shouldSetNull = true;
    if (Object.values(this.state.userData).every((value) => value === '')) {
      shouldSetNull = true;
    } else {
      shouldSetNull = false;
    }

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            shouldSetNull ? null : this.state.userData
          }
        />
        <ClassForm
          userData={this.state.userData}
          handleUpdateUserData={this.handleUpdateUserData}
        />
      </>
    );
  }
}
