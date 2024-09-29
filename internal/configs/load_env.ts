import { handleThrowError, logLevel } from '../utils/helper';
import { T_LogLevel, T_NodeENV, T_OnCI } from './config';
const list_node_env: T_NodeENV[] = ['SIT', 'UAT']


export const env = {
  // Base
  LOG_LEVEL: process?.env?.LOG_LEVEL as T_LogLevel,
  NODE_ENV: process?.env?.NODE_ENV as T_NodeENV,
  CI: process?.env?.CI as T_OnCI,
  BASE_URL: process?.env?.BASE_URL as string || `https://www.saucedemo.com`,
  // Database
  // ...
  // API
  // ...
  // Etc
  // ...
}


export const verifyBaseEnv = async () => {
  if (!list_node_env.includes(env.NODE_ENV)) {
    handleThrowError({
      throwAt: `verifyBaseEnv`,
      error: `NODE_ENV is not valid. Please use one of these: ${list_node_env}`
    })
  }
  logLevel(`RUN AUTOMATION TESTS AT MODE \`${env.NODE_ENV}\` ENVIRONMENT.`)
}