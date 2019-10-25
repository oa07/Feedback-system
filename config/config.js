const Joi = require('@hapi/joi');
const dotenv = require('dotenv');

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGODB_HOST: Joi.string().required(),
  EMAIL_ID: Joi.string().email(),
  EMAIL_PASSWORD: Joi.string()
})
  .unknown()
  .required();

const { error, value: validatedEnv } = Joi.validate(process.env, envSchema);
if (error) throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  env: validatedEnv.NODE_ENV,
  port: validatedEnv.PORT,
  mongodbHost: validatedEnv.MONGODB_HOST,
  emailID: validatedEnv.EMAIL_ID,
  emailPassword: validatedEnv.EMAIL_PASSWORD
};

