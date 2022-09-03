import { CardInsertData, findByTypeAndEmployeeId, insert, TransactionTypes } from "../repositories/cardRepository";
import { findById } from "../repositories/employeeRepository"
import { faker }  from '@faker-js/faker/locale/pt_BR';
import { nameFormatterCard } from "../utils/nameFormatter";
import { cardGenerator } from "../utils/cardUtils";
import { findByApiKey } from "../repositories/companyRepository";


async function createCard(employeeId:number, typeCard:TransactionTypes, apiKey:string) {
    
    const User = await findById(employeeId)

    if(!User){throw {code:404, message:'Empregado não encontrado!'}}

    const Card = await findByTypeAndEmployeeId(typeCard, employeeId)

    if(Card) throw {code:409, message:"O empregado já tem um Cartão do mesmo tipo"}

    const Company = await findByApiKey(apiKey)

    if(!Company) throw {code:401, message:"Unauthorized"}

    const {CVC, numberCard, validateCard} = cardGenerator();
    const cardHolderName = nameFormatterCard(User.fullName)

    const CardFormater = {
        employeeId: employeeId,
        number: numberCard,
        cardholderName: cardHolderName,
        securityCode: CVC,
        expirationDate: validateCard,
        isVirtual: true,
        isBlocked: true,
        type: typeCard
    }
    
    const result = await insert(CardFormater);
    
    return result;
}


function createNumberCard(){
    return faker.finance.creditCardNumber()
}


export const cardService = {createCard}