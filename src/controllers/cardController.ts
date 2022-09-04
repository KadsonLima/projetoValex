import {Request, Response} from 'express';
import { TransactionTypes } from '../repositories/cardRepository';
import { cardService } from '../services/cardService';
import { nameFormatterCard } from '../utils/nameFormatter';



const createCard = async(req:Request, res:Response) =>{
    const apiKey = String(req.headers["x-api-key"]);

    const typeCard:TransactionTypes = req.body.typeCard;

    const employeeId:number = Number(req.params.employeeId)

    const result = await cardService.createCard(employeeId, typeCard, apiKey)

    res.status(201).send(result);
    
}

const activeCard = async(req:Request, res:Response) =>{
    
    const CVC:string = req.body.CVC;
    const password:string = req.body.password;
    const cardNumber:string = req.body.cardNumber;
    const cardHolderName:string = req.body.cardHolderName;
    const expirationDate:string = req.body.expirationDate;

    const result = await cardService.activeCard(CVC, password, cardNumber, cardHolderName, expirationDate)

    res.sendStatus(200)
    
}

const getBalance = async(req:Request, res:Response) =>{
    
    const cardNumber:string = req.body.cardNumber;
    const cardHolderName:string = req.body.cardHolderName;
    const expirationDate:string = req.body.expirationDate;

    const result = await cardService.getBalanceCard(cardNumber, cardHolderName, expirationDate)

    res.status(200).send(result)
    
}


export {createCard, activeCard, getBalance}