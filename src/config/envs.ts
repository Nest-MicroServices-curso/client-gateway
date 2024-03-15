import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
}

const ensSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true)

const {error, value} = ensSchema.validate(process.env);

if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    products_microservice_host: envVars.PRODUCTS_MICROSERVICE_HOST,
    products_microservice_port: envVars.PRODUCTS_MICROSERVICE_PORT,
}