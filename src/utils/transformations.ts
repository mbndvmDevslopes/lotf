export const capitalize = (city: string) => {
  const words = city.toLowerCase().split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' ');
};

export const formatPhoneNumber = (phoneNumber: string) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`

  const formattedPhoneNumber = [];
  for (let i = 0; i < phoneNumber.length; i += 2) {
    formattedPhoneNumber.push(phoneNumber.slice(i, i + 2));
  }

  return formattedPhoneNumber.join('-');
};
