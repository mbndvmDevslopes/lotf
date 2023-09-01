import { ProfileInformation } from '../ProfileInformation';
import { FunctionalForm } from './FunctionalForm';
import { useState } from 'react';

export const FunctionalApp = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
  });

  /* const [rawData, setRawData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
  }); */
  let shouldSetUserDataNull = true;
  if (Object.values(userData).every((value) => value === '')) {
    shouldSetUserDataNull = true;
  } else {
    shouldSetUserDataNull = false;
  }

  console.log(userData);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={shouldSetUserDataNull ? null : userData} />
      <FunctionalForm setUserData={setUserData} />
    </>
  );
};
