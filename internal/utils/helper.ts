import { T_LogLevel } from "./../configs/config"
import { env } from "./../configs/load_env"


export const logLevel = (
  payload: any|any[], 
  level?: T_LogLevel,
) => {
  try {
    if (!env.LOG_LEVEL) {
      return level === 'ERROR' 
        ? console.error(payload)
        : console.log(payload)
    }
    
    if (env.LOG_LEVEL === 'HIDE') return
    if (env.LOG_LEVEL === level) {
      return env.LOG_LEVEL === 'ERROR' 
        ? console.error(payload)
        : console.log(payload)
    }
  } catch (err: any) {
    console.error(`[logLevel]: ${err.message} - ${err}`)
  }
}


export const handleThrowError = (params: {
  throwAt: string, 
  error: any
}) => {
  if (env.LOG_LEVEL === 'HIDE') return
  throw new Error(`\n[${params.throwAt}]: ${params?.error?.message || params?.error}\n\n`)
}