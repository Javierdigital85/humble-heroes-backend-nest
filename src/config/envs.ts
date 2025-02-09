import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  URL_FRONTEND: string;
}

//Validador de esquema
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    URL_FRONTEND: joi.string().required(),
  })
  .unknown(true);

//desustructuramos el envSchema , desustrucuramos le error y el value
const { error, value } = envsSchema.validate(process.env);

//Si hay un error es que falta el puerto
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value as EnvVars;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  url_frontend: envVars.URL_FRONTEND,
};
