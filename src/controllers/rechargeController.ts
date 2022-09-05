import {Request, Response} from 'express';
import { rechargeService } from '../services/rechargeService';


const  rechargeCard = async(req:Request, res:Response) =>{

    const employeeId:number = Number(req.params.employeeId);
    const amount:number = req.body.amount;
    const cardNumber:string = req.body.cardNumber;
    const cardHolderName:string = req.body.cardHolderName;
    const expirationDate:string = req.body.expirationDate;
    const apiKey = String(req.headers["x-api-key"]);

    const result = await rechargeService.rechargeCard(amount, apiKey, cardNumber, expirationDate, cardHolderName)

    res.status(200).send(result);
}

export {rechargeCard};