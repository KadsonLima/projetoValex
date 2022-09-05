import { Router } from "express";
import { activeCard, createCard, getBalance, blockCard , unblockCard} from "../controllers/cardController";
import { Request, Response } from "express";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware";
import createCardSchema from '../schemas/cardSchemas/createCardSchema'
import activateCardSchema from "../schemas/cardSchemas/activateCardSchema";
import getBalanceCardSchema from "../schemas/cardSchemas/cardBalanceSchema";
import blockCardSchema from "../schemas/cardSchemas/blockCardSchema";

const cardRouter = Router();


cardRouter.post("/card/:employeeId",schemaValidateMiddleware(createCardSchema), createCard);
cardRouter.put("/card/", schemaValidateMiddleware(activateCardSchema), activeCard);
cardRouter.get("/card/", schemaValidateMiddleware(getBalanceCardSchema), getBalance);
cardRouter.put("/blockCard/", schemaValidateMiddleware(blockCardSchema), blockCard);
cardRouter.put("/unblockCard/", schemaValidateMiddleware(blockCardSchema), unblockCard);



export default cardRouter;