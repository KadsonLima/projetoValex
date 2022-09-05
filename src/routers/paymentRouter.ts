import { Router } from "express";
import { paymentCard } from "../controllers/paymentController";
import { rechargeCard } from "../controllers/rechargeController";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware";
import paymentCardSchema from "../schemas/paymentSchema";

const paymentRouter = Router();


paymentRouter.post("/payment/:businessId",schemaValidateMiddleware(paymentCardSchema), paymentCard);



export default paymentRouter;