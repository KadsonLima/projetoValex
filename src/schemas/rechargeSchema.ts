import Joi from "joi";

const paramsSchema = Joi.object({

}).required()


const bodySchema = Joi.object({
    cardHolderName:Joi.string().required(),
    expirationDate:Joi.date().required(),
    amount:Joi.number().positive().required(),
    cardNumber:Joi.string().required()

}).required().options({allowUnknown:false})

const headerSchema = Joi.object({
    "x-api-key": Joi.string().required()
}).required()
.options({ allowUnknown: true })

const rechargeCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
	headers: headerSchema,
}).required().options({ allowUnknown: true })

export default rechargeCardSchema;