import { findById } from "../repositories/businessRepository";
import { verifyCardPassword } from "../utils/cardUtils";
import { validateDataCard } from "../utils/expirationDate";
import { validateService } from "./validateService";
import { cardService } from '../services/cardService';
import { insert } from "../repositories/paymentRepository";




async function paymentCard(businessId:number, password:string, cardNumber:string, expirationDate:string, cardHolderName:string, amount:number) {
      
    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate)

    validateDataCard(expirationDate);

    if(cardDetails.password === null) throw {code:401, message:"Card not active!"}

    if(cardDetails.isBlocked) throw {code:401, message:"Card is blocked!"};

    verifyCardPassword(password, cardDetails.password)

    const Business = await findById(businessId);

    if(Business.type !== cardDetails.type) throw {code:405, message:"Card is not the payment type!"};
    
    const {balance} = await cardService.getBalanceCard(cardNumber, cardHolderName, expirationDate)
    
    if(balance < amount) throw {code:406, message:"Insufficient Card balance !!"}

    const payment = await insert({cardId:cardDetails.id, businessId:businessId, amount:amount})

}

export const paymentService = {paymentCard}