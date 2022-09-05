import {Request, Response} from 'express';
import {paymentService} from '../services/paymentService';


const  paymentCard = async(req:Request, res:Response) =>{

    const businessId:number = Number(req.params.businessId);
    const cardNumber:string = req.body.cardNumber;
    const cardHolderName:string = req.body.cardHolderName;
    const password:string = req.body.password;
    const amount:number = Number(req.body.amount);
    const expirationDate:string = req.body.expirationDate;

    const result = await paymentService.paymentCard(businessId, password, cardNumber, expirationDate, cardHolderName, amount)

    res.status(200).send(result);
}

export {paymentCard};