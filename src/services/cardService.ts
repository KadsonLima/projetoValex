import { CardInsertData, findByCardDetails, findByTypeAndEmployeeId, insert, TransactionTypes, update } from "../repositories/cardRepository";
import { findById } from "../repositories/employeeRepository"
import { faker }  from '@faker-js/faker/locale/pt_BR';
import { nameFormatterCard } from "../utils/nameFormatter";
import { cardCryptCVC, cardCryptPassword, cardGenerator, verifyCardCVC } from "../utils/cardUtils";
import { findByApiKey } from "../repositories/companyRepository";
import bcrypt from 'bcrypt';
import { validateDataCard } from "../utils/expirationDate";
import { findByCardId as findRecharge } from "../repositories/rechargeRepository";
import { findByCardId as findPayments } from "../repositories/paymentRepository";

async function verifyCard(typeCard:TransactionTypes, employeeId:number) {

    const Card = await findByTypeAndEmployeeId(typeCard, employeeId)

    if(Card) throw {code:409, message:"O empregado já tem um Cartão do mesmo tipo"}

    return Card;
    
}

async function verifyEmployee(employeeId:number) {

    const User = await findById(employeeId)

    if(!User){throw {code:404, message:'Empregado não encontrado!'}}

    return User;
    
}

async function verifyKey(apiKey:string) {

    const Company = await findByApiKey(apiKey)

    if(!Company) throw {code:401, message:"Unauthorized"}

    return Company;
    
}

async function createCard(employeeId:number, typeCard:TransactionTypes, apiKey:string) {
      
    await verifyKey(apiKey);
    await verifyCard(typeCard, employeeId);
    const User = await verifyEmployee(employeeId);
  
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
      
    const cardDetails = await findByCardDetails(cardNumber, cardHolderName, expirationDate);

    if(!cardDetails || cardDetails.password !== null ) throw {code:405}

    validateDataCard(expirationDate);

    verifyCardCVC(CVC, cardDetails.securityCode);

    const passwordCrypt = cardCryptPassword(password);

    const cardDataUpdate = { isBlocked:false, password:passwordCrypt};

    await update(cardDetails.id, cardDataUpdate);
    
    return 
}

async function getBalanceCard(cardNumber:string, cardHolderName:string, expirationDate:string) {

    const cardDetails = await findByCardDetails(cardNumber, cardHolderName, expirationDate);

    if(!cardDetails) throw {code:401}

    const recharges = await findRecharge(cardDetails.id);
    const payments = await findPayments(cardDetails.id);

    //console.log("recargas", recharges, "paymesnt", payments)

    const balance = recharges.map(recharge => recharge.amount ).reduce((total, recharge) => total + recharge);
    const payment = payments.map(payment => payment.amount ).reduce((total, payment) => total + payment);

    const transactionsInfos = {
        balance:balance - payment,
        "transactions":payments,
        "recharges":recharges
    }
   
    return transactionsInfos
}


export const cardService = {createCard, activeCard, getBalanceCard}