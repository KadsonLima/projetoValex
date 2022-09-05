import { CardInsertData, findByCardDetails, findByTypeAndEmployeeId, insert, TransactionTypes, update } from "../repositories/cardRepository";
import { nameFormatterCard } from "../utils/nameFormatter";
import { cardCryptCVC, cardCryptPassword, cardGenerator, verifyCardCVC, verifyCardPassword } from "../utils/cardUtils";
import { validateDataCard } from "../utils/expirationDate";
import { findByCardId as findRecharge } from "../repositories/rechargeRepository";
import { findByCardId as findPayments } from "../repositories/paymentRepository";
import {validateService} from './validateService';


async function createCard(employeeId:number, typeCard:TransactionTypes, apiKey:string) {
      
    const Company = await validateService.verifyKey(apiKey);
    await validateService.verifyTypeCard(typeCard, employeeId);
    const User = await validateService.verifyEmployee(employeeId, Company);
  
    const {CVC, numberCard, validateCard} = cardGenerator();
    const cardHolderName = nameFormatterCard(User.fullName)
    
    const CVCCryptor = cardCryptCVC(CVC);

    const CardFormater = {
        employeeId: employeeId,
        number: numberCard,
        cardholderName: cardHolderName,
        securityCode: CVCCryptor,
        expirationDate: validateCard,
        isVirtual: true,
        isBlocked: true,
        type: typeCard
    }
    
    await insert(CardFormater);
    const dataCard = {cardHolderName, CVC, numberCard, validateCard}
    return dataCard;
}

async function activeCard(CVC:string, password:string, cardNumber:string, cardHolderName:string, expirationDate:string) {
      
    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate);

    if(cardDetails.password !== null|| !cardDetails.isBlocked) throw {code:409, message:'Card is already activated'}

    validateDataCard(expirationDate);

    verifyCardCVC(CVC, cardDetails.securityCode);

    const passwordCrypt = cardCryptPassword(password);

    const cardDataUpdate = { isBlocked:false, password:passwordCrypt};

    await update(cardDetails.id, cardDataUpdate);
    
    return 
}

async function getBalanceCard(cardNumber:string, cardHolderName:string, expirationDate:string) {

    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate);

    const recharges = await findRecharge(cardDetails.id);
    const payments = await findPayments(cardDetails.id);

    const balance = recharges.map(recharge => recharge.amount ).reduce((total, recharge) => total + recharge);
    const payment = payments.map(payment => payment.amount ).reduce((total, payment) => total + payment);

    const transactionsInfos = {
        balance:balance - payment,
        "transactions":payments,
        "recharges":recharges
    }
   
    return transactionsInfos
}

async function blockCard(password:string, cardNumber:string, cardHolderName:string, expirationDate:string) {

    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate);

    validateDataCard(expirationDate);

    if(cardDetails.isBlocked){
        throw {code:409, message:"Card already blocked !!"}
    }
    verifyCardPassword(password, cardDetails.password);

    await update(cardDetails.id, {isBlocked:true});
}

async function unblockCard(password:string, cardNumber:string, cardHolderName:string, expirationDate:string) {

    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate);

    validateDataCard(expirationDate);

    if(!cardDetails.isBlocked){
        throw {code:409, message:"Card already unblocked !!"}
    }
    verifyCardPassword(password, cardDetails.password);

    await update(cardDetails.id, {isBlocked:false});
}




export const cardService = {createCard, activeCard, getBalanceCard, blockCard, unblockCard, }