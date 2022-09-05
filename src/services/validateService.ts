import { CardInsertData, findByCardDetails, findByTypeAndEmployeeId, insert, TransactionTypes, update } from "../repositories/cardRepository";
import { Company, findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";


async function verifyTypeCard(typeCard:TransactionTypes, employeeId:number) {

    const Card = await findByTypeAndEmployeeId(typeCard, employeeId)

    if(Card) throw {code:409, message:"O empregado já tem um Cartão do mesmo tipo"}

    return Card;
    
}

async function verifyCard(cardNumber:string, cardHolderName:string, expirationDate:string) {

    const cardDetails = await findByCardDetails(cardNumber, cardHolderName, expirationDate);

    if(!cardDetails) throw {code:404}

    return cardDetails;
    
}

async function verifyEmployee(employeeId:number, Company:Company) {

    const User = await findById(employeeId)

    if(!User){throw {code:404, message:'Employee Not Found!'}}

    if(User.companyId !== Company.id) throw {code:401, message:"Employee is not of the Company!"}

    return User;
    
}

async function verifyKey(apiKey:string) {

    const Company = await findByApiKey(apiKey)

    if(!Company) throw {code:401, message:"Unauthorized"}

    return Company;
    
}



export const validateService = {verifyTypeCard, verifyEmployee, verifyKey, verifyCard}