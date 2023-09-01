import { Component } from 'react';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';
import { ProfileInformation } from '../ProfileInformation';
type State = { userInformation: UserInformation | null };

const defaultUser: UserInformation = {
  email: 'default@default.com',
  firstName: 'Default',
  lastName: 'Default',
  phone: '1234567',
  city: 'Hobbiton',
};

export class ClassApp extends Component<Record<string, never>, State> {
  render() {
    let shouldSetNull = true;
    if (Object.values(defaultUser).every((value) => value === '')) {
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
            //shouldSetNull ? null : defaultUser
            null
          }
        />
        <ClassForm />
      </>
    );
  }
}
