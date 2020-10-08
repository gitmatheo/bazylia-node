import dotenv from 'dotenv';
import { devConfig } from './dev.js';
import { testingConfig }  from './testing.js';

dotenv.config()
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig
    break
  case 'test':
  case 'testing':
    envConfig = testingConfig
    break
  default:
    envConfig = devConfig
}

export const config = {...baseConfig, ...envConfig};
