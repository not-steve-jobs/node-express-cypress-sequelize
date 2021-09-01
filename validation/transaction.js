const Joi = require('joi');

const transactionValidate = (data) => {
    const schema = Joi.object().keys({
        amount: Joi.number().required(),
        account_id: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { transactionValidate }