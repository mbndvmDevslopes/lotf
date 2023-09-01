import { allCities } from "./all-cities";



export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}
export const isNameValid = (name:string):boolean => {
    return name.trim().length > 1 && name.split('').every((char)=> char.toLowerCase()!==char.toUpperCase() ) 
    }

 

export const isCityValid = (city: string):boolean => {
    const lowerCaseAllCities = allCities.map((city)=> city.toLocaleLowerCase())
    return city.trim() !== '' && lowerCaseAllCities.includes(city.toLowerCase())
}

export const isPhoneNumberValid =(phoneNumberArray:[string, string, string, string]) => {
    return phoneNumberArray.every((phoneElement:string) => phoneElement !=="")
}