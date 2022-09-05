import {faker} from '@faker-js/faker/locale/pt_BR';
import { expirationData } from './expirationDate';
import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTRCVC)

export function cardGenerator(){
    const validateCard = expirationData()
    const CVC = faker.finance.creditCardCVV();
    const numberCard = faker.finance.creditCardNumber();

    return {CVC, numberCard, validateCard}
}

export function cardCryptCVC(CVC:string){
    return cryptr.encrypt(CVC)
}

export function verifyCardCVC(CVC:string, CVCCryptor:string){
    const decryptedCvC = cryptr.decrypt(CVCCryptor)
    if(decryptedCvC !== CVC){
        throw {code:401, message:"CVC Errada"}
    }
}

export function cardCryptPassword(password:string):string{
    const passCrypt = bcrypt.hashSync(password, 10)

    return passCrypt
}

export function verifyCardPassword(password:string, passCrypt:string){
    const result = bcrypt.compareSync(password, passCrypt)
    if(!result) throw {code:401, message:'Incorrect Password !'}
}
