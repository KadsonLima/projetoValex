import { insert } from "../repositories/rechargeRepository";
import { validateDataCard } from "../utils/expirationDate";
import { validateService } from "./validateService";



async function rechargeCard(amount:number, apiKey:string, cardNumber:string, expirationDate:string, cardHolderName:string) {
      
    const Company = await validateService.verifyKey(apiKey);
    const cardDetails = await validateService.verifyCard(cardNumber, cardHolderName, expirationDate)

    validateDataCard(expirationDate);

    if(cardDetails.password === null) throw {code:401, message:"Card not active!"}

    await validateService.verifyEmployee(cardDetails.employeeId, Company);

    return await insert({cardId:cardDetails.id, amount:amount})
    

}

export const rechargeService = {rechargeCard}