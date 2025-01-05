import * as crypto from "crypto"
export const generateReferallCode = async()=>{
    const code =  crypto.randomUUID().slice(0, 6).toString();
    return code
};