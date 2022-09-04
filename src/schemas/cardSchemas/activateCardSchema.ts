import Joi from "joi";

const paramsSchema = Joi.object({
    
}).required()


const bodySchema = Joi.object({
    CVC:Joi.string().regex(/^[0-9]{3}$/).required(),
    password:Joi.string().regex(/^[0-9]{4}$/).required(),
    cardNumber:Joi.string().required(),
    cardHolderName:Joi.string().required(),
    expirationDate:Joi.date().required()
    
}).required().options({allowUnknown:false})

const headerSchema = Joi.object({
    
}).required()
.options({ allowUnknown: true })

const activateCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
	headers: headerSchema,
}).required().options({ allowUnknown: true })

export default activateCardSchema;