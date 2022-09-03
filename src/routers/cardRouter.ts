import { Router } from "express";
import { createCard } from "../controllers/cardController";
import { Request, Response } from "express";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware";
import createCardSchema from '../schemas/cardSchemas/createCardSchema'

const cardRouter = Router();


cardRouter.post("/card/:employeeId",schemaValidateMiddleware(createCardSchema) , createCard);
cardRouter.get("/", (req:Request, res:Response)=>{console.log("TESTE"); res.sendStatus(200)})


export default cardRouter;