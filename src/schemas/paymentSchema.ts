import Joi from "joi";

const paramsSchema = Joi.object({
        businessId: Joi.number().required(),
}).required()


const bodySchema = Joi.object({
    cardHolderName:Joi.string().required(),
    expirationDate:Joi.date().required(),
    password:Joi.string().regex(/^[0-9]{4}$/).required(),
    amount:Joi.number().positive().required(),
    cardNumber:Joi.string().required()

}).required().options({allowUnknown:false})

const headerSchema = Joi.object({

}).required()
.options({ allowUnknown: true })

const paymentCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
	headers: headerSchema,
}).required().options({ allowUnknown: true })

export default paymentCardSchema;