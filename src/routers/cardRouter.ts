import { Router } from "express";
import { activeCard, createCard, getBalance } from "../controllers/cardController";
import { Request, Response } from "express";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware";
import createCardSchema from '../schemas/cardSchemas/createCardSchema'
import activateCardSchema from "../schemas/cardSchemas/activateCardSchema";
import getBalanceCardSchema from "../schemas/cardSchemas/cardBalanceSchema";

const cardRouter = Router();


cardRouter.post("/card/:employeeId",schemaValidateMiddleware(createCardSchema), createCard);
cardRouter.put("/card/", schemaValidateMiddleware(activateCardSchema), activeCard)
cardRouter.get("/card/", schemaValidateMiddleware(getBalanceCardSchema), getBalance)


export default cardRouter;