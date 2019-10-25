const joi = require('@hapi/joi');


module.exports.loginDataValidation = data => {
  const compareWith = {
    email: joi
      .string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: joi
      .required()
  };
  return joi.validate(data, compareWith, { abortEarly: false });
}
