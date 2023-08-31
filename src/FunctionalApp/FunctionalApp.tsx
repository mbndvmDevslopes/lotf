import { ProfileInformation } from '../ProfileInformation';
import { FunctionalForm } from './FunctionalForm';
import { useState } from 'react';
import { PhoneInput } from './PhoneInput';

export const FunctionalApp = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
  });

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm setUserData={setUserData} />
      <PhoneInput />
    </>
  );
};
