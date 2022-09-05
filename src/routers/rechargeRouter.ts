import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware";
import rechargeCardSchema from "../schemas/rechargeSchema";

const rechargeRouter = Router();


rechargeRouter.post("/recharge",schemaValidateMiddleware(rechargeCardSchema), rechargeCard);



export default rechargeRouter;