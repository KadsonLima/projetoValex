import Joi from "joi";

const paramsSchema = Joi.object({
    
}).required()


const bodySchema = Joi.object({
    cardNumber:Joi.string().required(),
    cardHolderName:Joi.string().required(),
    expirationDate:Joi.date().required()
    
}).required().options({allowUnknown:false})

const headerSchema = Joi.object({
    
}).required()
.options({ allowUnknown: true })

const getBalanceCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
	headers: headerSchema,
}).required().options({ allowUnknown: true })

export default getBalanceCardSchema;