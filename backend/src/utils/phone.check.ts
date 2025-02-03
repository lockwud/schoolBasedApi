import { HttpStatus } from './http-status';
import { throwError} from '../middleware/errorHandler';
import { catchAsync } from './catchAsync';


export const phoneValidator = async(phone: string) => {
   const prefix = "+233";
   if (phone.match(/^\+233\d{9}$/)) {
    phone = prefix + phone;
   }else if (phone[0] === "0" && phone.length === 9) {
    phone = prefix + phone.slice(1);
    return phone;
   }else{
    throwError(HttpStatus.BAD_REQUEST, "Invalid phone number");
   }
};


export const checkMobileNetwork = async(phone: string) => {
    const Mtn = ["024","025","054", "055", "053", "059"]
    const AirtelTigo = ["027", "057", "026", "057"]
    const Telecel = ["020", "050"]
    const mtnMatch = Mtn.includes(phone.slice(0, 3));
    const airtelTigoMatch = AirtelTigo.includes(phone.slice(0, 3));
    const telecelMatch = Telecel.includes(phone.slice(0, 3));
    if (mtnMatch || airtelTigoMatch || telecelMatch) {
        return phone
    } else {
      throwError(HttpStatus.FORBIDDEN, "Phone number not supported");
    }
};



