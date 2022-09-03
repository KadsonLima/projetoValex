import {Request, Response} from 'express';
import { TransactionTypes } from '../repositories/cardRepository';
import { cardService } from '../services/cardService';
import { nameFormatterCard } from '../utils/nameFormatter';



const createCard = async(req:Request, res:Response) =>{
    const apiKey = String(req.headers["x-api-key"]);

    const typeCard:TransactionTypes = req.body.typeCard;

    const employeeId:number = Number(req.params.employeeId)

    await cardService.createCard(employeeId, typeCard, apiKey)


    res.sendStatus(201)
    
}


export {createCard}