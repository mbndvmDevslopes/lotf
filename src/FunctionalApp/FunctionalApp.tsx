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
  const [rawData, setRawData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone1: '',
    phone2: '',
    phone3: '',
    phone4: '',
  });

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm setRawData={setRawData} />
      <PhoneInput />
    </>
  );
};
